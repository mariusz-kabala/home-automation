import cron from 'node-cron'
import './index'

jest.mock('node-cron', () => ({
  __esModule: true,
  default: {
    schedule: jest.fn(),
  },
}))

describe('OpenWeather service', () => {
  it('Should setup cron', () => {
    expect(cron.schedule).toBeCalledTimes(2)
    expect(cron.schedule).toHaveBeenNthCalledWith(1, '*/5 * * * *', expect.any(Function))
    expect(cron.schedule).toHaveBeenNthCalledWith(2, '* * * * *', expect.any(Function))
  })
})
