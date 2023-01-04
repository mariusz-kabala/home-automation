const { NODE_ENV } = process.env

export const logger = {
  log({ level, message }: { level: string; message: string }) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ level, message }))
  },

  info(message: string) {
    this.log({ level: 'info', message })
  },

  error(message: string) {
    this.log({ level: 'error', message })
  },

  warn(message: string) {
    this.log({ level: 'warn', message })
  },
}

export const stream = {
  write: (message: string) => {
    if (NODE_ENV === 'test') {
      return
    }
    logger.info(message)
  },
}
