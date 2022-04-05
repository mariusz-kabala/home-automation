import { Request } from 'express'
import { ConnectionStatus, ShellyCategory, ShellyType, Room } from '@home/models'

export interface ISearchQueryParams {
  level?: string
  category?: ShellyCategory
  room?: Room
  type?: ShellyType
  mqttStatus?: ConnectionStatus
  httpStatus?: ConnectionStatus
}

export interface ISearchParams {
  level?: number
  category?: ShellyCategory
  room?: Room
  type?: ShellyType
  mqttStatus?: ConnectionStatus
  httpStatus?: ConnectionStatus
}

export function parseSearchQuery(req: Request<{}, {}, {}, ISearchQueryParams>): ISearchParams {
  const { level, category, room, type, mqttStatus, httpStatus } = req.query
  const dbQuery: ISearchParams = {}

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

  return dbQuery
}
