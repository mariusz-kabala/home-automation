/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express'
import { logger } from '@home/logger'
import { ShellyModel } from '@home/models'
import { moveRoller, turnRelay } from '@home/shelly-api'

export const actions = {
  async turn(req: Request<{ id: string; relay: string }, {}, {}, { turn: 'on' | 'off' }>, res: Response) {
    const { id, relay } = req.params
    const { turn } = req.query
    let shelly

    if (!['on', 'off'].includes(turn)) {
      logger.log({
        level: 'error',
        message: `Invalid turn GET param - ${turn}; device: ${id}; relay: ${relay}`,
      })
      return res.status(400).end()
    }

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

    const { relays } = shelly.status
    const relayInt = parseInt(relay, 10)

    if (!Array.isArray(relays) || !relays[relayInt]) {
      logger.log({
        level: 'warn',
        message: `Shelly device with ID: ${id} (${shelly.name}) does not have relay ${relay}`,
      })

      return res.status(404).end()
    }

    try {
      await turnRelay(shelly.status.wifi_sta.ip, relay, turn)
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not turn ${turn} device ${id}. Error: ${err}`,
      })

      return res.status(500).end()
    }

    res.status(200).end()
  },
  async move(
    req: Request<
      { id: string; roller: string },
      {},
      {},
      { go: 'open' | 'stop' | 'close' | 'to_pos'; roller_pos?: string }
    >,
    res: Response,
  ) {
    const { id, roller } = req.params
    const { go, roller_pos } = req.query
    let shelly

    if (roller_pos) {
      const rollerPosInt = parseInt(roller_pos, 10)

      if (isNaN(rollerPosInt) || rollerPosInt < 0 || rollerPosInt > 100) {
        logger.log({
          level: 'error',
          message: `Invalid roller_pos GET param - ${roller_pos}; device: ${id}; roller: ${roller}`,
        })
        return res.status(400).end()
      }
    }

    if (!['open', 'stop', 'close', 'to_pos'].includes(go)) {
      logger.log({
        level: 'error',
        message: `Invalid go GET param - ${go}; device: ${id}; roller: ${roller}`,
      })
      return res.status(400).end()
    }

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

    const { rollers } = shelly.status
    const rollerInt = parseInt(roller, 10)

    if (!Array.isArray(rollers) || !rollers[rollerInt]) {
      logger.log({
        level: 'warn',
        message: `Shelly device with ID: ${id} (${shelly.name}) does not have roller ${rollerInt}`,
      })

      return res.status(404).end()
    }

    try {
      await moveRoller(shelly.status.wifi_sta.ip, rollerInt, { go, roller_pos })
    } catch (err) {
      logger.log({
        level: 'error',
        message: `Can not move device ${id}. Error: ${err}`,
      })

      return res.status(500).end()
    }

    res.status(200).end()
  },
}
