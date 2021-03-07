import * as winston from 'winston'

const { NODE_ENV } = process.env

export const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'debug',
  transports: [new winston.transports.Console()],
})

export const stream = {
  write: (message: string) => {
    if (NODE_ENV === 'test') {
      return
    }
    logger.info(message)
  },
}
