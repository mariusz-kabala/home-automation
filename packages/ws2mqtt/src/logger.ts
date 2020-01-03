import * as colors from 'colors/safe'
import winston from 'winston'

const colorsMap: { [key: string]: (str: string) => string } = {
  debug: colors.blue,
  error: colors.red,
  info: colors.green,
}

const { printf } = winston.format

const myFormat = printf(({ level, message, module, timestamp }) => {
  const levelDsc = colorsMap[level](`[${level.toUpperCase()}]:`.padEnd(9))
  return `${timestamp} ${colors.yellow((module || 'unknown').padStart(20))} ${levelDsc} ${message}`
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
