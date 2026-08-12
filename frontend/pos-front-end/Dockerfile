# Stage 1: Install dependencies
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci


# Stage 2: Build application
FROM dependencies AS builder

COPY . .

RUN npm run build


# Stage 3: Run application
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]