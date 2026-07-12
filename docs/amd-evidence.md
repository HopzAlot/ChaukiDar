# AMD Notebook Evidence

These screenshots document the successful AMD Developer Hackathon notebook work used by Chaukidar.

| File | Evidence |
| --- | --- |
| [01-rocm-smi.png](amd-evidence/01-rocm-smi.png) | AMD GPU visible through `rocm-smi`; ROCm environment active. |
| [02-torch-hip-vllm.png](amd-evidence/02-torch-hip-vllm.png) | PyTorch `2.9.1+gitff65f5b`, HIP `7.2.53211-e1a6bc5663`, GPU available, vLLM `0.16.1.dev0+g89a77b108.d20260318`. |
| [03-vllm-qwen-load.png](amd-evidence/03-vllm-qwen-load.png) | `Qwen/Qwen2.5-0.5B-Instruct` loaded with vLLM on ROCm; model weights, KV cache, and graph capture completed. |
| [04-smoke-results-partial.png](amd-evidence/04-smoke-results-partial.png) | Initial smoke audit results from AMD notebook. |
| [05-guarded-results.png](amd-evidence/05-guarded-results.png) | Guarded prompt variant produced refusal/partial-compliance labels. |
| [06-json-export.png](amd-evidence/06-json-export.png) | AMD audit payload exported to JSON for Chaukidar backend import. |

## 48-Prompt Batch Note

A later native-batch run processed 48 prompts across Urdu, Punjabi, Pashto, and Sindhi. The notebook output showed `48/48` prompts processed, about `1.05` seconds total runtime, and about `21 ms` average latency.

A screenshot of that exact 48-prompt output is not available because the AMD Dev Cloud notebook later became stuck around 90% while loading. The attached screenshots still prove the AMD ROCm/vLLM environment, Qwen model load, smoke audit, and JSON export path.

## What This Proves

The project used the provided AMD Jupyter environment as the compute layer. The notebook verified ROCm, loaded vLLM, ran Qwen inference on AMD GPU, generated audit results, and exported JSON for the Chaukidar app.

The AMD notebook later became stuck around 90% loading, which blocked additional final experiments such as larger dataset sweeps, multi-model ROCm comparison, and testing multiple Chaukidar agents directly on AMD GPUs. The screenshots above are the evidence from the successful run before that infrastructure issue.
