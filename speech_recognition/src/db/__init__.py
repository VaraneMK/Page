from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from ..config import DB_URI

__connect_args = None
if DB_URI.startswith("sqlite:///"):
    __connect_args = {"check_same_thread": False}


engine = create_engine(DB_URI, connect_args=__connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
