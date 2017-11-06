FROM node:boron

WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g yarn --quiet
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
