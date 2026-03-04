from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Carbon AI Resume RAG Service"
    app_env: str = "development"
    app_port: int = 8080

    openai_api_key: str = Field(..., alias="OPENAI_API_KEY")
    openai_chat_model: str = Field("gpt-4o-mini", alias="OPENAI_CHAT_MODEL")
    openai_embedding_model: str = Field(
        "text-embedding-3-small",
        alias="OPENAI_EMBEDDING_MODEL",
    )

    allowed_origins: str = Field("http://localhost:3000", alias="RAG_ALLOWED_ORIGINS")
    resume_source_path: str | None = Field(None, alias="RAG_RESUME_SOURCE_PATH")
    auto_ingest_on_boot: bool = Field(False, alias="RAG_AUTO_INGEST_ON_BOOT")
    vector_store_dir: Path = Field(Path("./storage/faiss"), alias="RAG_VECTOR_STORE_DIR")
    upload_dir: Path = Field(Path("./data/resume"), alias="RAG_UPLOAD_DIR")
    index_store_backend: str = Field("local", alias="RAG_INDEX_STORE_BACKEND")
    gcs_bucket_name: str | None = Field(None, alias="RAG_GCS_BUCKET")
    gcs_index_prefix: str = Field("faiss", alias="RAG_GCS_INDEX_PREFIX")
    chunk_size: int = Field(900, alias="RAG_CHUNK_SIZE")
    chunk_overlap: int = Field(150, alias="RAG_CHUNK_OVERLAP")
    retrieval_k: int = Field(5, alias="RAG_RETRIEVAL_K")

    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    settings = Settings()
    settings.vector_store_dir.mkdir(parents=True, exist_ok=True)
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    return settings
