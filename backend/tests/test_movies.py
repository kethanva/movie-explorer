def test_movies_returns_list(client):
    res = client.get("/api/movies")
    assert res.status_code == 200
    assert res.json()["total"] == 2


def test_movie_has_basic_fields(client):
    movie = client.get("/api/movies").json()["items"][0]
    assert "title" in movie
    assert "release_year" in movie
    assert "director" in movie


def test_search_works(client):
    res = client.get("/api/movies?search=Space")
    assert res.json()["items"][0]["title"] == "Space Adventure"


def test_filter_by_year(client):
    res = client.get("/api/movies?year=2019")
    assert res.json()["items"][0]["title"] == "City Drama"


def test_get_single_movie(client):
    movie_id = client.get("/api/movies").json()["items"][0]["id"]
    res = client.get(f"/api/movies/{movie_id}")
    assert res.status_code == 200
    assert res.json()["id"] == movie_id
    assert "reviews" in res.json()


def test_movie_not_found(client):
    res = client.get("/api/movies/99999")
    assert res.status_code == 404
