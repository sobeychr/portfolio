// https://jestjs.io/docs/configuration

module.exports = {
  clearMocks: true,
  displayName: 'utils',
  errorOnDeprecated: true,
  modulePathIgnorePatterns: [
    '<rootDir>/build/'
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.[jt]s',
  ]
};
