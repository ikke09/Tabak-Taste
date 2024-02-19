# Install dependencies only when needed
FROM nginx:stable-alpine

WORKDIR /tabak-taste-client

ENV NODE_ENV production
ENV PORT $NX_PORT
ENV REPO $NX_APP_REPO_LINK
ENV AUTHOR $NX_APP_AUTHOR
ENV API_BASE_URL $NX_API_BASE_URL

COPY dist/apps/tabak-taste-client /usr/share/nginx/html
COPY apps/tabak-taste-client/nginx.conf /etc/nginx/nginx.conf
