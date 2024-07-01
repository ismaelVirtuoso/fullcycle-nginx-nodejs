FROM node:22 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY start.sh ./

RUN npm install

COPY . .

FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash

COPY --from=builder /usr/src/app/ .

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
