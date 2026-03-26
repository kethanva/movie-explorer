import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.database import Base, engine
from app.routes import actors, directors, genres, movies


@asynccontextmanager
# App startup and shutdown handler
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


app = FastAPI(
    title="Movie Explorer API",
    version="1.0.0",
    description="API for browsing movies, actors, directors, and genres.",
    redoc_url=None,
    lifespan=lifespan,
)

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
# Health check endpoint
def root():
    return {"message": "Movie Explorer API"}


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    schema.pop("components", None)
    app.openapi_schema = schema
    return app.openapi_schema


app.openapi = custom_openapi
