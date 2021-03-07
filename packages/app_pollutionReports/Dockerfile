FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/pollution-reports build

CMD [ "yarn", "workspace", "@home/pollution-reports", "start" ]
