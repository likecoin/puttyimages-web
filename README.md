# puttyimages

Puttyimegs is an open stock image DApp that live within the
[LikeCoin](https://like.co/) ecosystem.

## Development Setup

The suggested way of development environment is docker based. This guide will
assume you have Docker Community Edition 18+ installed. Please download at
[https://store.docker.com](https://store.docker.com) and follow the
installation instruction.

After you setup docker, fun the following command to setup the docker image
and basic DB schema. Also kick start the docker container for development.

``` bash
# Build the docker images, run it for the first time or you have dependency
# updates
$ docker-compose build

# Run the DB migration and reseed the DB for the first time run or after you
# pull an update.
$ docker-compose run --rm nuxt npm run sequelize db:migrate
$ docker-compose run --rm nuxt npm run sequelize db:seed:all

# Kick of the development setup
$ docker-compose up
```

Local files are mount into docker you can modify file in your fs and will
hot reload.

## Test

``` bash
make test
```

## Production

``` bash
$ docker-compose -f docker-compose.production.yml build
$ docker-compose -f docker-compose.production.yml up
```

For detailed explanation on how things work, checkout the [Nuxt.js
docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the
application, so you can use the latest ES6 features (module syntax,
async/await, etc.).
