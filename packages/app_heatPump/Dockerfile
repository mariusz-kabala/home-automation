FROM node:17-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/heatpump build

CMD [ "yarn", "workspace", "@home/heatpump", "start" ]
