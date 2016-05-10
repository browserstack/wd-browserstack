wd-browserstack
=========

Sample for using [wd](https://github.com/admc/wd) with BrowserStack Automate.

### Install dependencies for testing

- `npm install`

### Configuring the json

 - Open the test js files (`browserstack_async.js` or `browserstack_promises.js`)
 - Replace `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` with your BrowserStack credentials. Don't have one? Get one on BrowserStack [dashboard]
 - Add / customise more [capabilities] to `desired` object in the js files

### Run the tests

 - To start a single test run: `npm test` or `npm run test_single` or `npm run test_async` or `npm run test_promises`
 - To start local tests run: `npm run test_local`

[capabilities]:http://www.browserstack.com/automate/capabilities
[dashboard]:https://www.browserstack.com/automate
