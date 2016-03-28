var time = require('time');
 
// Create a new Date instance, representing the current instant in time 
var now = new time.Date();
 
now.setTimezone("America/Los_Angeles");
console.log('LA: ', now.toString());
// `.getDate()`, `.getDay()`, `.getHours()`, etc. 
// will return values according to UTC-7 
 
now.setTimezone("America/New_York");
console.log('NY: ', now.toString());
// `.getDate()`, `.getDay()`, `.getHours()`, etc. 
// will return values according to UTC-4 
 
now.setTimezone("Asia/Shanghai");
console.log('SH: ', now.toString());
 
// You can also set the timezone during instantiation 
var azDate = new time.Date(2016, 03, 28, 'America/Phoenix');
console.log(azDate.getTimezone()); // 'America/Phoenix' 

