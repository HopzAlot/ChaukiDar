# Chaukidar

Chaukidar is a multilingual AI safety audit platform for South Asian languages. It tests whether LLMs and RAG-style chatbots remain safe in Urdu, Punjabi, Pashto, and Sindhi, comparing translation-baseline prompts against native-adapted prompts.

Built for **AMD Developer Hackathon ACT II, Track 3 / Unicorn Track**.

## What Chaukidar Does

- Runs safety audits across multiple models.
- Supports Fireworks-hosted model audits for fast comparison.
- Supports AMD ROCm/Jupyter result import for Track 3 compute proof.
- Groups multi-model audits under one experiment name.
- Shows live progress, per-model results, retry controls, and report views.
- Lets users upload a custom JSON prompt dataset with validation before import.

## Track 3 Fit

Track 3 requires an original AI application that demonstrates AMD compute usage. Chaukidar's Track 3 story is:

> Multilingual safety audit inference at scale using AMD ROCm/Jupyter/vLLM, with the web app acting as the product layer for importing, comparing, and reporting audit results.

Required submission artifacts for Track 3:

- GitHub repository URL
- Demo video
- Slide deck PDF
- Live demo / hosted URL recommended

No Docker image is required for Track 3.

## AMD Compute Story

The repo includes an AMD notebook workflow in:

```text
amd_notebooks/chaukidar_amd_audit.ipynb
```

Use it on the hackathon AMD Jupyter instance to:

1. verify ROCm/GPU availability
2. run vLLM or Transformers inference on AMD compute
3. batch native South Asian safety prompts
4. export audit results JSON
5. capture latency/throughput numbers for `benchmarks.md`
6. import the AMD-generated JSON into Chaukidar through the frontend

Current AMD evidence files:

```text
amd_notebooks/chaukidar_amd_audit.ipynb
benchmarks.md
chaukidar_amd_audit_results.json
amd_rocm_qwen_native_audit_results.json
examples/amd_audit_results_sample.json
```

For judging, the demo and slide deck should clearly show the AMD notebook, ROCm/vLLM logs, benchmark numbers, and imported AMD results in the web app.

## Architecture

```text
frontend/                 Next.js app
backend/                  FastAPI backend
backend/app/data/         Seed prompt datasets
amd_notebooks/            AMD ROCm/Jupyter audit notebook
examples/                 Sample import JSON
benchmarks.md             AMD benchmark evidence
```

Core backend pieces:

- Prompt builder: selects prompts by language, category, and track
- Execution agent: calls Fireworks-compatible model endpoints
- Judge agent: labels model responses with a fixed safety rubric
- Reporting agent: aggregates results into dashboard/report metrics
- Importer: imports AMD notebook or Fireworks audit JSON
- Dataset router: validates/imports user custom JSON datasets

## Setup

Backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
PYTHONPATH=backend backend/.venv/bin/python backend/scripts/seed_db.py
PYTHONPATH=backend backend/.venv/bin/python -m uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

```text
http://127.0.0.1:3000
```

Backend health:

```bash
curl http://127.0.0.1:8000/health
```

## Environment

Create `.env` at repo root for backend local development:

```text
DATABASE_URL=sqlite:///./chaukidar.db
USE_MOCK_INFERENCE=false
FIREWORKS_API_KEY=...
FIREWORKS_BASE_URL=https://api.fireworks.ai/inference/v1
FIREWORKS_MODELS=accounts/fireworks/models/model-a,accounts/fireworks/models/model-b
```

Frontend `.env.local` should point to the backend or proxy according to your local setup.

## Custom Dataset Upload

The frontend supports optional JSON dataset upload on the New Audit page.

Accepted shape is either a raw array:

```json
[
  {
    "seed_id": "optional_custom_001",
    "harm_category": "fraud_scams",
    "language": "ur",
    "track": "native_adapted",
    "prompt_text": "...",
    "intent_summary": "...",
    "risk_level_hint": "high"
  }
]
```

or an object with `records`:

```json
{
  "records": [
    {
      "harm_category": "fraud_scams",
      "language": "ur",
      "track": "translation_baseline",
      "prompt_text": "...",
      "intent_summary": "...",
      "risk_level_hint": "medium"
    }
  ]
}
```

`seed_id` is optional. If missing, the backend generates one.

Validation rules:

- `harm_category` must already exist in the backend seed categories.
- `track` must be `translation_baseline` or `native_adapted`.
- `risk_level_hint` must be `low`, `medium`, or `high`.
- `prompt_text` and `intent_summary` are required.
- Maximum upload size from UI: 5 MB.
- Maximum records per backend upload: 2000.

The frontend validates the dataset before starting an audit. If validation fails, the audit cannot start and the error is shown to the user.

## Fireworks Model Notes

Some Fireworks models return slightly different OpenAI-compatible response shapes. Chaukidar now parses several possible message formats and reports useful errors instead of crashing on missing `message.content`.

The backend also retries transient API failures such as timeouts, rate limits, and temporary 5xx errors.

## API Overview

```text
GET  /health
GET  /api/models
POST /api/models/register
POST /api/datasets/custom/validate
POST /api/datasets/custom/import
POST /api/audits/create
POST /api/audits/{audit_id}/run
GET  /api/audits
GET  /api/audits/{audit_id}
GET  /api/audits/{audit_id}/results
GET  /api/audits/{audit_id}/report
POST /api/audits/import
```

## Safety Note

This repository should not commit sensitive datasets, API keys, raw harmful operational content, or private audit outputs. Local data, DB files, result dumps, and `.env` files should stay ignored.

Runtime custom datasets are user-provided and stored locally for audit execution. Do not push private or sensitive datasets to GitHub.

## Pitch

English-only AI safety is not enough. Companies deploying LLMs in South Asia need to know whether their systems remain safe in Urdu, Punjabi, Pashto, and Sindhi. Chaukidar compares translation-based testing against native culturally adapted red-teaming, runs scalable audits on AMD compute, and generates compliance-grade risk reports.
