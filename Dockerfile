FROM node:boron

WORKDIR /usr/src/feely

COPY package.json .

RUN npm install -g yarn --quiet
RUN yarn install

COPY . /usr/src/feely/

EXPOSE 3000

CMD ["npm", "run", "dev"]
