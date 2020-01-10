FROM arm32v7/node:12

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/lg2mqtt build

CMD [ "yarn", "workspace", "@home/lg2mqtt", "start" ]
