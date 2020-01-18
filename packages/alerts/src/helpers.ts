import crypto from 'crypto'
import { conditionLevels, normalizeValue } from '@home/commons'

export function checkHumidity(level: number): conditionLevels {
    const value = normalizeValue(level)
    if (value <= 55 && value >= 45) {
        return conditionLevels.ideal
    }

    if (value <= 60 && value >= 30) {
        return conditionLevels.good
    }

    return conditionLevels.bad
}

export function checkTemperature(level: number): conditionLevels {
    const value = normalizeValue(level)

    if (value <= 23 && value >= 21) {
        return conditionLevels.ideal
    }

    if (value <= 24 && value >= 20) {
        return conditionLevels.good
    }

    return conditionLevels.bad
}

export function checkPressure(value: number): conditionLevels {
  if (value < 980) {
    return conditionLevels.bad
  }

  return conditionLevels.good
}

export function checkTVOC(value: number): conditionLevels {
  if (value < 30) {
    return conditionLevels.ideal
  }

  if (value < 300) {
    return conditionLevels.good
  }

  return conditionLevels.bad
}

export function checkECO2(value: number): conditionLevels {
  if (value < 500) {
    return conditionLevels.ideal
  }

  if (value < 800) {
    return conditionLevels.good
  }

  return conditionLevels.bad
}

export const createHash = (): crypto.Hash => crypto.createHash('sha1')

export function checkCondition(
    value: number,
    expectedValue: number,
    condition: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le',
  ): boolean {
    switch (condition) {
      case 'eq':
        return value == expectedValue
      case 'ne':
        return value != expectedValue
      case 'gt':
        return value > expectedValue
      case 'ge':
        return value >= expectedValue
      case 'lt':
        return value < expectedValue
      case 'le':
        return value <= expectedValue
    }
  }
  