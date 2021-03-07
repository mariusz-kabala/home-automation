FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/alerts build

CMD [ "yarn", "workspace", "@home/alerts", "start" ]
