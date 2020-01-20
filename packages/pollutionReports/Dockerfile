FROM arm32v7/node:12

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/pollution-reports build

CMD [ "yarn", "workspace", "@home/pollution-reports", "start" ]
