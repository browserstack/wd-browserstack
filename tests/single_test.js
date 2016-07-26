module.exports = {
  name: 'Google\'s Search Functionality',
  run : function (browser) {
    return browser
      .get("https://www.google.com/ncr")
      .elementByName('q')
      .sendKeys('BrowserStack\n')
      .sleep(5000)
      .title()
        .should.become('BrowserStack - Google Search');
  }
};
