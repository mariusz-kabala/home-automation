import { environmentalSensors, conditionLevels } from './enums'

export interface IConditionReport {
    [environmentalSensors.temperature]: conditionLevels
    [environmentalSensors.pressure]: conditionLevels
    [environmentalSensors.humidity]: conditionLevels
    [environmentalSensors.eco2]: conditionLevels
    [environmentalSensors.tvoc]: conditionLevels
}
