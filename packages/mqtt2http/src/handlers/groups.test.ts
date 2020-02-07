import { subscribe, publish, getSubscriptions, clearSubscriptions } from '@home/mqtt'
import { setGroupState, fetchGroupDetails } from '@home/deconz-api'
import waitForExpect from 'wait-for-expect'

import { subscribeForGroupsMessages } from './groups'

jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'namespace':
          return 'fake-namespace'
        default:
          return ''
      }
    }),
  },
}))

jest.mock('@home/deconz-api', () => ({
  setGroupState: jest.fn(),
  fetchGroupDetails: jest.fn(),
  GroupStateFields: {
    on: 'on',
    toggle: 'toggle',
    bri: 'bri',
    hue: 'hue',
    sat: 'sat',
    ct: 'ct',
    xy: 'xy',
    alert: 'alert',
    effect: 'effect',
    colorloopspeed: 'colorloopspeed',
    transitiontime: 'transitiontime',
  },
  IGroupState: jest.fn(),
}))

describe('Mqtt2Http Service', () => {
  beforeEach(() => {
    clearSubscriptions()
    ;(setGroupState as jest.Mock).mockClear()
    ;(fetchGroupDetails as jest.Mock).mockClear()
  })
  it('Should subscribe to proper MQTT topics', () => {
    subscribeForGroupsMessages()

    expect(subscribe).toBeCalledTimes(6)

    expect(subscribe).toHaveBeenNthCalledWith(1, 'fake-namespace/groups/+/set', expect.any(Function))
    expect(subscribe).toHaveBeenNthCalledWith(2, 'fake-namespace/groups/+/toggle', expect.any(Function))
    expect(subscribe).toHaveBeenNthCalledWith(3, 'fake-namespace/groups/+/turnOn', expect.any(Function))
    expect(subscribe).toHaveBeenNthCalledWith(4, 'fake-namespace/groups/+/turnOff', expect.any(Function))
    expect(subscribe).toHaveBeenNthCalledWith(5, 'fake-namespace/groups/+/dim', expect.any(Function))
    expect(subscribe).toHaveBeenNthCalledWith(6, 'fake-namespace/groups/+/lighten', expect.any(Function))
  })

  it('Should set group state with proper HTTP request', () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/set')

    callback(
      {
        foo: 'bar',
        bar: 10,
      },
      'fake-namespace/groups/8/set',
    )

    expect(setGroupState).toBeCalledTimes(1)
    expect(setGroupState).toBeCalledWith('8', {
      foo: 'bar',
      bar: 10,
    })
  })

  it('Should toggle group with proper HTTP request', () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/toggle')

    callback(null, 'fake-namespace/groups/3/toggle')

    expect(setGroupState).toBeCalledTimes(1)
    expect(setGroupState).toBeCalledWith('3', {
      toggle: true,
    })
  })

  it('Should turn on group with proper HTTP request', () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/turnOn')

    callback(null, 'fake-namespace/groups/1/turnOn')

    expect(setGroupState).toBeCalledTimes(1)
    expect(setGroupState).toBeCalledWith('1', {
      on: true,
    })
  })

  it('Should turn off group with proper HTTP request', () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/turnOff')

    callback(null, 'fake-namespace/groups/2/turnOn')

    expect(setGroupState).toBeCalledTimes(1)
    expect(setGroupState).toBeCalledWith('2', {
      on: false,
    })
  })

  it('Should dim group with proper HTTP request', async () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/dim')
    ;(fetchGroupDetails as jest.Mock).mockImplementationOnce(() => ({
      action: {
        bri: 100,
      },
    }))

    callback(null, 'fake-namespace/groups/22/dim')

    await waitForExpect(() => {
      expect(fetchGroupDetails).toBeCalledTimes(1)
      expect(setGroupState).toBeCalledTimes(1)
      expect(setGroupState).toBeCalledWith('22', {
        on: true,
        bri: 75,
      })
    })
  })

  it('Should turn off group as brightness is less than 26', async () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/dim')
    ;(fetchGroupDetails as jest.Mock).mockImplementationOnce(() => ({
      action: {
        bri: 25,
      },
    }))

    callback(null, 'fake-namespace/groups/22/dim')

    await waitForExpect(() => {
      expect(fetchGroupDetails).toBeCalledTimes(1)
      expect(setGroupState).toBeCalledTimes(1)
      expect(setGroupState).toBeCalledWith('22', {
        on: false,
      })
    })
  })

  it('Should lighten group with proper HTTP request', async () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/lighten')
    ;(fetchGroupDetails as jest.Mock).mockImplementationOnce(() => ({
      action: {
        bri: 50,
      },
    }))

    callback(null, 'fake-namespace/groups/22/lighten')

    await waitForExpect(() => {
      expect(fetchGroupDetails).toBeCalledTimes(1)
      expect(setGroupState).toBeCalledTimes(1)
      expect(setGroupState).toBeCalledWith('22', {
        bri: 75,
        on: true,
      })
    })
  })

  it('Should not change group brightness as its already 255', async () => {
    subscribeForGroupsMessages()

    const [callback] = getSubscriptions('fake-namespace/groups/+/lighten')
    ;(fetchGroupDetails as jest.Mock).mockImplementationOnce(() => ({
      action: {
        bri: 255,
      },
    }))

    callback(null, 'fake-namespace/groups/22/lighten')

    await waitForExpect(() => {
      expect(fetchGroupDetails).toBeCalledTimes(1)
      expect(setGroupState).not.toBeCalled()
    })
  })
})
