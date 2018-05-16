FROM node:carbon

# Remove the version of yarn that is coming with node:8 & Install latest yarn
RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn

WORKDIR /app

COPY package.json .

RUN yarn install

CMD ["npm", "run", "dev"]
