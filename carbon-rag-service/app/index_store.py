from __future__ import annotations

import tempfile
from abc import ABC, abstractmethod
from pathlib import Path

from google.cloud import storage
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

from .config import Settings


INDEX_FILENAMES = ("index.faiss", "index.pkl")


class IndexStore(ABC):
    def __init__(self, settings: Settings, embeddings: OpenAIEmbeddings) -> None:
        self.settings = settings
        self.embeddings = embeddings

    @abstractmethod
    def has_index(self) -> bool:
        raise NotImplementedError

    @abstractmethod
    def load(self) -> FAISS:
        raise NotImplementedError

    @abstractmethod
    def save(self, vector_store: FAISS) -> None:
        raise NotImplementedError


class LocalIndexStore(IndexStore):
    def has_index(self) -> bool:
        return (self.settings.vector_store_dir / "index.faiss").exists()

    def load(self) -> FAISS:
        return FAISS.load_local(
            str(self.settings.vector_store_dir),
            self.embeddings,
            allow_dangerous_deserialization=True,
        )

    def save(self, vector_store: FAISS) -> None:
        self.settings.vector_store_dir.mkdir(parents=True, exist_ok=True)
        vector_store.save_local(str(self.settings.vector_store_dir))


class GCSIndexStore(IndexStore):
    def __init__(self, settings: Settings, embeddings: OpenAIEmbeddings) -> None:
        super().__init__(settings, embeddings)
        if not settings.gcs_bucket_name:
            raise ValueError("RAG_GCS_BUCKET is required when using the gcs index store backend.")
        self.client = storage.Client()
        self.bucket = self.client.bucket(settings.gcs_bucket_name)
        self.prefix = settings.gcs_index_prefix.strip("/")

    def has_index(self) -> bool:
        return all(self.bucket.blob(self._object_name(filename)).exists() for filename in INDEX_FILENAMES)

    def load(self) -> FAISS:
        with tempfile.TemporaryDirectory() as temp_dir:
            target_dir = Path(temp_dir)
            for filename in INDEX_FILENAMES:
                blob = self.bucket.blob(self._object_name(filename))
                blob.download_to_filename(str(target_dir / filename))
            return FAISS.load_local(
                str(target_dir),
                self.embeddings,
                allow_dangerous_deserialization=True,
            )

    def save(self, vector_store: FAISS) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            target_dir = Path(temp_dir)
            vector_store.save_local(str(target_dir))
            for filename in INDEX_FILENAMES:
                blob = self.bucket.blob(self._object_name(filename))
                blob.upload_from_filename(str(target_dir / filename))

    def _object_name(self, filename: str) -> str:
        if not self.prefix:
            return filename
        return f"{self.prefix}/{filename}"


def build_index_store(settings: Settings, embeddings: OpenAIEmbeddings) -> IndexStore:
    if settings.index_store_backend == "gcs":
        return GCSIndexStore(settings, embeddings)
    return LocalIndexStore(settings, embeddings)
