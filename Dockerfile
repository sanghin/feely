FROM node:10.16.3-jessie

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile --production

CMD ["yarn", "dev"]
