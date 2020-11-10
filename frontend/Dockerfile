FROM node:12.16.1-alpine3.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
ARG REACT_APP_BASE_API="http://localhost:3100/api/"
RUN yarn --silent
COPY . /app
RUN yarn build

FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

ARG PORT=80

EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
