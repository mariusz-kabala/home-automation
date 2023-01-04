import { publish } from '@home/mqtt'
import { FetchMock } from 'jest-fetch-mock'

import { runAirVisual } from './index'

jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'airVisualLocations':
          return [
            {
              city: 'Szczecin',
              state: 'West Pomerania',
              country: 'Poland',
            },
          ]

        case 'airvisualAPIKey':
          return 'fake-key'

        default:
          return ''
      }
    }),
  },
}))

describe('Airvisual provider', () => {
  beforeAll(() => {
    ;(fetch as FetchMock).mockResponse(
      JSON.stringify({
        status: 'success',
        data: {
          foo: 'bar',
          city: 'Szczecin',
        },
      }),
    )
  })

  beforeEach(() => {
    ;(fetch as FetchMock).mockClear()
    ;(publish as FetchMock).mockClear()
  })

  it('Should fetch report for every location defined in config', async () => {
    await runAirVisual()

    expect(fetch).toBeCalledTimes(1)
    expect(fetch).toBeCalledWith(
      'https://api.airvisual.com/v2/city?city=Szczecin&state=West Pomerania&country=Poland&key=fake-key',
    )
  })

  it('Should publish pollution report on mqtt', async () => {
    await runAirVisual()

    expect(publish).toBeCalledTimes(1)
    expect(publish).toBeCalledWith('airvisual/Szczecin', expect.any(Object))
  })
})
