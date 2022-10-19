FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn workspaces run prepare && yarn workspace @home/task-update-shelly-settings build

CMD ["yarn", "workspace", "@home/task-update-shelly-settings", "start"]
