### STAGE 1: Build ###
FROM node:18-alpine3.16 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-prod
### STAGE 2: Run ###
FROM nginx:1.23.3-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/angular.nginx /etc/nginx/conf.d/frontend.conf
COPY --from=build /usr/src/app/dist/se_frontend /usr/share/nginx/frontend/
