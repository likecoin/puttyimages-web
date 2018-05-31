# puttyimages

Puttyimegs is an open stock image DApp that live within the
[LikeCoin](https://like.co/) ecosystem.

## Development Setup

``` bash
$ docker-compose build
$ docker-compose up
```

Local files are mount into docker you can modify file in your fs and will
hot reload.

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
