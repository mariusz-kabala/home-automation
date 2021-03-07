FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/lg2mqtt build

CMD [ "yarn", "workspace", "@home/lg2mqtt", "start" ]
