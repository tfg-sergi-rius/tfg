from fastapi import APIRouter, HTTPException
import uuid
import json

from backend.schemas import (
    RecommendationRatingRequest,
    RecommendationRatingResponse,
    RecommendationRequest,
    RecommendationResponse,
    RecommendationResult,
    StoredRecommendation,
)

from backend.services.recommender import generate_recommendations
from backend.services.recommender import generate_random_recommendation
from backend.database import engine
from backend.models import Recommendation

from sqlmodel import Session

router = APIRouter()


@router.post("/recommend", response_model=RecommendationResponse)
async def recommend(data: RecommendationRequest) -> RecommendationResponse:
    rec_id = str(uuid.uuid4())
    recommendations = generate_recommendations(data)

    with Session(engine) as session:
        rec = Recommendation(
            id=rec_id,
            data=json.dumps(recommendations)
        )

        session.add(rec)
        session.commit()

    return RecommendationResponse(id=rec_id)


@router.get("/recommendation/{rec_id}", response_model=RecommendationResult)
async def get_recommendation_endpoint(rec_id: str) -> RecommendationResult:

    with Session(engine) as session:

        rec = session.get(Recommendation, rec_id)

        if not rec:
            return RecommendationResult(status="processing")

        return RecommendationResult(
            status="done",
            rating=rec.rating,
            data=json.loads(rec.data)
        )


@router.get("/recommendations", response_model=list[StoredRecommendation])
async def get_all_recommendations() -> list[StoredRecommendation]:

    with Session(engine) as session:

        recs = session.query(Recommendation).all()

        return [
            StoredRecommendation(
                id=r.id,
                data=json.loads(r.data),
                rating=r.rating
            )
            for r in recs
        ]


@router.get("/recommend/random", response_model=StoredRecommendation | None)
async def get_random_recommendation():
    recommendation = generate_random_recommendation()
    rec_id = str(uuid.uuid4())

    with Session(engine) as session:
        rec = Recommendation(
            id=rec_id,
            data=json.dumps([recommendation])
        )

        session.add(rec)
        session.commit()

    return StoredRecommendation(
        id=rec_id,
        data=[recommendation],
        rating=None
    )


@router.patch("/recommendation/{rec_id}/rating", response_model=RecommendationRatingResponse)
async def update_recommendation_rating(
    rec_id: str,
    payload: RecommendationRatingRequest
) -> RecommendationRatingResponse:
    rating = payload.rating

    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    with Session(engine) as session:
        rec = session.get(Recommendation, rec_id)

        if not rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")

        rec.rating = rating
        session.add(rec)
        session.commit()

    return RecommendationRatingResponse(id=rec_id, rating=rating)
