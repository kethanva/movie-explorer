import math
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Actor, Genre, Movie
from app.schemas.schemas import ActorOut, ActorWithMovies, PaginatedResponse

router = APIRouter(prefix="/api/actors", tags=["actors"])


@router.get("", response_model=PaginatedResponse[ActorOut])
def list_actors(
    movie_id: Optional[int] = Query(None),
    genre_id: Optional[int] = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    q = db.query(Actor)

    if movie_id:
        q = q.filter(Actor.movies.any(Movie.id == movie_id))
    if genre_id:
        q = q.filter(Actor.movies.any(Movie.genres.any(Genre.id == genre_id)))

    total = q.count()
    actors = q.order_by(Actor.name).offset((page - 1) * per_page).limit(per_page).all()

    return {
        "items": actors,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": math.ceil(total / per_page) if total else 1,
    }


@router.get("/{actor_id}", response_model=ActorWithMovies)
def get_actor(actor_id: int, db: Session = Depends(get_db)):
    actor = db.query(Actor).filter(Actor.id == actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    return actor
