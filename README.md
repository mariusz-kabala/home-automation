# home-automation

Monorepo which contains my home automation services. Each service defined in this repo runs in a docker container on my Raspberry Pi 4. I'm using MQTT to communicate between services and storage data. Check README files inside packages to know more about services in this repo

## REQUIREMENTS

This repo uses yarn workspaces, requires `yarn 1.21+` and `nodejs v12`

## RUNNING THE PROJECT

### Install dependencies

```
yarn
```

### Build libraries required by services in this repo

```
yarn workspaces run prepare
```

### Run a service in dev mode

```
yarn workspace @home/${packageName} dev
```

### Build package TypeScript declaration

```
yarn workspace @home/${packageName} build-declarations
```

### Build prod version of service

```
yarn workspace @home/${packageName} build
```

### Run prod version of service (only after build step)

```
yarn workspace @home/${packageName} start
```

## ENVIRONMENT VARIABLES

Most of packages requires `.env` to run locally, check `.env.example` to see how to prepare your local `.env` files

## UNIT TESTS

```
yarn test
```

### DEPLOYMENT

CI is done using `Jenkins`, each deployable service here has it own `Dockerfile` and it is being deployed using `terraform` (configuration per package)
Deploymnent pipelines are shared between services

As for now, one of the services is deployed without docker - `tuyaPlugs` - as it can not be behind docker vritual network - in this case there is a separate pipeline defined in `jenkins/deploy_with_supervisor.groovy` that deploys that service (and maybe other in future)
