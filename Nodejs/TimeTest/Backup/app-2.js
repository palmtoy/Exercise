var time = require('time')(Date);

var d = new Date();
d.setTimezone('UTC');
console.log('UTC: ', d.toString());

d.setTimezone("America/New_York");
console.log(' NY: ', d.toString());
 
d.setTimezone("Asia/Shanghai");
console.log(' SH: ', d.toString());
 
