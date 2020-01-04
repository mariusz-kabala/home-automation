import * as winston from 'winston'

const { printf } = winston.format

const myFormat = printf(({ level, message, timestamp }) => {
  const levelDsc = `[${level.toUpperCase()}]:`.padEnd(9)
  return `${timestamp} ${levelDsc} ${message}`
})

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    myFormat,
  ),
  level: 'debug',
  transports: [new winston.transports.Console()],
})
