// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testTimeout: 30000,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '**/?(*.)(spec|test).js?(x)'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./setup-test.js']
};
