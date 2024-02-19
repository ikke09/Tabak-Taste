FROM node:lts-alpine AS builder

WORKDIR /tabak-taste-api
COPY dist/apps/tabak-taste-api/package*.json ./
RUN npm ci

FROM node:lts-alpine as production
ENV NODE_ENV production
ENV PORT $NX_API_PORT
ENV VERSION $NX_API_VERSION
COPY dist/apps/tabak-taste-api/ ./app

ENV NODE_ENV=production

EXPOSE 4200

CMD node ./app/main.js