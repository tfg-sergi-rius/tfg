from pydantic import BaseModel
from typing import List

class RecommendationRequest(BaseModel):
    carrera: str
    area: str
    tecnologias: List[str]
    dificultad: str
    interes: str


class RecommendationItem(BaseModel):
    title: str
    description: str
    technologies: List[str]


class RecommendationResponse(BaseModel):
    id: str


class RecommendationResult(BaseModel):
    status: str
    data: List[RecommendationItem] | None = None