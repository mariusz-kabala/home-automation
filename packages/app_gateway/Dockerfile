FROM node:17-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/gateway build

CMD [ "yarn", "workspace", "@home/gateway", "start" ]
