FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/task-change-shelly-action-hooks build

CMD ["yarn", "workspace", "@home/task-change-shelly-action-hooks", "start"]
