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

## Continuous Integration

Oursky hosts a staging continuous integration pipeline for fast review. The
deployed endpoint is
[https://puttyimages.pandawork.com](https://puttyimages.pandawork.com). The
endpoint is in sync with the `master` branch of [Oursky
fork](https://github.com/oursky/puttyimages-web) via Travis-CI. You can send PR to the
branch if you want your changes reflect on the review endpoint.

The continuous integration setup is assuming an
[kubernetes](https://kubernetes.io) environment. If you want to deploy your
own instances, you can checkout the `./k8s` folder for details.

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
