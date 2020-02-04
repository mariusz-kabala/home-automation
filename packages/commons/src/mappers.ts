import { rooms, environmentalSensors } from './enums'

export interface ISensorsMapper {
  [environmentalSensors.temperature]: string
  [environmentalSensors.pressure]: string
  [environmentalSensors.humidity]: string
  [environmentalSensors.eco2]: string
  [environmentalSensors.tvoc]: string
}

export const roomToSensorsMapper: {
  [rooms.kitchen]: ISensorsMapper
  [rooms.bedroom]: ISensorsMapper
  [rooms.bathroom]: ISensorsMapper
  [rooms.hallway]: ISensorsMapper
  [rooms.livingroom]: ISensorsMapper
} = {
  [rooms.kitchen]: {
    [environmentalSensors.temperature]: 'Kitchen Motion Sensor',
    [environmentalSensors.pressure]: 'sense_hat',
    [environmentalSensors.humidity]: 'Hallway Multi Sensor',
    [environmentalSensors.eco2]: 'sgp30',
    [environmentalSensors.tvoc]: 'sgp30',
  },
  [rooms.bedroom]: {
    [environmentalSensors.temperature]: 'Bedroom Multi Sensor',
    [environmentalSensors.pressure]: 'sense_hat',
    [environmentalSensors.humidity]: 'Bedroom Multi Sensor',
    [environmentalSensors.eco2]: 'sgp30',
    [environmentalSensors.tvoc]: 'sgp30',
  },
  [rooms.bathroom]: {
    [environmentalSensors.temperature]: 'Bathroom Multi Sensor',
    [environmentalSensors.pressure]: 'sense_hat',
    [environmentalSensors.humidity]: 'Bathroom Multi Sensor',
    [environmentalSensors.eco2]: 'sgp30',
    [environmentalSensors.tvoc]: 'sgp30',
  },
  [rooms.hallway]: {
    [environmentalSensors.temperature]: 'Hallway Motion Sensor 1',
    [environmentalSensors.pressure]: 'sense_hat',
    [environmentalSensors.humidity]: 'Hallway Multi Sensor',
    [environmentalSensors.eco2]: 'sgp30',
    [environmentalSensors.tvoc]: 'sgp30',
  },
  [rooms.livingroom]: {
    [environmentalSensors.temperature]: 'Kitchen Motion Sensor',
    [environmentalSensors.pressure]: 'sense_hat',
    [environmentalSensors.humidity]: 'Hallway Multi Sensor',
    [environmentalSensors.eco2]: 'sgp30',
    [environmentalSensors.tvoc]: 'sgp30',
  },
}
