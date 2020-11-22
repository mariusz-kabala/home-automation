FROM node:14.15.1-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/service-apollo build

CMD [ "yarn", "workspace", "@home/service-apollo", "start" ]
