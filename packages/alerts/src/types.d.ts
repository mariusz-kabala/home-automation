// eq - is equal to
// ne - is not equal to
// gt - is greater than
// ge - is greater than or equal to
// lt - is less than
// le - is less than or equal to
export interface IRule {
    field: string
    condition: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le'
    value: number
    level: 'low' | 'medium' | 'high'
    alert: string
    timeout: number
  }
  