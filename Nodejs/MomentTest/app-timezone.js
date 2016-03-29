var moment = require('moment-timezone');

var dateFormat = 'YYYY-MM-DD HH:mm:ss';
var testDateUtc = moment.utc('2016-03-29 12:30:00');
var localDate = testDateUtc.local();
console.log(localDate.format(dateFormat));
console.log();

var now = moment(new Date());
// var nowUTC = now.clone().tz('UTC');
var nowUTC = now.clone().utc();
console.log(nowUTC.format());
console.log(nowUTC.format(dateFormat));

