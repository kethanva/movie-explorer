import math
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Director
from app.schemas.schemas import DirectorOut, DirectorWithMovies, PaginatedResponse

router = APIRouter(prefix="/api/directors", tags=["directors"])


@router.get("", response_model=PaginatedResponse[DirectorOut])
def list_directors(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    total = db.query(Director).count()
    directors = (
        db.query(Director)
        .order_by(Director.name)
        .offset((page - 1) * per_page)
        .limit(per_page)
        .all()
    )

    return {
        "items": directors,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": math.ceil(total / per_page) if total else 1,
    }


@router.get("/{director_id}", response_model=DirectorWithMovies)
def get_director(director_id: int, db: Session = Depends(get_db)):
    director = db.query(Director).filter(Director.id == director_id).first()
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    return director
