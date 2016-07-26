exports.config = {
  user: 'BROWSERSTACK_USERNAME',
  key: 'BROWSERSTACK_ACCESS_KEY',

  seleniumHost: 'hub-cloud.browserstack.com',
  seleniumPort: 80,

  test: '../tests/local_test.js',

  capabilities: [{
    browserName: 'chrome',
    name: "local_test",
    build: "wd-browserstack",
    'browserstack.local': true
  }]
}
