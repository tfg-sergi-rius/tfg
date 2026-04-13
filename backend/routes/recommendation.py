from fastapi import APIRouter, Depends, HTTPException
import uuid
import json

from backend.auth import get_current_user
from backend.schemas import (
    ElaborateResponse,
    Question,
    QuestionsRequest,
    QuestionsResponse,
    RecommendationRatingRequest,
    RecommendationRatingResponse,
    RecommendationRequest,
    RecommendationResponse,
    RecommendationResult,
    StoredRecommendation,
)
from backend.services.recommender import (
    elaborate_recommendation,
    generate_questions,
    generate_recommendations,
    generate_random_recommendation,
)
from backend.database import engine
from backend.models import Recommendation

from sqlmodel import Session

router = APIRouter()


@router.post("/questions", response_model=QuestionsResponse)
async def get_questions(
    data: QuestionsRequest,
    current_user: dict = Depends(get_current_user),
) -> QuestionsResponse:
    questions = generate_questions(data.career)
    return QuestionsResponse(questions=[Question(**q) for q in questions])


@router.post("/recommend", response_model=RecommendationResponse)
async def recommend(
    data: RecommendationRequest,
    current_user: dict = Depends(get_current_user),
) -> RecommendationResponse:
    rec_id = str(uuid.uuid4())
    qa_pairs = [pair.model_dump() for pair in data.qa_pairs]
    recommendations = generate_recommendations(data.career, qa_pairs)

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


@router.get("/recommendation/{rec_id}/elaborate/{tfg_index}", response_model=ElaborateResponse)
async def elaborate(
    rec_id: str,
    tfg_index: int,
    current_user: dict = Depends(get_current_user),
) -> ElaborateResponse:
    with Session(engine) as session:
        rec = session.get(Recommendation, rec_id)

        if not rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")

        ideas = json.loads(rec.data)

        if tfg_index < 0 or tfg_index >= len(ideas):
            raise HTTPException(status_code=400, detail="Invalid TFG index")

        idea = ideas[tfg_index]
        result = elaborate_recommendation(
            title=idea["title"],
            description=idea["description"],
            technologies=idea.get("technologies", []),
        )
        return ElaborateResponse(**result)


@router.patch("/recommendation/{rec_id}/rating", response_model=RecommendationRatingResponse)
async def update_recommendation_rating(
    rec_id: str,
    payload: RecommendationRatingRequest,
    current_user: dict = Depends(get_current_user),
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