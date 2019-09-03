var {defineSupportCode} = require('cucumber');
var reporter = require('cucumber-html-reporter');

defineSupportCode(function({Before,After}){
  Before(function(){
    return this.driver.manage().window().maximize();
  });
  After(function(){
    this.driver.sleep(3000);
    return this.driver.quit();
  });
});
