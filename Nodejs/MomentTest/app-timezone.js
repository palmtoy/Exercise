var moment = require('moment-timezone');

var jun = moment("2014-06-01T12:00:00Z");
var dec = moment("2014-12-01T12:00:00Z");
var shanghai = moment("2016-03-28T00:00:00Z");

console.log(jun.tz('America/Los_Angeles').format('ha z'));  // 5am PDT
console.log(dec.tz('America/Los_Angeles').format('ha z'));  // 4am PST

console.log(jun.tz('America/New_York').format('ha z'));     // 8am EDT
console.log(dec.tz('America/New_York').format('ha z'));     // 7am EST

console.log(jun.tz('Asia/Tokyo').format('ha z'));           // 9pm JST
console.log(dec.tz('Asia/Tokyo').format('ha z'));           // 9pm JST

console.log(jun.tz('Australia/Sydney').format('ha z'));     // 10pm EST
console.log(dec.tz('Australia/Sydney').format('ha z'));     // 11pm EST

console.log();
console.log(shanghai.tz('Asia/Shanghai').format('ha z'));
console.log('<=========================>');
console.log();

////////////////////////////////////////////////////////////////////////

var newYork    = moment.tz("2014-06-01 12:00", "America/New_York");
var losAngeles = newYork.clone().tz("America/Los_Angeles");
var london     = newYork.clone().tz("Europe/London");

console.log(newYork.format());    // 2014-06-01T12:00:00-04:00
console.log(losAngeles.format()); // 2014-06-01T09:00:00-07:00
console.log(london.format());     // 2014-06-01T17:00:00+01:00
console.log('<=========================>');
console.log();

////////////////////////////////////////////////////////////////////////

var beijing = moment.tz("2016-03-28 00:00", "Asia/Shanghai"); 
var la 		  = beijing.clone().tz("America/Los_Angeles");      
var ld      = beijing.clone().tz("Europe/London");            

console.log(beijing.format()); // 2016-03-28T00:00:00+08:00
console.log(la.format());      // 2016-03-27T09:00:00-07:00 
console.log(ld.format());      // 2016-03-27T17:00:00+01:00  

