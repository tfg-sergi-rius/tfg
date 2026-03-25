import os
import sqlite3

from sqlmodel import SQLModel, create_engine

sqlite_file_name = os.getenv("SQLITE_FILE_NAME", "database.db")
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    ensure_recommendation_rating_column()


def ensure_recommendation_rating_column():
    with sqlite3.connect(sqlite_file_name) as connection:
        cursor = connection.cursor()
        cursor.execute("PRAGMA table_info(recommendation)")
        columns = [row[1] for row in cursor.fetchall()]

        if "rating" not in columns:
            cursor.execute("ALTER TABLE recommendation ADD COLUMN rating INTEGER")
            connection.commit()
