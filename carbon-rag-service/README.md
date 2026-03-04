# Carbon AI Resume RAG Service

Standalone FastAPI service for Carbon AI Chat that ingests resume documents into a FAISS vector store and answers questions about them using LangChain-based RAG.

## What it provides

- `POST /api/v1/ingest` uploads and indexes a resume file.
- `POST /api/v1/ingest-folder` indexes all supported files in the configured folder.
- `POST /api/v1/jobs/rebuild-index` rebuilds the index from the configured folder and persists it using the selected backend.
- `POST /api/v1/chat` answers questions from the indexed resume.
- `GET /health` reports service and index readiness.
- Local or GCS-backed FAISS persistence.

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

To rebuild from every supported file in `RAG_UPLOAD_DIR`:

```bash
curl -X POST http://localhost:8000/api/v1/ingest-folder
```

To use the job-style rebuild endpoint:

```bash
curl -X POST http://localhost:8000/api/v1/jobs/rebuild-index
```

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

## Storage backends

For local development:

```env
RAG_INDEX_STORE_BACKEND=local
RAG_VECTOR_STORE_DIR=./storage/faiss
```

For Cloud Run or other serverless deployments:

```env
RAG_INDEX_STORE_BACKEND=gcs
RAG_GCS_BUCKET=your-bucket-name
RAG_GCS_INDEX_PREFIX=faiss
```

When `RAG_INDEX_STORE_BACKEND=gcs`, the service downloads `index.faiss` and `index.pkl` from the configured bucket prefix at runtime and uploads rebuilt artifacts back to the same location.

## Cloud Run

Build and deploy from the service directory:

```bash
gcloud run deploy carbon-rag-service \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

Set the required environment variables in Cloud Run, especially `OPENAI_API_KEY`.

If you deploy the RAG API as a Cloud Run service, configure it with:

- `RAG_INDEX_STORE_BACKEND=gcs`
- `RAG_GCS_BUCKET=<bucket>`
- `RAG_GCS_INDEX_PREFIX=<prefix>`

You can use a Cloud Run Job or an authenticated HTTP caller to invoke `POST /api/v1/jobs/rebuild-index` whenever you need to create or replace embeddings in GCS.

## Important persistence note

This service supports local FAISS persistence for laptop testing and GCS-backed FAISS artifacts for serverless deployment. Local container storage is still ephemeral on Cloud Run, so use the GCS backend there.
