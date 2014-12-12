var webdriver = require('selenium-webdriver');
var chromeObj = webdriver.Capabilities.chrome();

chromeObj.set(
  'chromeOptions', {
  args: ['test-type'] // --ignore-certificate-errors
});

var driver = new webdriver.Builder().
  withCapabilities(chromeObj).
  build();

driver.get('http://127.0.0.1:8080/debug?port=5858');
console.log('Launch chrome, done.\nPlease switch to the chrome and enjoy debugging ...');

