FROM node:14 as base
WORKDIR /home/node/app/

# Stage "dependencies": Build node_modules and put it into stage docker layer cache
FROM base AS dependencies
COPY package.json package-lock.json /home/node/app/
COPY client/package.json client/package-lock.json /home/node/app/client/
RUN npm ci && cd client && npm ci && cd ..

# Stage "release": Copy node_modules and from docker layer cache and update application source code
# Stage "release": Copy node_modules and from docker layer cache and update application source code
FROM base AS release
COPY --from=dependencies /home/node/app/node_modules ./node_modules
COPY --from=dependencies /home/node/app/client/node_modules ./client/node_modules
COPY . /home/node/app/

# Build JavaScript files from TypeScript notation
RUN npm run build-all

ARG GIT_HASH
ARG GIT_REF
ARG GIT_URL
RUN sed -i "s~%GIT_HASH%~${GIT_HASH}~" package.json; \
    sed -i "s~%GIT_REF%~${GIT_REF}~" package.json; \
    sed -i "s~%GIT_URL%~${GIT_URL}~" package.json;

EXPOSE 3000
CMD node dist/src/index.js

