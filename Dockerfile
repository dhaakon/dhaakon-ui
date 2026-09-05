# Build the Storybook static site and serve it with nginx.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG UI_BUILD_REVISION=working-tree
ENV UI_BUILD_REVISION=$UI_BUILD_REVISION
RUN npm run build-storybook

FROM nginx:1.27-alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD curl -fsS http://localhost:8080/index.json -o /dev/null || exit 1
