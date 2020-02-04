import { influx, queryBuilder } from '@home/influxdb-client'
import { rooms, environmentalSensors, conditionLevels, roomToSensorsMapper, IConditionReport } from '@home/commons'
import { checkHumidity, checkTemperature, checkPressure, checkTVOC, checkECO2 } from './helpers'

function checkConditions(room: rooms, sensor: environmentalSensors): IConditionReport {
    const report: IConditionReport = {
        [environmentalSensors.temperature]: conditionLevels.good,
        [environmentalSensors.pressure]: conditionLevels.good,
        [environmentalSensors.humidity]: conditionLevels.good,
        [environmentalSensors.eco2]: conditionLevels.good,
        [environmentalSensors.tvoc]: conditionLevels.good,
    }

    

    return report
}

export function initConditions() {
    const results = {
        [rooms.kitchen]: conditionLevels.good,
        [rooms.bedroom]: conditionLevels.good,
        [rooms.livingroom]: conditionLevels.good,
        [rooms.hallway]: conditionLevels.good,
        [rooms.bathroom]: conditionLevels.good,
        'general': conditionLevels.good
    }

    for (const room of Object.values(rooms)) {
        for (const sensor of Object.values(environmentalSensors)) {
            const report = checkConditions(room, sensor)
        }
    }
}
