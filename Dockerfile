# base stage to have pnpm installed
FROM node:21-alpine AS base

# development stage
FROM base AS development 
ARG APP
RUN echo "APP: ${APP}" 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
ENV APP=${APP}
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./ 
RUN npm install
COPY . . 
CMD ["sh", "-c", "npx prisma generate && npm run start:${APP}:dev"]
