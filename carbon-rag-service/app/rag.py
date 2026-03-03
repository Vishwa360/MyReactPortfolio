from __future__ import annotations

import json
from pathlib import Path
from typing import Iterable
from uuid import uuid4

from fastapi import HTTPException, UploadFile
from langchain_community.document_loaders import Docx2txtLoader, PyPDFLoader, TextLoader
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

from .config import Settings
from .models import ChatHistoryItem, ChatResponse


SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}


class ResumeRAGService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.embeddings = OpenAIEmbeddings(
            api_key=settings.openai_api_key,
            model=settings.openai_embedding_model,
        )
        self.llm = ChatOpenAI(
            api_key=settings.openai_api_key,
            model=settings.openai_chat_model,
            temperature=0,
            max_tokens=1000,
        )
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.chunk_size,
            chunk_overlap=settings.chunk_overlap,
        )
        self.vector_store: FAISS | None = None
        self.prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are a helpful assistant. You answer questions only from the provided resume context. "
                    "The resume is about Vishwajith. Read the document chunks and answer in a helpful way to better understand the person behind the resume. "
                    "If the answer is not in the resume, say that clearly. "
                    "Keep answers concise and factual.\n\nResume context:\n{context}",
                ),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{question}"),
            ]
        )

    def has_index(self) -> bool:
        return (self.settings.vector_store_dir / "index.faiss").exists()

    def load_existing_index(self) -> bool:
        if not self.has_index():
            return False
        self.vector_store = FAISS.load_local(
            str(self.settings.vector_store_dir),
            self.embeddings,
            allow_dangerous_deserialization=True,
        )
        return True

    async def ingest_upload(self, upload: UploadFile) -> tuple[str, int]:
        extension = Path(upload.filename or "").suffix.lower()
        if extension not in SUPPORTED_EXTENSIONS:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {extension}")

        target_path = self.settings.upload_dir / (upload.filename or f"resume{extension}")
        contents = await upload.read()
        target_path.write_bytes(contents)
        chunk_count = self.ingest_file(target_path)
        return str(target_path), chunk_count

    def ingest_directory(self, directory_path: str | Path) -> tuple[str, int, int]:
        directory = Path(directory_path)
        if not directory.exists():
            raise HTTPException(status_code=404, detail=f"Directory not found: {directory}")
        if not directory.is_dir():
            raise HTTPException(status_code=400, detail=f"Path is not a directory: {directory}")

        source_files = sorted(
            path for path in directory.iterdir() if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        )
        if not source_files:
            raise HTTPException(
                status_code=400,
                detail=f"No supported files found in directory: {directory}",
            )

        all_chunks: list[Document] = []
        for source_file in source_files:
            loader = self._build_loader(source_file)
            documents = loader.load()
            if not documents:
                continue

            chunks = self.splitter.split_documents(documents)
            for index, chunk in enumerate(chunks):
                chunk.metadata["chunk"] = index
                chunk.metadata["source"] = source_file.name
            all_chunks.extend(chunks)

        if not all_chunks:
            raise HTTPException(
                status_code=400,
                detail="No content could be extracted from the supported files in the directory.",
            )

        self.vector_store = FAISS.from_documents(all_chunks, self.embeddings)
        self.vector_store.save_local(str(self.settings.vector_store_dir))
        return str(directory), len(source_files), len(all_chunks)

    def ingest_file(self, source_path: str | Path) -> int:
        source = Path(source_path)
        if not source.exists():
            raise HTTPException(status_code=404, detail=f"Resume file not found: {source}")
        if source.suffix.lower() not in SUPPORTED_EXTENSIONS:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {source.suffix}")

        loader = self._build_loader(source)
        documents = loader.load()
        if not documents:
            raise HTTPException(status_code=400, detail="No content could be extracted from the resume.")

        chunks = self.splitter.split_documents(documents)
        for index, chunk in enumerate(chunks):
            chunk.metadata["chunk"] = index
            chunk.metadata["source"] = source.name

        self.vector_store = FAISS.from_documents(chunks, self.embeddings)
        self.vector_store.save_local(str(self.settings.vector_store_dir))
        return len(chunks)

    def answer_question(self, question: str, chat_history: list[ChatHistoryItem]) -> ChatResponse:
        vector_store = self._require_vector_store()
        docs = vector_store.similarity_search(question, k=self.settings.retrieval_k)
        context = self._format_documents(docs)
        history_messages = self._to_messages(chat_history)
        chain = self.prompt | self.llm | StrOutputParser()
        answer = chain.invoke(
            {
                "context": context,
                "chat_history": history_messages,
                "question": question,
            }
        )
        return ChatResponse(answer=answer)

    def stream_answer(self, question: str, chat_history: list[ChatHistoryItem]):
        vector_store = self._require_vector_store()
        docs = vector_store.similarity_search(question, k=self.settings.retrieval_k)
        context = self._format_documents(docs)
        history_messages = self._to_messages(chat_history)
        chain = self.prompt | self.llm | StrOutputParser()

        response_id = str(uuid4())
        item_id = "assistant-text"
        accumulated_chunks: list[str] = []

        for chunk in chain.stream(
            {
                "context": context,
                "chat_history": history_messages,
                "question": question,
            }
        ):
            if not chunk:
                continue
            accumulated_chunks.append(chunk)
            yield self._json_line(
                {
                    "type": "chunk",
                    "response_id": response_id,
                    "item_id": item_id,
                    "text": chunk,
                }
            )

        yield self._json_line(
            {
                "type": "final",
                "response_id": response_id,
                "item_id": item_id,
                "answer": "".join(accumulated_chunks).strip(),
            }
        )

    def _require_vector_store(self) -> FAISS:
        if self.vector_store is not None:
            return self.vector_store
        if self.load_existing_index():
            return self.vector_store  # type: ignore[return-value]
        raise HTTPException(status_code=400, detail="No FAISS index found. Ingest a resume first.")

    def _build_loader(self, source: Path):
        suffix = source.suffix.lower()
        if suffix == ".pdf":
            return PyPDFLoader(str(source))
        if suffix == ".docx":
            return Docx2txtLoader(str(source))
        return TextLoader(str(source), encoding="utf-8")

    def _format_documents(self, docs: Iterable[Document]) -> str:
        return "\n\n".join(doc.page_content.strip() for doc in docs if doc.page_content.strip())

    def _to_messages(self, chat_history: list[ChatHistoryItem]) -> list[HumanMessage | AIMessage]:
        messages: list[HumanMessage | AIMessage] = []
        for item in chat_history:
            role = item.role.lower().strip()
            if role in {"human", "user"}:
                messages.append(HumanMessage(content=item.content))
            elif role in {"assistant", "ai"}:
                messages.append(AIMessage(content=item.content))
        return messages

    def _json_line(self, payload: dict[str, str]) -> str:
        return f"{json.dumps(payload)}\n"
