from fastapi import FastAPI
from backend.routes.recommendation import router as recommendation_router
from backend.database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware


# $env:OPENAI_API_KEY="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"
app = FastAPI(
    title="TFG Recommender API",
    version="1.0.0"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendation_router)
app.include_router(recommendation_router)

@app.get("/")
def root():
    return {"message": "TFG recommender API running"}

@app.on_event("startup")
def on_startup():
    create_db_and_tables()