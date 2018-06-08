#!/bin/bash -e

>&2 echo "Using user $DOCKER_USERNAME on Docker Hub..."

>&2 echo "Building image for $TRAVIS_REPO_SLUG..."
docker build -t $TRAVIS_REPO_SLUG:$(git rev-parse --short HEAD) .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

>&2 echo "Pusing image to $TRAVIS_REPO_SLUG..."
docker push $TRAVIS_REPO_SLUG
