from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# SQLite ishlatamiz (oson o'rnatish va test qilish uchun),
# lekin kerak bo'lsa PostgreSQLga o'zgartirish mumkin
SQLALCHEMY_DATABASE_URL = "sqlite:///./restaurant.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# DB sessiyasi uchun dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
