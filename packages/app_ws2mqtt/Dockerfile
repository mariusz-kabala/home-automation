FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/ws2mqtt build

CMD [ "yarn", "workspace", "@home/ws2mqtt", "start" ]
