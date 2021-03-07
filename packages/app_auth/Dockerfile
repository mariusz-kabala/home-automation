FROM node:12.16.1-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/auth-service build

EXPOSE 3000

CMD [ "yarn", "workspace", "@home/auth-service", "start" ]
