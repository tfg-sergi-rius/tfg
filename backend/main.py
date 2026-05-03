from pathlib import Path

from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

env_path = Path(__file__).resolve().parent.parent / ".env.development"
load_dotenv(env_path, override=False)

from backend.routes.recommendation import router as recommendation_router
from backend.database import create_db_and_tables
from backend.auth import init_firebase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendation_router)

@app.get("/")
def root():
    return {"message": "TFG recommender API running"}

@app.on_event("startup")
def on_startup():
    init_firebase()
    create_db_and_tables()
