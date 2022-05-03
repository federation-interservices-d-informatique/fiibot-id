FROM node:18-alpine3.14 as build
WORKDIR /app/bot

COPY ./src ./src
COPY ./*.json ./
COPY ./docker/entrypoint.sh ./
RUN apk update && \
    apk add --no-cache postgresql gcc musl-dev linux-headers git python3 make g++

RUN npm install
RUN npx tsc

FROM node:18-alpine3.14 as prod
WORKDIR /usr/src/bot
RUN apk update && \
    apk add --no-cache postgresql gcc musl-dev linux-headers git python3 make g++
RUN adduser -D -H bot bot

COPY --from=build --chown=bot:bot /app/bot/package.json ./package.json
COPY --from=build --chown=bot:bot /app/bot/package-lock.json ./package-lock.json
RUN npm ci --production

COPY --from=build --chown=bot:bot /app/bot/dist ./dist
COPY --from=build --chown=bot:bot /app/bot/entrypoint.sh ./

USER bot

ENV NODE_ENV production
ENTRYPOINT [ "/usr/src/bot/entrypoint.sh" ]
