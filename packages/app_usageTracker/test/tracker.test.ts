import { checkRule } from '../src/tracker'
import { IUsage, IUsageRule, UsageCategory } from '@home/models'
import { rClient } from '../src/redis'
import { logger } from '@home/logger'
import { randomUUID } from 'crypto'

jest.mock('../src/redis', () => ({
  rClient: {
    set: jest.fn(),
    expire: jest.fn(),
  },
}))

describe('Usage tracker service - tracker', () => {
  it('Should send notification about device that is on for too long', async () => {
    const tenMinsAgo = new Date(Date.now() - 600000)
    const usage = {
      level: 0,
      id: 'lights-larder',
      type: 'shelly',
      name: 'Swiatło, spiżarnia',
      room: 'larder',
      category: UsageCategory.lights,
      createdAt: tenMinsAgo,
      updatedAt: tenMinsAgo,
    } as IUsage

    const rule = {
      id: 'lights-larder',
      _id: randomUUID(),
      max: 10,
    } as IUsageRule

    const result = await checkRule(usage, rule)

    expect(result).toBeUndefined()
    expect(rClient.set).toBeCalled()
    expect(rClient.set).toHaveBeenCalledWith(`rule-${rule._id}`, 'true')
  })
})
