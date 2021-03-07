import { subscribe, publish, getSubscriptions } from '@home/mqtt'
import ping from 'ping'

jest.useFakeTimers()

require('./index')

jest.mock('is-reachable', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('ping', () => ({
  __esModule: true,
  default: {
    promise: {
      probe: jest.fn().mockImplementation(() => ({
        alive: false,
      })),
    },
  },
}))

jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn((key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fakeConfig: any = {
        mqttHost: 'fake-mqtt-host',
        mqttPort: 'fake-mqtt-port',
        mqttPrefix: 'home',
        devices: [
          {
            name: 'mariusz-phone',
            address: '192.168.0.157',
            checkInterval: 180000, // 3min
          },
          {
            name: 'weronika-phone',
            address: '192.168.0.192',
            mac: '48:BF:6B:09:66:B2',
            checkInterval: 180000, // 3min
          },
          {
            name: 'fake-device',
            address: '192.168.0.10',
            mac: 'BB:BB:BB:BB:BB:BB',
            checkInterval: 180000, // 3min
          },
        ],
      }

      return fakeConfig[key] || ''
    }),
  },
}))

describe('Device Discovery service', () => {
  afterAll(() => {
    jest.clearAllTimers()
  })

  it('Should subscribe to proper mqtt topics', () => {
    expect(subscribe).toBeCalledTimes(2)

    expect(subscribe).toHaveBeenNthCalledWith(1, 'devices/+/checkStatus', expect.any(Function))
    expect(subscribe).toHaveBeenNthCalledWith(2, 'openwrt/clients', expect.any(Function))
  })

  it('Should setup intervals to check device availability', () => {
    expect(setInterval).toHaveBeenCalledTimes(3) // one time per device defined in the config
  })

  it('Should return proper status of device connected to openwrt', async () => {
    const subscriptions = getSubscriptions()
    const [clientsCallback] = subscriptions['openwrt/clients']
    const [checkStatusCallback] = subscriptions['devices/+/checkStatus']

    expect(clientsCallback).toBeInstanceOf(Function)

    clientsCallback(['48:BF:6B:09:66:B2'])
    ;(publish as jest.Mock).mockClear()

    await checkStatusCallback(null, 'devices/weronika-phone/checkStatus')

    expect(publish).toBeCalledTimes(1)

    expect(publish).toHaveBeenNthCalledWith(
      1,
      'devices/weronika-phone/status',
      {
        isReachable: true,
      },
      { qos: 1, retain: true },
    )

    await checkStatusCallback(null, 'devices/fake-device/checkStatus')

    expect(publish).toBeCalledTimes(2)

    expect(publish).toHaveBeenNthCalledWith(
      2,
      'devices/fake-device/status',
      {
        isReachable: false,
      },
      { qos: 1, retain: true },
    )
  })

  it('Should check status of devices', async () => {
    ;(ping.promise.probe as jest.Mock).mockClear()
    ;(publish as jest.Mock).mockClear()

    await jest.runOnlyPendingTimers()

    expect(ping.promise.probe).toBeCalled()
    expect(publish).toBeCalledTimes(2)
  })
})
