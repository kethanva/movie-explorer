import time
from app.database import SessionLocal, engine
from app.models.models import Actor, Base, Director, Genre, Movie, Review

# Wait for DB to be ready
for _ in range(30):
    try:
        with engine.connect(): break
    except Exception:
        time.sleep(1)

Base.metadata.create_all(bind=engine)
db = SessionLocal()

if db.query(Genre).first():
    print("Database already seeded.")
    exit(0)

# Create entities
g_action, g_drama, g_scifi = Genre(name="Action"), Genre(name="Drama"), Genre(name="Sci-Fi")
d1, d2 = Director(name="Director 1"), Director(name="Director 2")
a1, a2, a3 = Actor(name="Actor 1"), Actor(name="Actor 2"), Actor(name="Actor 3")

m1 = Movie(
    title="Movie 1", release_year=2020, synopsis="Synopsis 1", rating=7.5,
    director=d1, genres=[g_action, g_drama], actors=[a1, a2]
)

m2 = Movie(
    title="Movie 2", release_year=2021, synopsis="Synopsis 2", rating=8.0,
    director=d2, genres=[g_scifi], actors=[a2, a3]
)

# Save everything
db.add_all([g_action, g_drama, g_scifi, d1, d2, a1, a2, a3, m1, m2])
db.commit()

# Add reviews after movies get their IDs
db.add_all([
    Review(movie_id=m1.id, reviewer="Reviewer 1", rating=7.5, comment="Good", date="2020-01-01"),
    Review(movie_id=m2.id, reviewer="Reviewer 2", rating=8.0, comment="Great", date="2021-06-15")
])
db.commit()

print("Seeded database successfully.")
db.close()
