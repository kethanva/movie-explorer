from __future__ import annotations
from pydantic import BaseModel
from typing import Optional, List, Generic, TypeVar

T = TypeVar("T")


class GenreOut(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}


class DirectorOut(BaseModel):
    id: int
    name: str
    bio: Optional[str] = None
    birth_date: Optional[str] = None
    nationality: Optional[str] = None
    photo_url: Optional[str] = None

    model_config = {"from_attributes": True}


class ActorOut(BaseModel):
    id: int
    name: str
    bio: Optional[str] = None
    birth_date: Optional[str] = None
    nationality: Optional[str] = None
    photo_url: Optional[str] = None

    model_config = {"from_attributes": True}


class ReviewOut(BaseModel):
    id: int
    reviewer: str
    rating: float
    comment: str
    date: str

    model_config = {"from_attributes": True}


class MovieOut(BaseModel):
    id: int
    title: str
    release_year: int
    synopsis: Optional[str] = None
    poster_url: Optional[str] = None
    rating: float
    genres: List[GenreOut] = []
    director: DirectorOut
    actors: List[ActorOut] = []

    model_config = {"from_attributes": True}


class MovieDetail(MovieOut):
    reviews: List[ReviewOut] = []


class DirectorWithMovies(DirectorOut):
    movies: List[MovieOut] = []


class ActorWithMovies(ActorOut):
    movies: List[MovieOut] = []


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    per_page: int
    total_pages: int
