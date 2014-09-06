var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
  withCapabilities(webdriver.Capabilities.chrome()).
  build();

var searchText = '五道口';

driver.get('https://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys(searchText);
driver.findElement(webdriver.By.name('btnG')).click();
driver.wait(function() {
  return driver.getTitle().then(function(title) {
    console.log('title = ', title);
    return title === searchText + ' - Google Search';
  });
}, 1000);

driver.quit();

