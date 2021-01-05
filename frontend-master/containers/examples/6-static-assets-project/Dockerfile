# build statge
FROM node:12-stretch AS build
WORKDIR /src
COPY . .
RUN npm ci && npm run build

# runtime state
FROM nginx:latest
COPY --from=build /src/build /usr/share/nginx/html
