def test_actors_returns_list(client):
    res = client.get("/api/actors")
    assert res.status_code == 200
    assert res.json()["total"] == 2


def test_get_single_actor(client):
    actor_id = client.get("/api/actors").json()["items"][0]["id"]
    res = client.get(f"/api/actors/{actor_id}")
    assert res.status_code == 200
    assert "movies" in res.json()


def test_actor_not_found(client):
    res = client.get("/api/actors/99999")
    assert res.status_code == 404
