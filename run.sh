#!/bin/bash

docker compose up --build -d

echo "Frontend running at http://localhost:3000"
echo "Backend running at http://localhost:8000"
