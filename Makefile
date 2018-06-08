.PHONY: test

docker_compose_test := docker-compose --project-name puttyimages_test

test:
	$(docker_compose_test) down -v
	$(docker_compose_test) build 1>/dev/null 2>&1
	$(docker_compose_test) up -d
	$(docker_compose_test) exec nuxt npm run lint
	$(docker_compose_test) exec nuxt npm run sequelize db:migrate
	$(docker_compose_test) exec nuxt npm run sequelize db:seed:all
	$(docker_compose_test) exec nuxt npm run test
	$(docker_compose_test) stop
