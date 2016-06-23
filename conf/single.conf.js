exports.config = {
  user: 'BROWSERSTACK_USERNAME',
  key: 'BROWSERSTACK_ACCESS_KEY',

  selenium_host: 'hub-cloud.browserstack.com',
  selenium_port: 80,

  test: '../tests/single_test.js',

  capabilities: [{
    browserName: 'chrome',
    name: "single_test",
    build: "wd-browserstack"
  }]
}
