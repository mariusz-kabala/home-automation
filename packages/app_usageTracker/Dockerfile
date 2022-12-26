FROM node:19-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/usage-tracker build

CMD [ "yarn", "workspace", "@home/usage-tracker", "start" ]
