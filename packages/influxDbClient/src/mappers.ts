import { environmentalSensors } from '@home/commons'

export function mapEnvironmentalSensorsToMeasurement(sensor: environmentalSensors, device: string): string | null {
  switch (sensor) {
    case environmentalSensors.temperature:
      if (
        [
          'Kitchen Motion Sensor',
          'Hallway Multi Sensor',
          'Bedroom Multi Sensor',
          'Bathroom Multi Sensor',
          'Hallway Multi Sensor',
          'Hallway Motion Sensor 1',
          'Hallway Motion Sensor 2',
          'Bathroom Motion Sensor 1',
        ].includes(device)
      ) {
        return 'ZHATemperature'
      }

      if (device === 'sense_hat') {
        return 'sense_hat'
      }

      return null

    case environmentalSensors.humidity:
      if (['Hallway Multi Sensor', 'Bedroom Multi Sensor', 'Bathroom Multi Sensor'].includes(device)) {
        return 'ZHAHumidity'
      }

      if (device === 'sense_hat') {
        return 'sense_hat'
      }

      return null

    case environmentalSensors.pressure:
      if (device === 'Hallway Multi Sensor') {
        return 'ZHAPressure'
      }

      if (device === 'sense_hat') {
        return 'sense_hat'
      }

      return null

    case environmentalSensors.eco2:
      if (device === 'sgp30') {
        return 'sgp30'
      }

      return null

    case environmentalSensors.tvoc:
      if (device === 'sgp30') {
        return 'sgp30'
      }

    default:
      return null
  }
}
