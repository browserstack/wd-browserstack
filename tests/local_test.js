module.exports = {
  name: 'BrowserStack Local Testing',
  run : function (browser) {
    return browser
      .get("http://bs-local.com:45691/check")
      .source()
      .then(function(data){
        data.should.match(/Up and running/i);
      })
  }
};
