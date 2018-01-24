FROM node:boron

RUN npm install -g yarn --quiet

WORKDIR /app

ADD ./ /app

RUN yarn install

CMD ["npm", "run", "dev"]
