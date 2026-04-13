from pydantic import BaseModel
from typing import List


class QuestionsRequest(BaseModel):
    career: str


class Question(BaseModel):
    id: str
    question: str


class QuestionsResponse(BaseModel):
    questions: List[Question]


class QAPair(BaseModel):
    question: str
    answer: str


class RecommendationRequest(BaseModel):
    career: str
    qa_pairs: List[QAPair]


class RecommendationItem(BaseModel):
    title: str
    description: str
    technologies: List[str]


class RecommendationResponse(BaseModel):
    id: str


class RecommendationResult(BaseModel):
    status: str
    rating: int | None = None
    data: List[RecommendationItem] | None = None


class StoredRecommendation(BaseModel):
    id: str
    data: List[RecommendationItem]
    rating: int | None = None


class ElaborateResponse(BaseModel):
    summary: str
    phases: List[str]
    challenges: List[str]
    resources: List[str]


class RecommendationRatingRequest(BaseModel):
    rating: int


class RecommendationRatingResponse(BaseModel):
    id: str
    rating: int