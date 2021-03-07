FROM node:12.16.1-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/mqtt2http build

CMD [ "yarn", "workspace", "@home/mqtt2http", "start" ]
