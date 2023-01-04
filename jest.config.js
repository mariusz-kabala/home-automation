/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/tools/'],
  moduleFileExtensions: ['js', 'ts', 'd.ts', 'json', 'node'],
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**'],
  setupFiles: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
}
