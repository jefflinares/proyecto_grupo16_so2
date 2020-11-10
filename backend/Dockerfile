FROM node:12
ADD . /app
WORKDIR /app

RUN npm install

ARG PORT=3100
ARG URL_MONGO="mongodb://127.0.0.1:27017/plataformaDB"
ARG USER_MONGO=""
ARG PASSWORD_MONGO=""

EXPOSE $PORT

CMD ["npm", "run", "dev"]
