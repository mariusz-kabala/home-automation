/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express'
import { ShellyModel, ConnectionStatus, IShelly } from '@home/models'
import { logger } from '@home/logger'
import { fetchStatus, updateFirmware } from '@home/shelly-api'

export const update = {
  async updateOne(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params
    let shelly

    try {
      shelly = await ShellyModel.findOne({ deviceId: id })
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Database error: ${err}`,
      })

      return res.status(500).end()
    }

    if (!shelly) {
      logger.log({
        level: 'warn',
        message: `Shelly device with ID: ${id} not found`,
      })

      return res.status(404).end()
    }

    if (shelly.httpStatus !== ConnectionStatus.connected) {
      logger.log({
        level: 'error',
        message: `Can not update device ${id} (${shelly.name}) - can not reach it with http request`,
      })
      return res.status(403).end()
    }

    let status

    try {
      status = await fetchStatus(shelly.status.wifi_sta.ip)
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not fetch shelly ${shelly.name} status from ${shelly.status.wifi_sta.ip} address. Error ${err}`,
      })

      return res.status(403).end()
    }

    const {
      update: { has_update },
    } = status

    if (!has_update) {
      logger.log({
        level: 'error',
        message: `Device ${id} (${shelly.name}) has no update`,
      })
      return res.status(403).end()
    }

    try {
      await updateFirmware(shelly.status.wifi_sta.ip)
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not update device ${id} (${shelly.name}) - ${err}`,
      })

      return res.status(500).end()
    }

    return res.status(200).end()
  },

  async updateAll(_: Request, res: Response) {
    ShellyModel.find({
      httpStatus: ConnectionStatus.connected,
    })
      .then(async (devices: IShelly[]) => {
        for await (const device of devices) {
          const {
            update: { has_update },
          } = device.status

          if (!has_update) {
            continue
          }

          try {
            await updateFirmware(device.status.wifi_sta.ip)
          } catch (err) {
            logger.log({
              level: 'error',
              message: `Can not update device ${device.id} (${device.name}) - ${err}`,
            })

            continue
          }
        }

        return res.status(200).end()
      })
      .catch(err => {
        logger.log({
          level: 'error',
          message: `Database error: ${err}`,
        })

        res.status(200).end()
      })
  },
}
