#!/bin/bash -e

GITHUB_TRIGGER_URL=https://api.github.com/repos/$TRAVIS_REPO_SLUG/deployments
>&2 echo "Trigger build on Github..."
curl -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"ref": "master", "task": "deploy", "environment": "pandawork",
  "payload": {
    "name": "puttyimages",
    "config": {
      "provider": "fabric",
      "auto_merge": false,
      "repository": "oursky/puttyimages-web",
      "environments": ["pandawork"],
      "allowed_rooms": ["deployment", "likecoin-internal"]
    }
  }}' \
  -X POST $GITHUB_TRIGGER_URL
