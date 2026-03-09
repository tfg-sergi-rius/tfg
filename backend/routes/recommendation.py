from fastapi import APIRouter
import uuid
import json

from backend.schemas import (
    RecommendationRequest,
    RecommendationResponse,
    RecommendationResult
)

from backend.services.recommender import generate_recommendations
from backend.database import engine
from backend.models import Recommendation

from sqlmodel import Session

router = APIRouter()


@router.post("/recommend", response_model=RecommendationResponse)
async def recommend(data: RecommendationRequest):

    rec_id = str(uuid.uuid4())

    recommendations = generate_recommendations(data)

    with Session(engine) as session:

        rec = Recommendation(
            id=rec_id,
            data=json.dumps(recommendations)
        )

        session.add(rec)
        session.commit()

    return {"id": rec_id}


@router.get("/recommendation/{rec_id}", response_model=RecommendationResult)
async def get_recommendation_endpoint(rec_id: str):

    with Session(engine) as session:

        rec = session.get(Recommendation, rec_id)

        if not rec:
            return {"status": "processing"}

        return {
            "status": "done",
            "data": json.loads(rec.data)
        }
    #Historial de recomendaciones
@router.get("/recommendations")
async def get_all_recommendations():

    with Session(engine) as session:

        recs = session.query(Recommendation).all()

        return [
            {
                "id": r.id,
                "data": json.loads(r.data)
            }
            for r in recs
        ]