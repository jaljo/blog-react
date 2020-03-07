FROM node:11.10.1-alpine as dev

WORKDIR /app
RUN chown 1000:1000 /app

USER 1000

CMD ["yarn"]

################################################################################

FROM dev as prod

COPY --chown=1000:1000 package.json package.json
COPY --chown=1000:1000 yarn.lock yarn.lock

RUN yarn install

ARG ENV_FILE

COPY --chown=1000:1000 ${ENV_FILE} .env
COPY --chown=1000:1000 public/ public/
COPY --chown=1000:1000 src/ src/

ENV NODE_ENV=production

RUN yarn run build

################################################################################

FROM nginx:1.15.8-alpine as nginx

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY --from=prod /app/build /app/build
COPY .docker/nginx/nginx.conf.tmpl /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

################################################################################

FROM traefik:v2.0 as traefik
