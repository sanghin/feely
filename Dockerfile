FROM node:boron

WORKDIR /usr/src/app
RUN npm install -g yarn --quiet

COPY . .

EXPOSE 3000

ENTRYPOINT ["sh", "./entrypoint.sh"]

CMD ["npm", "run", "dev"]
