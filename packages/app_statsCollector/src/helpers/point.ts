import { Point } from '@influxdata/influxdb-client'

export function writeToPoint(point: Point, value: any, name = 'value') {
  switch (typeof value) {
    case 'string':
      point.stringField(name, value)
      break

    case 'number':
      point.intField(name, value)
      break

    case 'boolean':
      point.booleanField(name, value)
      break

    default:
      break
  }
}
