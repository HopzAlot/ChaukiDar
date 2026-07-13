# Chaukidar AMD Benchmarks

These notes document the AMD Developer Hackathon Jupyter work used as compute evidence for Track 3.

Screenshot evidence: `docs/amd-evidence.md`.

## AMD Runs

| Date | Platform | Model | Prompt Count | Languages | Tracks | Runtime | Avg Latency | Throughput |
| --- | --- | --- | ---: | --- | --- | ---: | ---: | ---: |
| 2026-07-13 | AMD Jupyter Hackathon Instance, ROCm + vLLM | Qwen/Qwen2.5-0.5B-Instruct | 180 | English, Urdu, Punjabi, Pashto, Sindhi | english_seed + translation_baseline + native_adapted | 2.15 sec | 12 ms | 83.73 prompts/sec |
| 2026-07-13 | AMD Jupyter Hackathon Instance, ROCm + vLLM | TinyLlama/TinyLlama-1.1B-Chat-v1.0 | 180 | English, Urdu, Punjabi, Pashto, Sindhi | english_seed + translation_baseline + native_adapted | 4.16 sec | 23 ms | 43.25 prompts/sec |

## Verified AMD Stack

The notebook run verified:

- `rocm-smi` could see the AMD GPU
- PyTorch reported HIP/ROCm support
- GPU availability was true
- vLLM was installed and able to load open-source language models
- batched prompt inference completed successfully on the AMD notebook instance

## Full Dataset Result

The AMD notebook loaded the complete Chaukidar dataset:

- prompt count: `180`
- languages: `en`, `ps`, `punjabi`, `sd`, `ur`
- tracks: `english_seed`, `native_adapted`, `translation_baseline`
- categories: `cyber_abuse`, `fraud_scams`, `hate_harassment`, `self_harm_content`, `violent_wrongdoing`
- track counts: `translation_baseline: 80`, `native_adapted: 80`, `english_seed: 20`

Both benchmark runs exported JSON payloads containing raw model responses plus hardware/version/benchmark metadata. Those JSON outputs were imported into Chaukidar and re-judged by the backend for consistent multilingual safety reporting.

## AMD Compute Role

AMD compute was used for the core model inference workload: loading open-source models with ROCm/vLLM and running the multilingual audit prompts as GPU-batched inference. Fireworks was used separately for hosted-model comparison and LLM-based judging.
