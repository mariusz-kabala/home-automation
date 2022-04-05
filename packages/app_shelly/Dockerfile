FROM node:17-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/shelly build

CMD [ "yarn", "workspace", "@home/shelly", "start" ]
