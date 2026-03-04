from __future__ import annotations

from pathlib import Path

from fastapi import HTTPException
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}


def list_supported_files(directory_path: str | Path) -> list[Path]:
    directory = Path(directory_path)
    if not directory.exists():
        raise HTTPException(status_code=404, detail=f"Directory not found: {directory}")
    if not directory.is_dir():
        raise HTTPException(status_code=400, detail=f"Path is not a directory: {directory}")

    source_files = sorted(path for path in directory.iterdir() if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS)
    if not source_files:
        raise HTTPException(
            status_code=400,
            detail=f"No supported files found in directory: {directory}",
        )
    return source_files


def enrich_chunks(chunks: list[Document], source_name: str) -> list[Document]:
    for index, chunk in enumerate(chunks):
        chunk.metadata["chunk"] = index
        chunk.metadata["source"] = source_name
    return chunks


def split_documents(documents: list[Document], source_name: str, splitter: RecursiveCharacterTextSplitter) -> list[Document]:
    if not documents:
        return []
    chunks = splitter.split_documents(documents)
    return enrich_chunks(chunks, source_name)
