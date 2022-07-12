import config from 'config'
import { Room } from 'enums/Rooms'
import { Sensor } from 'types/Sensor'
import { Light } from 'types/Light'

export function isInRoom(device: Sensor | Light, room: Room, type: 'Sensor' | 'Light'): boolean {
  const mac = device.uniqueid.substr(0, 23)

  switch (type) {
    case 'Sensor':
      return config.get<{ [mac: string]: Room }>('mappers.sensorToRoom')[mac] === room

    case 'Light':
      return config.get<{ [mac: string]: Room }>('mappers.lightToRoom')[mac] === room
  }
}
