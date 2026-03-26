# Movie Explorer

Movie Explorer is a full-stack web application built for movie enthusiasts. It lets you browse movies, discover actors and directors, filter by genre or year, and save favourites.

---

## What user does

- Browse a library of movies with title, year, genres, and director info
- Filter movies by genre, director, actor, or release year
- Click into a movie to see the full cast, synopsis, and reviews
- View actor and director profile pages with their filmography
- Save movies to a Favourites or Watch Later list (stored in your browser)

---

## Tech stack

**Frontend** — React with TypeScript, Material UI for components, Vite as the build tool

**Backend** — Python with FastAPI, SQLAlchemy for the database layer

**Database** — PostgreSQL

**Infrastructure** — Docker and Docker Compose to tie everything together

---

## Running the app with Docker

This is the simplest way. From the root of the project:

```
docker compose up --build
```
OR in Mac/linux
```
./run.sh
```


That's it. Docker will build both the frontend and backend, start PostgreSQL, and seed the database with sample data automatically.

Once it's up:
- The app is at http://localhost:3000
- The API is at http://localhost:8000
- API docs (Swagger)http://localhost:8000/docs

---

## Project structure

```
movie-explorer/
├── backend/          Python/FastAPI app
├── frontend/         React/TypeScript app
├── docker-compose.yml
└── README.md
```