FROM node:18-alpine3.17 as build
WORKDIR /app/bot

COPY ./src ./src
COPY ./*.json ./
COPY ./docker/entrypoint.sh ./
COPY ./docker/wait-for-postgres.js ./
RUN apk add --no-cache postgresql gcc musl-dev linux-headers git python3 make g++

RUN npm install
RUN npx tsc
RUN rm -rf node_modules
RUN npm ci --production

FROM node:18-alpine3.14 as prod
WORKDIR /usr/src/bot

RUN adduser -D -H bot bot

COPY --from=build --chown=bot:bot /app/bot/package.json ./package.json
COPY --from=build --chown=bot:bot /app/bot/package-lock.json ./package-lock.json
COPY --from=build --chown=bot:bot /app/bot/node_modules ./node_modules
COPY --from=build --chown=bot:bot /app/bot/dist ./dist
COPY --from=build --chown=bot:bot /app/bot/entrypoint.sh ./
COPY --from=build --chown=bot:bot /app/bot/wait-for-postgres.js ./
USER bot

ENV NODE_ENV production
ENTRYPOINT [ "/usr/src/bot/entrypoint.sh" ]
