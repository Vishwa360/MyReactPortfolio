from pydantic import BaseModel, Field


class ChatHistoryItem(BaseModel):
    role: str = Field(..., examples=["human", "assistant"])
    content: str = Field(..., min_length=1)


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1)
    chat_history: list[ChatHistoryItem] = Field(default_factory=list)


class ChatResponse(BaseModel):
    answer: str


class IngestResponse(BaseModel):
    message: str
    source_path: str
    chunks_indexed: int


class IngestFolderResponse(BaseModel):
    message: str
    folder_path: str
    files_indexed: int
    chunks_indexed: int
