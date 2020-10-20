# Apache Parquet Online Viewer

This is simple application to view Apache Parquet files. 
You can test it [here](http://static.133.190.201.138.clients.your-server.de/)

## Run in docker
 - Install `docker` and `docker-compose`
 - `npm run docker:build` - build docker image
 - `npm run docker:start` - start docker image
 - you can access server in `localhost:3000`, or you can use API `localhost:3000/documentation`

## Run locally

 - `nvm use` (set node version as in `.nvmrc`) [Read about NVM](https://github.com/nvm-sh/nvm)
 - `npm i` install all dependencies
 - `npm run start-dev` for dev version or `npm run start` for prod version
