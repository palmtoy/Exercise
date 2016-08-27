var mtz = require('moment-timezone');

var beijing = mtz().tz("Asia/Shanghai");
var utc = beijing.clone().tz("UTC");
var newYork = beijing.clone().tz("America/New_York");
var vancouver = beijing.clone().tz("America/Vancouver");
var london = beijing.clone().tz("Europe/London");

var str = 'Bejing    ~ ' + beijing.format('MMMM Do YYYY, HH:mm:ss Z');
console.log(str);
str = 'UTC       ~ ' + utc.format('MMMM Do YYYY, HH:mm:ss Z');
console.log(str);
str = 'NewYork   ~ ' + newYork.format('MMMM Do YYYY, HH:mm:ss Z');
console.log(str);
str = 'Vancouver ~ ' + vancouver.format('MMMM Do YYYY, HH:mm:ss Z');
console.log(str);
str = 'London    ~ ' + london.format('MMMM Do YYYY, HH:mm:ss Z');
console.log(str);

