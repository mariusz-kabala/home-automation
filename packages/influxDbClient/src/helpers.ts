import { queryBuilder } from './queryBuilder'
import { mapEnvironmentalSensorsToMeasurement } from './mappers'
import { environmentalSensors, roomToSensorsMapper, rooms } from '@home/commons'
import { influx } from './client'

export function readSensorMeasurements(params: {
    sensor: environmentalSensors,
    device: string,
    timeRange?: string,
    limit?: string
    orderBy?: string
}) {
    const { sensor, device, timeRange = '1h', orderBy = 'time desc', limit } = params
    const table = mapEnvironmentalSensorsToMeasurement(sensor, device)

    if (table === null) {
        return null
    }

    switch (device) {
        case 'Kitchen Motion Sensor':
        case 'Hallway Multi Sensor':
        case 'Bedroom Multi Sensor':
        case 'Bathroom Multi Sensor':
        case 'Hallway Motion Sensor 1':
        case 'Hallway Motion Sensor 2':
            return {
                field: sensor,
                table,
                where: {
                    field: 'deviceName',
                    value: device
                },
                timeRange,
                orderBy,
                limit
            }
    }

    return null
}

export async function readRoomTemperature(room: rooms, timeRange?: string) {
    if (
        !roomToSensorsMapper.hasOwnProperty(room) ||
        !roomToSensorsMapper[room].hasOwnProperty(environmentalSensors.temperature)
    ) {
        return null
    }

    const device: string = roomToSensorsMapper[room][environmentalSensors.temperature]

    const queryParams = readSensorMeasurements({
        sensor: environmentalSensors.temperature,
        device,
        timeRange
    })

    if (queryParams === null) {
        return null
    }

    const query = queryBuilder(queryParams)

    return await influx.query(query)
}
