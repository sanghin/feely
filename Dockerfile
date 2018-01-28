FROM node

RUN npm install -g yarn --quiet

WORKDIR /app

COPY package.json .

RUN yarn install

CMD ["npm", "run", "dev"]
