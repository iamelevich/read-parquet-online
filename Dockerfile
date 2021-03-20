FROM node:14-alpine as base

# Stage "build": Build app and put it into stage docker layer cache
FROM base AS build
WORKDIR /home/node/app/
COPY . .
RUN npm ci && cd client && npm ci && cd ..
# Build JavaScript files from TypeScript notation
RUN npm run build-all

# Stage "release": Copy app and from docker layer cache and build prod node_modules
FROM base AS release
WORKDIR /home/node/app/
COPY --from=build /home/node/app/package.json /home/node/app/package-lock.json ./
COPY --from=build /home/node/app/dist ./dist/
COPY --from=build /home/node/app/client/package.json /home/node/app/client/package-lock.json ./client/
COPY --from=build /home/node/app/client/dist ./client/dist/
RUN npm ci --production && cd client && npm ci --production && cd ..

ARG GIT_HASH
ARG GIT_REF
ARG GIT_URL
RUN sed -i "s~%GIT_HASH%~${GIT_HASH}~" package.json; \
    sed -i "s~%GIT_REF%~${GIT_REF}~" package.json; \
    sed -i "s~%GIT_URL%~${GIT_URL}~" package.json;

EXPOSE 3000
CMD node dist/src/index.js

