from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Genre
from app.schemas.schemas import GenreOut

router = APIRouter(prefix="/api/genres", tags=["genres"])


@router.get("", response_model=List[GenreOut])
# Fetch all genres
def list_genres(db: Session = Depends(get_db)):
    return db.query(Genre).order_by(Genre.name).all()
