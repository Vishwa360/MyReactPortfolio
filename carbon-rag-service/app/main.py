from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from .config import get_settings
from .models import ChatRequest, ChatResponse, IngestFolderResponse, IngestResponse
from .rag import ResumeRAGService

settings = get_settings()
rag_service = ResumeRAGService(settings)


@asynccontextmanager
async def lifespan(_: FastAPI):
    rag_service.load_existing_index()
    if settings.auto_ingest_on_boot:
        if settings.resume_source_path:
            rag_service.ingest_file(settings.resume_source_path)
        else:
            rag_service.ingest_directory(settings.upload_dir)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, object]:
    return {
        "status": "ok",
        "has_index": rag_service.has_index(),
        "environment": settings.app_env,
    }


@app.post("/api/v1/ingest", response_model=IngestResponse)
async def ingest_resume(file: UploadFile = File(...)) -> IngestResponse:
    source_path, chunk_count = await rag_service.ingest_upload(file)
    return IngestResponse(
        message="Resume ingested successfully.",
        source_path=source_path,
        chunks_indexed=chunk_count,
    )


@app.post("/api/v1/ingest-folder", response_model=IngestFolderResponse)
def ingest_resume_folder() -> IngestFolderResponse:
    folder_path, file_count, chunk_count = rag_service.ingest_directory(settings.upload_dir)
    return IngestFolderResponse(
        message="Folder ingested successfully.",
        folder_path=folder_path,
        files_indexed=file_count,
        chunks_indexed=chunk_count,
    )


@app.post("/api/v1/chat", response_model=ChatResponse)
def chat_with_resume(payload: ChatRequest) -> ChatResponse:
    return rag_service.answer_question(
        question=payload.question,
        chat_history=payload.chat_history,
    )


@app.post("/api/v1/chat/stream")
def stream_chat_with_resume(payload: ChatRequest) -> StreamingResponse:
    return StreamingResponse(
        rag_service.stream_answer(
            question=payload.question,
            chat_history=payload.chat_history,
        ),
        media_type="application/x-ndjson",
    )
