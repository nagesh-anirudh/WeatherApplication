const { Given, When, Then} = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
var assert = require('assert');
const By = seleniumWebdriver.By
var map = seleniumWebdriver.promise.map;

Given(/^I launch the weather forecast application$/, function () {
  this.driver.get('http://localhost:3000');
  this.driver.sleep(2000);
});

When(/^I enter the city as \"(.*)\"$/, function (val) {
  var city = this.driver.findElement({css:"input#city"})
  city.clear();
  this.driver.sleep(2000);
  city.sendKeys(val);
  city.sendKeys(seleniumWebdriver.Key.ENTER);
  return this.driver.sleep(2000);
});

Then(/^I verify the \"(.*)\" of the Max temperature Value$/, function (bgValue) {
  this.driver.findElement(By.xpath("(//span[@class='max'])[1]")).getCssValue('color').then(function(bgcolorvalue){
      console.log('Actual bgcolorvalue:::',bgcolorvalue);
    return assert.equal(bgValue,bgcolorvalue);
    });
});

Then(/^I verify the \"(.*)\" of the Max temperature Values$/, function (bldValue) {
  // driver.findElement(By.xpath("(//span[@class='max'])[1]")).click();
  this.driver.findElement(By.xpath("(//span[@class='max'])[1]")).getCssValue('font-weight').then(function(boldValue){
    console.log('Actual font weight is::::',boldValue);
    return assert.equal(bldValue,boldValue);
  });
  });

Then(/^I verify the \"(.*)\" of the Min temperature Value$/, function (bgValue) {
// driver.findElement(By.xpath("//span[@data-test='minimum-1']")).click();
// console.log('Exepcted bgcolorvalue',bgValue);
this.driver.findElement(By.xpath("//span[@data-test='minimum-1']")).getCssValue('color').then(function(bgcolorvalue){
  console.log('Actual bgcolorvalue:::',bgcolorvalue);
  return assert.equal(bgcolorvalue,bgValue);
});
});
  
Then(/^I verify the \"(.*)\" of the Min temperature Values$/, function (bldValue) {
// driver.findElement(By.xpath("//span[@data-test='minimum-1']")).click();
this.driver.findElement(By.xpath("//span[@data-test='minimum-1']")).getCssValue('font-weight').then(function(boldValue){
  console.log('Actual font weight is::::',boldValue);
  return assert.equal(boldValue,bldValue);
      });
});

Then(/^I verify the \"(.*)\" of the Max temperature values$/, function (fntsize) {
// driver.findElement(By.xpath("(//span[@class='max'])[1]")).click();
this.driver.findElement(By.xpath("(//span[@class='max'])[1]")).getCssValue('font-size').then(function(fsValue){
  console.log('Actual font size is::::',fsValue);
  return assert.equal(fsValue,fntsize);
});
});
      
Then(/^I verify the \"(.*)\" of the Min temperature value$/, function (fntsize1) {
// driver.findElement(By.xpath("//span[@data-test='minimum-1']")).click();
// console.log('Exepcted bgcolorvalue',bgValue);
this.driver.findElement(By.xpath("//span[@data-test='minimum-1']")).getCssValue('font-size').then(function(fsValue1){
console.log('Actual font size is::::',fsValue1);
return assert.equal(fsValue1,fntsize1);
});
});

Then(/^I verify the \"(.*)\" of the temperature value$/, function (fntfamily) {
// driver.findElement(By.xpath("//span[@data-test='minimum-1']")).click();
// console.log('Exepcted bgcolorvalue',bgValue);
this.driver.findElement(By.xpath("//span[@data-test='minimum-1']")).getCssValue('font-family').then(function(fntfamValue){
  console.log('Actual font family is::::',fntfamValue);
  return assert.equal(fntfamValue,fntfamily);
});
});
Then(/^It should display weather forecast for five days$/, function () {
  var i =1;
  for (;i<=5;) {
    var selector = this.driver.findElement({css:"span[data-test='day-"+i+"']"});
    selector.isDisplayed().then(function(value){
    return assert.equal(value,true);
    })
    i++;
  }
});

When(/^I select day \"(.*)\"$/, function (val) {
  this.driver.findElement({css:"span[data-test='day-"+val+"']"}).click();
  this.driver.sleep(2000);
});

Then(/^I should be able to see 3 hourly forecast for that day \"(.*)\"$/, function (threehrs) {
  var hrs = [];
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(elements){
  elements[threehrs-1].findElements(By.xpath(".//span[contains(@data-test, 'hour-')]")).then(function(hours){
    hours.forEach(function(hour){
      hour.getAttribute("innerText").then(function(textValue){
        hrs.push(parseInt(textValue));
        for (var i =0; i<hrs.length-1;i++){
        if((hrs[i+1]-hrs[i]===300)){
            break;
        }else{
          console.log("It is not displaying 3 Hours Interval Forecast");
          return false;
        }
      }
      });
    });

  });
  return true;
});
});

Then(/^I should not be able to see 3 hourly forecast for that day$/, function () {
    this.driver.sleep(1000);
    var selector = this.driver.findElement({css:"div.details"});
    selector.isDisplayed().then(function(value){
    console.log('value',value);
    return assert.equal(value,false);
    });
});

Then(/^I should be able to see summary of min and max temparture of the day \"(.*)\"$/,function (day) {
  var tempvalues;
  var tempsumvalues;
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(daydetails){

      daydetails[day-1].findElement(By.xpath(".//div[@class='summary']")).then(function(daytempsummary){
       return daytempsummary.findElements(By.xpath(".//span[3]/span")).then(function(tempsummary){
        map(tempsummary, tempsummaryvalue => tempsummaryvalue.getAttribute("innerText"))
              .then(function(values) {
                tempsumvalues = values.map(function(v) {
                return parseInt(v, 10);
              });
            return tempsumvalues;
          });
        });
      });
    daydetails[day-1].findElement(By.xpath(".//div[@class='details']")).then(function(daytempdetails){
      return daytempdetails.findElements(By.xpath(".//div[@class='detail']/span[3]/span")).then(function(tempdetails){
        map(tempdetails, tempvalue => tempvalue.getAttribute("innerText"))
          .then(function(values) {
            tempvalues = values.map(function(v) {
            return parseInt(v, 10);
          });
          console.log('tempvalues',tempvalues);
          console.log('tempsumvalues',tempsumvalues);
          assert.equal(Math.max.apply(Math, tempvalues),Math.max.apply(Math, tempsumvalues))
          assert.equal(Math.min.apply(Math, tempvalues),Math.min.apply(Math, tempsumvalues))
        });
      });
    });
  });
});


Then(/^I should be able to see summary of Aggregate rainfall of the day \"(.*)\"$/,function (day) {
  var aggregate;
  var rainvalues;
  var aggregateRainfall;
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(daydetails){
      daydetails[day-1].findElement(By.xpath(".//div[@class='summary']")).then(function(dayrainsummary){
        return dayrainsummary.findElement(By.xpath(".//span[5]/span[1]")).then(function(rainsummary){
          rainsummary.getAttribute("innerText").then(function(rainsumvalue){
            aggregate = parseInt(rainsumvalue);
            return aggregate;
          }); 
        });
      });

    daydetails[day-1].findElement(By.xpath(".//div[@class='details']")).then(function(dayraindetails){
     return dayraindetails.findElements(By.xpath(".//div[@class='detail']/span[5]/span[1]")).then(function(raindetails){
        map(raindetails, rainvalue => rainvalue.getAttribute("innerText"))
          .then(function(values) {
            rainvalues = values.map(function(v) {
            return parseInt(v, 10);
          });
          console.log('rainvalues are ',rainvalues);
          aggregateRainfall =(rainvalues.reduce((a, b) => a + b, 0))
          console.log('aggregateRainfall ',aggregateRainfall)
          return assert.equal(aggregateRainfall,aggregate);
        });
      }); 
    });
  });

});
Then(/^I should be able to see summary of most dominant wind speed of the day \"(.*)\"$/,function (day) {
  var windspeed;
  var windvalues;
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(daydetails){

      daydetails[day-1].findElement(By.xpath(".//div[@class='summary']")).then(function(daywindsummary){
        return daywindsummary.findElement(By.xpath(".//span[4]/span[1]")).then(function(windsummary){
        windsummary.getAttribute("innerText").then(function(windsumvalue){
          windspeed = parseInt(windsumvalue);
          return windspeed;
        }); 
        });
      });

    daydetails[day-1].findElement(By.xpath(".//div[@class='details']")).then(function(daywinddetails){
      daywinddetails.findElements(By.xpath(".//div[@class='detail']/span[4]/span[1]")).then(function(winddetails){
        map(winddetails, windvalue => windvalue.getAttribute("innerText"))
          .then(function(values){
            windvalues = values.map(function(v){
              return parseInt(v, 10);
            });
            return assert.equal(windspeed,windvalues[0]);
          });
        }); 
      });
    });
});


Then(/^I should be able to see all values are rounded up$/, function () {

  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(dayD){

    dayD.forEach(function(daydet){
      daydet.findElement(By.xpath(".//div[@class='summary']")).then(function(dSum){
      //Verifying the Rain Values are rounded up or not
        dSum.findElement(By.xpath(".//span[5]/span[1]")).then(function(rainSum){
          rainSum.getAttribute("innerText").then(function(rainvalue){
            console.log('rainvalue',parseInt(rainvalue));
            return assert.equal(parseInt(rainvalue),Math.round(parseInt(rainvalue))); 
          });
        });
        //Verifying the Wind Values are rounded up or not
        dSum.findElement(By.xpath(".//span[4]/span[1]")).then(function(wSum){
          wSum.getAttribute("innerText").then(function(wVal){
            console.log('windvalue',parseInt(wVal));
            return assert.equal(parseInt(wVal),Math.round(parseInt(wVal)));
          });
        });
        //Verifying the Temperature Values are rounded up or not 
        daysummary.findElement(By.xpath(".//span[3]/span")).then(function(tSum){
          tSum.getAttribute("innerText").then(function(tVal){
            console.log('tempvalue',parseInt(tVal));
            return assert.equal(parseInt(tVal),Math.round(parseInt(tVal))); 
          });
        });
      });
    });
  });
return true;
});
Then(/^I should not be able to see weather forecast data$/, function () {
  var selector = this.driver.findElement(By.xpath("//div[text()='Error retrieving the forecast']"));
  selector.isDisplayed().then(function(value){
  return assert.equal(value,true);
  });
});

Then(/^I should be able to see summary of current condtion of the day$/,function () {
  var conditionSummary;
  this.driver.findElement(By.xpath("//div[@data-reactroot]/div/div[1]/span[2]/*")).then(function(condsummary){
       return condsummary.getAttribute("aria-label").then(function(condsumvalue){
          // console.log('Current condition value is ',condsumvalue);
          conditionSummary = condsumvalue;
          return conditionSummary;
        }); 
      });

   this.driver.findElement(By.xpath("//div[@data-reactroot]/div/div[2]/div[1]/span[2]/*")).then(function(conddetails){
    return conddetails.getAttribute("aria-label").then(function(conddetailsvalue){
        console.log('Current condition value is ',conddetailsvalue);
        console.log('Current condition value is ',conditionSummary);
        return assert.equal(conditionSummary,conddetailsvalue);
      }); 

    });
});

Then(/^It should display weather forecast for five days from today$/, function () {
var currentdate = new Date();
var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var datevalue = currentdate.getDate();
var dayvalue = daysOfTheWeek[currentdate.getDay()];

    this.driver.findElement(By.xpath("//div[@data-reactroot]/div/div[1]/span[1]/span[2]")).then(function(ddetails){
      ddetails.getAttribute("innerText").then(function(dateval){
        return assert.equal(datevalue,parseInt(dateval));
      }); 
    }).finally(()=>{ 
      this.driver.quit();
    });
    this.driver.findElement(By.xpath("//div[@data-reactroot]/div/div[1]/span[1]/span[1]")).then(function(ddetails1){
      ddetails1.getAttribute("innerText").then(function(dayval){
        return assert.equal(dayvalue.includes(dayval),true);
      }); 
    }).finally(()=>{ 
      this.driver.quit();
    });
});
