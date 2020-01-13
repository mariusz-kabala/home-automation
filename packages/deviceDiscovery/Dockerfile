FROM arm32v7/node:12

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/device-discovery build

CMD [ "yarn", "workspace", "@home/device-discovery", "start" ]
