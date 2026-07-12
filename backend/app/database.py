from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import settings


def get_database_url() -> str:
    if settings.database_url.startswith("postgres://"):
        return settings.database_url.replace("postgres://", "postgresql+psycopg://", 1)
    if settings.database_url.startswith("postgresql://"):
        return settings.database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    return settings.database_url


database_url = get_database_url()
if database_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}
elif database_url.startswith("postgresql+psycopg"):
    connect_args = {"sslmode": "require", "prepare_threshold": None}
else:
    connect_args = {}
engine = create_engine(database_url, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
