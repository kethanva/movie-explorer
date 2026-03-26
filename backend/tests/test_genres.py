def test_genres_returns_all(client):
    res = client.get("/api/genres")
    assert res.status_code == 200
    assert len(res.json()) == 3


def test_genres_are_sorted(client):
    names = [g["name"] for g in client.get("/api/genres").json()]
    assert names == sorted(names)
