# Carbon AI Resume RAG Service

Standalone FastAPI service for Carbon AI Chat that ingests a resume into a local FAISS vector store and answers questions about it using LangChain-based RAG.

## What it provides

- `POST /api/v1/ingest` uploads and indexes a resume file.
- `POST /api/v1/chat` answers questions from the indexed resume.
- `GET /health` reports service and index readiness.
- Local FAISS persistence under `storage/faiss/`.

## Supported resume formats

- `.pdf`
- `.docx`
- `.txt`
- `.md`

## Local setup

```bash
cd carbon-rag-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

## Ingest a resume

Option 1: upload the file to the API.

```bash
curl -X POST http://localhost:8000/api/v1/ingest \
  -F "file=@/absolute/path/to/resume.pdf"
```

Option 2: set `RAG_RESUME_SOURCE_PATH` in `.env` and turn on `RAG_AUTO_INGEST_ON_BOOT=true`.

## Ask questions

```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Summarize Vishwajith'\''s React and cloud experience.",
    "chat_history": []
  }'
```

## Response shape

```json
{
  "answer": "Concise answer grounded in the resume.",
  "sources": [
    {
      "source": "resume.pdf",
      "page": 1,
      "chunk": 0
    }
  ]
}
```

## Carbon AI Chat integration

Point `customSendMessage` at `POST /api/v1/chat` and map the returned `answer` field into a Carbon text response.

## Cloud Run

Build and deploy from the service directory:

```bash
gcloud run deploy carbon-rag-service \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

Set the required environment variables in Cloud Run, especially `OPENAI_API_KEY`.

## Important persistence note

This service persists FAISS locally inside the container filesystem. That works for local development and for the lifetime of a Cloud Run instance, but it is not durable storage across instance restarts or new revisions. For production durability, move the resume file and FAISS artifacts to a mounted volume or object storage workflow.
