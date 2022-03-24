FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/task-update-shelly-status build

RUN yarn workspace @home/task-update-shelly-status start
