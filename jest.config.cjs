const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  }
}

module.exports = createJestConfig(customJestConfig)
