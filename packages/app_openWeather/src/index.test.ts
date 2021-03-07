import { publish } from '@home/mqtt'
import { FetchMock } from 'jest-fetch-mock'
import waitForExpect from 'wait-for-expect'
import cron from 'node-cron'

jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'openWeatherAPIKey':
          return 'fake-key'
        case 'cities':
          return ['Szczecin,PL', 'Katowice,PL', 'Miechow,PL', 'Berlin,DE']

        default:
          return ''
      }
    }),
  },
}))

jest.mock('node-cron', () => ({
  __esModule: true,
  default: {
    schedule: jest.fn(),
  },
}))

describe('OpenWeather service', () => {
  beforeAll(() => {
    ;(fetch as FetchMock).mockResponse(
      JSON.stringify({
        foo: 'bar',
      }),
    )

    require('./index')
  })

  it('Should fetch forecast from openweather API', async () => {
    ;(fetch as FetchMock).mockResponse(
      JSON.stringify({
        foo: 'bar',
      }),
    )

    await waitForExpect(() => {
      expect(fetch).toBeCalledTimes(4)
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'http://api.openweathermap.org/data/2.5/weather?q=Szczecin,PL&appid=fake-key&units=metric',
      )
      expect(fetch).toHaveBeenNthCalledWith(
        2,
        'http://api.openweathermap.org/data/2.5/weather?q=Katowice,PL&appid=fake-key&units=metric',
      )
      expect(fetch).toHaveBeenNthCalledWith(
        3,
        'http://api.openweathermap.org/data/2.5/weather?q=Miechow,PL&appid=fake-key&units=metric',
      )
      expect(fetch).toHaveBeenNthCalledWith(
        4,
        'http://api.openweathermap.org/data/2.5/weather?q=Berlin,DE&appid=fake-key&units=metric',
      )
    })
  })

  it('Should schedule task to run every 5 minutes', () => {
    expect(cron.schedule).toBeCalledTimes(1)
    expect(cron.schedule).toHaveBeenNthCalledWith(1, '*/5 * * * *', expect.any(Function))
  })

  it('Should publish forecast for every city defined in the config', async () => {
    await waitForExpect(() => {
      expect(publish).toBeCalledTimes(4)
      expect(publish).toHaveBeenNthCalledWith(1, 'forecast/Szczecin,PL', expect.any(Object))
      expect(publish).toHaveBeenNthCalledWith(2, 'forecast/Katowice,PL', expect.any(Object))
      expect(publish).toHaveBeenNthCalledWith(3, 'forecast/Miechow,PL', expect.any(Object))
      expect(publish).toHaveBeenNthCalledWith(4, 'forecast/Berlin,DE', expect.any(Object))
    })
  })
})
