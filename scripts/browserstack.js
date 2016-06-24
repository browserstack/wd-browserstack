var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    wd = require('wd'),
    colors = require('colors'),
    child_process = require('child_process'),
    browserstack = require('browserstack-local');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var username = process.env.BROWSERSTACK_USERNAME || config.user;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY || config.key;

wd.addPromiseChainMethod(
  'onQuit', function(done) {
    if(done) done();
    return this;
  }
);

function runOnBrowserStack(caps, test, done){
  console.log("Running Test: " + test.name.green + '\n');
  var browser = wd.promiseChainRemote(config.seleniumHost, config.seleniumPort, username, accessKey);

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

  test.run(browser.init(caps)).fin(function() { return browser.quit(); }).onQuit(done).done();
}

var config_file = process.argv[2] || 'conf.js'
var config = require(config_file).config;
var test = require(config.test);

for(var i in config.capabilities){
  var caps = config.capabilities[i];
  if(caps["browserstack.local"]){
    // Code to start browserstack local before start of test and stop browserstack local after end of test
    console.log("Connecting local");
    var bs_local = new browserstack.Local();
    bs_local.start({'key': accessKey }, function(error) {
      if (error) return console.log(error.red);
      console.log('Connected. Now testing...');

      runOnBrowserStack(caps, test, function(){ bs_local.stop(); });
    });
  }
  else {
    runOnBrowserStack(caps, test);
  }
}
