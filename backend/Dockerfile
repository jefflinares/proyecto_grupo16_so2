FROM node:12 AS build-env
ADD . /app
WORKDIR /app

RUN npm install --production

FROM gcr.io/distroless/nodejs:12
COPY --from=build-env /app /app
WORKDIR /app

ARG PORT=3100
ARG URL_MONGO="mongodb://127.0.0.1:27017/plataformaDB"
ARG USER_MONGO=""
ARG PASSWORD_MONGO=""

EXPOSE $PORT

CMD ["npm", "start"]
