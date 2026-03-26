import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from app.main import app
from app.database import Base, get_db
from app.models.models import Actor, Director, Genre, Movie, Review

engine = create_engine("sqlite:///./test.db", connect_args={"check_same_thread": False})
Session = sessionmaker(bind=engine)


@pytest.fixture(scope="session", autouse=True)
def seed():
    Base.metadata.create_all(bind=engine)
    db = Session()

    d1 = Director(name="John Smith")
    d2 = Director(name="Jane Doe")
    a1 = Actor(name="Alice Johnson")
    a2 = Actor(name="Bob Williams")
    g1 = Genre(name="Action")
    g2 = Genre(name="Drama")
    g3 = Genre(name="Sci-Fi")

    m1 = Movie(title="Space Adventure", release_year=2020, rating=7.5, director=d1, genres=[g1, g3], actors=[a1])
    m2 = Movie(title="City Drama", release_year=2019, rating=8.0, director=d2, genres=[g2], actors=[a1, a2])

    db.add_all([d1, d2, a1, a2, g1, g2, g3, m1, m2])
    db.commit()
    db.add(Review(movie_id=m1.id, reviewer="Jane", rating=8.0, comment="loved it", date="2021-03-01"))
    db.commit()
    db.close()
    yield


@pytest.fixture
def client():
    def get_test_db():
        db = Session()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = get_test_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
