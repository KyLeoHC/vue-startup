// more options:
// https://jestjs.io/docs/en/configuration
module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  transform: {
    '.*\\.vue$': 'vue-jest',
    '.*\\.[tj]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    // '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '.*\\.*(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': '<rootDir>/tests/unit/__mocks__/fileMock.ts'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href.
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
