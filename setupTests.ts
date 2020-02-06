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

// eslint-disable-next-line no-var
var subscriptions: { [key: string]: Function[] }

jest.mock('@home/mqtt', () => ({
  getSubscriptions: () => subscriptions,
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
