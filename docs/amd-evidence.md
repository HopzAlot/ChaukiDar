# AMD Notebook Evidence

These screenshots document the successful AMD Developer Hackathon notebook work used by Chaukidar.

| File | Evidence |
| --- | --- |
| [01-rocm-smi.png](amd-evidence/01-rocm-smi.png) | AMD GPU visible through `rocm-smi`; ROCm environment active. |
| [02-torch-hip-vllm.png](amd-evidence/02-torch-hip-vllm.png) | PyTorch `2.9.1+gitff65f5b`, HIP `7.2.53211-e1a6bc5663`, GPU available, vLLM `0.16.1.dev0+g89a77b108.d20260318`. |
| [03-dataset-loaded.png](amd-evidence/03-dataset-loaded.png) | Full dataset loaded: 180 prompts, 5 languages, 3 tracks, 5 harm categories. |
| [04-qwen-full-dataset.png](amd-evidence/04-qwen-full-dataset.png) | `Qwen/Qwen2.5-0.5B-Instruct` full-dataset ROCm/vLLM batch: 180 prompts in 2.15 sec, 12 ms average latency, 83.73 prompts/sec. |
| [05-qwen-json-export.png](amd-evidence/05-qwen-json-export.png) | Qwen AMD audit payload exported to JSON with hardware, versions, dataset coverage, and benchmark metadata. |
| [06-tinyllama-full-dataset.png](amd-evidence/06-tinyllama-full-dataset.png) | `TinyLlama/TinyLlama-1.1B-Chat-v1.0` full-dataset ROCm/vLLM batch: 180 prompts in 4.16 sec, 23 ms average latency, 43.25 prompts/sec. |

## Full-Dataset AMD Runs

The AMD notebook processed the complete Chaukidar dataset:

- 180 prompts
- languages: English, Urdu, Punjabi, Pashto, Sindhi
- tracks: English seed, translation baseline, native-adapted
- categories: cyber abuse, fraud and scams, hate and harassment, self-harm content, violent wrongdoing

Two open-source models were benchmarked on the AMD Hackathon Jupyter environment through ROCm/vLLM:

| Model | Prompt Count | Runtime | Avg Latency | Throughput |
| --- | ---: | ---: | ---: | ---: |
| `Qwen/Qwen2.5-0.5B-Instruct` | 180 | 2.15 sec | 12 ms | 83.73 prompts/sec |
| `TinyLlama/TinyLlama-1.1B-Chat-v1.0` | 180 | 4.16 sec | 23 ms | 43.25 prompts/sec |

## What This Proves

The project used the provided AMD Jupyter environment as the compute layer. The notebook verified ROCm, loaded vLLM, ran batched multilingual inference on AMD GPU, generated model responses, and exported JSON for the Chaukidar app.

Chaukidar then imported those AMD-generated JSON files and used the backend judge/reporting pipeline to produce comparable safety reports across AMD notebook runs and Fireworks-hosted model runs.
