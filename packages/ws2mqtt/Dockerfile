FROM arm32v7/node:12-14-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspace @home/ws2mqtt build

CMD [ "yarn", "workspace", "@home/ws2mqtt", "start" ]