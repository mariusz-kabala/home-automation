import crypto from 'crypto'

export const hash: crypto.Hash = crypto.createHash('sha1')

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
  