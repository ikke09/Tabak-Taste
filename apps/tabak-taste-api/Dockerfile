FROM node:lts-alpine AS builder

WORKDIR /tabak-taste-api
COPY dist/apps/tabak-taste-api/package*.json ./
RUN npm ci

FROM node:lts-alpine as production
ENV NODE_ENV production
ENV PORT $NX_API_PORT
ENV DATABSE_URL $NX_DATABASE_URL
ENV VERSION $NX_API_VERSION
WORKDIR /tabak-taste-api
COPY --from=deps /tabak-taste-client/node_modules ./node_modules
COPY --from=deps /tabak-taste-client/package.json ./package.json
COPY dist/apps/tabak-taste-api/ ./app

ENV NODE_ENV=production

EXPOSE 4200

CMD node ./app/main.js