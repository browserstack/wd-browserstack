var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    wd = require('wd'),
    colors = require('colors'),
    child_process = require('child_process');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

function setupBrowser(){
  var username = process.env.BROWSERSTACK_USERNAME || config.user;
  var accessKey = process.env.BROWSERSTACK_ACCESS_KEY || config.key;
  var browser = wd.promiseChainRemote(config.selenium_host, config.selenium_port, username, accessKey);

  // optional extra logging
  browser.on('status', function(info) {
    console.log(info.cyan);
  });
  browser.on('command', function(eventType, command, response) {
    console.log(' > ' + eventType.green, command, (response || '').grey);
  });
  browser.on('http', function(meth, path, data) {
    console.log(' > ' + meth.yellow, path, (data || '').grey);
  });

  return browser;
}

var config_file = process.argv[2] || 'conf.js'
var config = require(config_file).config;
var test = require(config.test);

console.log("Running Test: " + test.name.green + '\n');

for(var i in config.capabilities){
  var browser = setupBrowser();
  test.run(browser.init(config.capabilities[i])).fin(function() { return browser.quit(); }).done();
}
