import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import actors, directors, genres, movies


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Wait for Postgres to be ready (up to 30 seconds)
    for attempt in range(30):
        try:
            with engine.connect():
                break
        except Exception:
            if attempt == 29:
                raise
            time.sleep(1)

    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Movie Explorer API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
app.include_router(actors.router)
app.include_router(directors.router)
app.include_router(genres.router)


@app.get("/")
def root():
    return {"message": "Movie Explorer API"}
