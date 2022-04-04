import { Request, Response } from 'express'
import { ShellyModel, ConnectionStatus } from '@home/models'
import { logger } from '@home/logger'
import { fetchStatus } from '@home/shelly-api'

export const show = {
  async details(req: Request<{ id: string }>, res: Response) {
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
      return res.status(200).json(shelly)
    }

    let status

    try {
      status = await fetchStatus(shelly.status.wifi_sta.ip)
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not fetch shelly ${shelly.name} status from ${shelly.status.wifi_sta.ip} address. Error ${err}`,
      })

      shelly.httpStatus = ConnectionStatus.disconnected
      shelly.status = undefined
    }

    if (status) {
      shelly.httpStatus = ConnectionStatus.connected
      shelly.status = status
    }

    res
      .status(200)
      .json(shelly)
      .end()

    try {
      await shelly.save()
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Database error: ${err}`,
      })
    }
  },
}
