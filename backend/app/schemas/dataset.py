from pydantic import BaseModel, Field


class CustomPromptRecord(BaseModel):
    seed_id: str | None = None
    harm_category: str
    language: str
    track: str
    prompt_text: str = Field(min_length=1)
    intent_summary: str = Field(min_length=1)
    risk_level_hint: str = "medium"


class CustomDatasetPayload(BaseModel):
    records: list[CustomPromptRecord]


class CustomDatasetImportResult(BaseModel):
    imported: int
    updated: int
    generated_seed_ids: int
    languages: list[str]
    harm_categories: list[str]
    tracks: list[str]
