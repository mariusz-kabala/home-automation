jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => {
      return ''
    }),
  },
}))

jest.mock('@home/logger', () => ({
  logger: {
    log: jest.fn(),
  },
}))

let subscriptions: { [key: string]: Function[] }

jest.mock('@home/mqtt', () => ({
  clearSubscriptions: () => {
    subscriptions = {}
  },
  getSubscriptions: (topic?: string) => {
    if (!topic) {
      return subscriptions
    }

    return subscriptions[topic]
  },
  subscribe: jest.fn().mockImplementation((topic: string, callback: Function) => {
    if (subscriptions === undefined) {
      subscriptions = {}
    }

    if (!Array.isArray(subscriptions[topic])) {
      subscriptions[topic] = []
    }

    subscriptions[topic].push(callback)
  }),
  publish: jest.fn(),
}))

require('jest-fetch-mock').enableMocks()
