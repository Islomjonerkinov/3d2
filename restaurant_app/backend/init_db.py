import os
from app.core.database import engine, Base

def init_db():
    # Ma'lumotlar bazasini yaratish va jadvallarni shakllantirish
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()
