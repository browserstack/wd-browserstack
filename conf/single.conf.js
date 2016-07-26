exports.config = {
  user: 'BROWSERSTACK_USERNAME',
  key: 'BROWSERSTACK_ACCESS_KEY',

  seleniumHost: 'hub-cloud.browserstack.com',
  seleniumPort: 80,

  test: '../tests/single_test.js',

  capabilities: [{
    browserName: 'chrome',
    name: "single_test",
    build: "wd-browserstack"
  }]
}
