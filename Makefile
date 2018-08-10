.PHONY: test

docker_compose_test := docker-compose -f docker-compose.yml \
	-f docker-compose.testing.yml --project-name puttyimages_test

test:
	$(docker_compose_test) build 1>/dev/null 2>&1
	$(docker_compose_test) run --rm nuxt bash -c 'npm run lint && npm test'
