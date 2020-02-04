jest.mock('config', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => {
      return ''
    }),
  },
}))
