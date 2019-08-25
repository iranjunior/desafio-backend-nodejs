FROM node:12.9.0-alpine

ENV HOME=/home/app

COPY . $HOME
WORKDIR $HOME
RUN npm install -g yarn
RUN yarn install

EXPOSE 3333

CMD [ "yarn", "start" ]
