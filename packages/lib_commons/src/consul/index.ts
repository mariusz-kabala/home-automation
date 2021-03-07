import uuid from 'uuid'
import { logger } from '@home/logger'
import { consul } from './consul'
import os from 'os'

function getIPAddress(): string | undefined {
  const ifaces = os.networkInterfaces()

  for (const ifname of Object.keys(ifaces)) {
    const interfaces = ifaces[ifname]

    if (!interfaces) {
      continue
    }

    for (const iface of interfaces) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        continue
      }

      return iface.address
    }
  }
}

export const registerInConsul = (serviceName: string, port?: number): Promise<void> =>
  new Promise((resolve, reject) => {
    const ip = getIPAddress()
    const CONSUL_ID = `${serviceName}-${ip}-${port}-${uuid.v4()}`
    const consulDetails = {
      name: serviceName,
      tags: ['home-automation'],
      address: ip,
      check: {
        ttl: '10s',
        deregistercriticalserviceafter: '1m',
      },
      port,
      id: CONSUL_ID,
    }

    consul.agent.service.register(consulDetails, err => {
      if (err) {
        return reject(err)
      }

      logger.info(`${serviceName} service registered in consul`)

      setInterval(() => {
        consul.agent.check.pass({ id: `service:${CONSUL_ID}` }, err => {
          if (err) {
            logger.log({
              level: 'error',
              message: `Can not send heartbeat to consul ${err}`,
            })
          }
        })
      }, 5 * 1000)

      const shutdown = () =>
        consul.agent.service.deregister({ id: CONSUL_ID }, () => {
          logger.info(`${serviceName} service deregistered from consul`)
          process.exit()
        })

      process.on('SIGINT', shutdown)
      process.on('SIGHUP', shutdown)
      process.on('SIGTERM', shutdown)

      resolve()
    })
  })
