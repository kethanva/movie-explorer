import math
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Actor, Genre, Movie
from app.schemas.schemas import MovieDetail, MovieOut, PaginatedResponse

router = APIRouter(prefix="/api/movies", tags=["movies"])


@router.get("", response_model=PaginatedResponse[MovieOut])
# Fetch filtered paginated movies
def list_movies(
    genre_id: Optional[int] = Query(None),
    director_id: Optional[int] = Query(None),
    actor_id: Optional[int] = Query(None),
    year: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    q = db.query(Movie)

    if genre_id:
        q = q.filter(Movie.genres.any(Genre.id == genre_id))
    if director_id:
        q = q.filter(Movie.director_id == director_id)
    if actor_id:
        q = q.filter(Movie.actors.any(Actor.id == actor_id))
    if year:
        q = q.filter(Movie.release_year == year)
    if search:
        q = q.filter(Movie.title.ilike(f"%{search}%"))

    total = q.count()
    movies = q.order_by(Movie.release_year.desc()).offset((page - 1) * per_page).limit(per_page).all()

    return {
        "items": movies,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": math.ceil(total / per_page) if total else 1,
    }


@router.get("/{movie_id}", response_model=MovieDetail)
# Fetch movie by id
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie
