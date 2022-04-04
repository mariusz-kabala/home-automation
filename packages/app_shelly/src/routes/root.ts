import { Request, Response } from 'express'
import { ShellyModel, ConnectionStatus, ShellyCategory, ShellyType, Room } from '@home/models'
import { logger } from '@home/logger'
import { getPaginationParams, IPaginationParams } from '@home/commons'

interface IFindParams extends IPaginationParams {
  level?: string
  category?: ShellyCategory
  room?: Room
  type?: ShellyType
  mqttStatus?: ConnectionStatus
  httpStatus?: ConnectionStatus
}

export const find = {
  list(req: Request, res: Response) {
    const { limit, offset } = getPaginationParams(req)

    ShellyModel.paginate(
      {},
      {
        offset,
        limit,
      },
      (err, result) => {
        if (err) {
          logger.log({
            level: 'error',
            message: `Database error: ${err}`,
          })

          return res.status(500).end()
        }

        res.status(200).json(result)
      },
    )
  },
  find(req: Request<{}, {}, {}, IFindParams>, res: Response) {
    const { level, category, room, type, mqttStatus, httpStatus } = req.query
    const dbQuery: {
      level?: number
      category?: ShellyCategory
      room?: Room
      type?: ShellyType
      mqttStatus?: ConnectionStatus
      httpStatus?: ConnectionStatus
    } = {}

    if (level && ['0', '1'].includes(level)) {
      dbQuery.level = parseInt(level, 10)
    }

    if (category && [ShellyCategory.blinds, ShellyCategory.button, ShellyCategory.lights].includes(category)) {
      dbQuery.category = category
    }

    if (
      room &&
      [
        Room.AboveGarageRoom,
        Room.Bedroom,
        Room.BoilerRoom,
        Room.DiningRoom,
        Room.Garage,
        Room.GuestRoom,
        Room.Gym,
        Room.Hall,
        Room.Kitchen,
        Room.Larder,
        Room.LaundryRoom,
        Room.LivingRoom,
        Room.Office,
        Room.Stairs,
        Room.ToiletDownstairs,
      ].includes(room)
    ) {
      dbQuery.room = room
    }

    if (type && [ShellyType.shelly1, ShellyType.shelly1pm, ShellyType.shellyswitch25].includes(type)) {
      dbQuery.type = type
    }

    if (
      mqttStatus &&
      [ConnectionStatus.connected, ConnectionStatus.disconnected, ConnectionStatus.unknown].includes(mqttStatus)
    ) {
      dbQuery.mqttStatus = mqttStatus
    }

    if (
      httpStatus &&
      [ConnectionStatus.connected, ConnectionStatus.disconnected, ConnectionStatus.unknown].includes(httpStatus)
    ) {
      dbQuery.httpStatus = httpStatus
    }

    const { limit, offset } = getPaginationParams(req)

    ShellyModel.paginate(
      dbQuery,
      {
        offset,
        limit,
      },
      (err, result) => {
        if (err) {
          logger.log({
            level: 'error',
            message: `Database error: ${err}`,
          })

          return res.status(500).end()
        }

        res.status(200).json(result)
      },
    )
  },
}
