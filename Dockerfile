FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml

RUN corepack enable pnpm

RUN pnpm i --frozen-lockfile --production

CMD ["yarn", "dev"]
