# Apache Parquet Online Viewer

This is simple application to view Apache Parquet files. 
You can test it [here](http://static.133.190.201.138.clients.your-server.de:3000/)

## Run container

To run container from docker.hub
```bash
docker run --name=read-parquet-online -p 80:3000 --env NODE_ENV=production -d beer13/read-parquet-online 
```

## Run with docker-compose

```yaml
version: "3"
services:
  read-parquet-online:
    image: beer13/read-parquet-online:latest
    ports:
      - "80:3000"
    environment:
      NODE_ENV: "production"
```

# Development

## Run in docker
 - Install `docker` and `docker-compose`
 - `npm run docker:start` - start docker image
 - you can access server in `localhost:80`, or you can use API `localhost:80/documentation`

## Run in docker for development

- Install `docker` and `docker-compose`
- `npm run docker:build` - build docker image
- `npm run docker:start-dev` - start docker image
- you can access server in `localhost:3000`, or you can use API `localhost:3000/documentation`

## Run locally

 - `nvm use` (set node version as in `.nvmrc`) [Read about NVM](https://github.com/nvm-sh/nvm)
 - `npm i` install all dependencies
 - `npm run start-dev` for dev version or `npm run start` for prod version
