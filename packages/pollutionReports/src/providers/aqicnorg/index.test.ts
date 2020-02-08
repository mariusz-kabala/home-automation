import { publish } from '@home/mqtt'
import { FetchMock } from 'jest-fetch-mock'

import { runAqicnorg } from './index'

jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'aqicnorgAPIKey':
          return 'fake-key'

        case 'aqicnorgLocations':
          return ['Szczecin', 'Katowice']

        default:
          return ''
      }
    }),
  },
}))

describe('Aqicnorg provider', () => {
  beforeAll(() => {
    ;(fetch as FetchMock).mockResponse(
      JSON.stringify({
        status: 'ok',
        data: {
          aqi: 'fake-aqi-value',
          idx: 'fake-idx-value',
          iaqi: {
            co: {
              v: 'fake-iaqiCO-value',
            },
            no2: {
              v: 'fake-iaqiNO2-value',
            },
            pm25: {
              v: 'fake-iaqiPM25-value',
            },
            so2: {
              v: 'fake-iaqiSO2-value',
            },
            p: {
              v: 'fake-iaqiP-value',
            },
          },
        },
      }),
    )
  })

  beforeEach(() => {
    ;(fetch as FetchMock).mockClear()
    ;(publish as FetchMock).mockClear()
  })
  it('Should fetch report for every location defined in config', async () => {
    await runAqicnorg()
    expect(fetch).toBeCalledTimes(2)

    expect(fetch).toHaveBeenNthCalledWith(1, 'http://api.waqi.info/feed/Szczecin/?token=fake-key')
    expect(fetch).toHaveBeenNthCalledWith(2, 'http://api.waqi.info/feed/Katowice/?token=fake-key')
  })

  it('Should publish pollution report on mqtt', async () => {
    await runAqicnorg()

    expect(publish).toBeCalledTimes(2)
    expect(publish).toHaveBeenNthCalledWith(
      1,
      'aqicnorg/Szczecin',
      expect.objectContaining({
        aqi: 'fake-aqi-value',
        idx: 'fake-idx-value',
        iaqiCO: 'fake-iaqiCO-value',
        iaqiNO2: 'fake-iaqiNO2-value',
        iaqiPM25: 'fake-iaqiPM25-value',
        iaqiSO2: 'fake-iaqiSO2-value',
        iaqiP: 'fake-iaqiP-value',
      }),
    )
    expect(publish).toHaveBeenNthCalledWith(
      2,
      'aqicnorg/Katowice',
      expect.objectContaining({
        aqi: 'fake-aqi-value',
        idx: 'fake-idx-value',
        iaqiCO: 'fake-iaqiCO-value',
        iaqiNO2: 'fake-iaqiNO2-value',
        iaqiPM25: 'fake-iaqiPM25-value',
        iaqiSO2: 'fake-iaqiSO2-value',
        iaqiP: 'fake-iaqiP-value',
      }),
    )
  })
})
