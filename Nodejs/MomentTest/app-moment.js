var moment = require('moment');

// Format Dates
console.log(moment().format('MMMM Do YYYY, h:mm:ss a')); // March 27th 2016, 5:13:34 pm
console.log(moment().format('dddd'));                    // Sunday
console.log(moment().format("MMM Do YY"));               // Mar 27th 16
console.log(moment().format('YYYY [escaped] YYYY'));     // 2016 escaped 2016
console.log(moment().format());                          // 2016-03-27T17:13:34+08:00
// Relative Time
console.log(moment("20111031", "YYYYMMDD").fromNow()); // 4 years ago
console.log(moment("20120620", "YYYYMMDD").fromNow()); // 4 years ago
console.log(moment().startOf('day').fromNow());        // 17 hours ago
console.log(moment().endOf('day').fromNow());          // in 7 hours
console.log(moment().startOf('hour').fromNow());       // 14 minutes ago
// Calendar Time
console.log(moment().subtract(10, 'days').calendar()); // 03/17/2016
console.log(moment().subtract(6, 'days').calendar());  // Last Monday at 5:13 PM
console.log(moment().subtract(3, 'days').calendar());  // Last Thursday at 5:13 PM
console.log(moment().subtract(1, 'days').calendar());  // Yesterday at 5:13 PM
console.log(moment().calendar());                      // Today at 5:13 PM
console.log(moment().add(1, 'days').calendar());       // Tomorrow at 5:13 PM
console.log(moment().add(3, 'days').calendar());       // Wednesday at 5:13 PM
console.log(moment().add(10, 'days').calendar());      // 04/06/2016
// Multiple Locale Support
console.log(moment.locale());         // en
console.log(moment().format('LT'));   // 5:13 PM
console.log(moment().format('LTS'));  // 5:13:34 PM
console.log(moment().format('L'));    // 03/27/2016
console.log(moment().format('l'));    // 3/27/2016
console.log(moment().format('LL'));   // March 27, 2016
console.log(moment().format('ll'));   // Mar 27, 2016
console.log(moment().format('LLL'));  // March 27, 2016 5:13 PM
console.log(moment().format('lll'));  // Mar 27, 2016 5:13 PM
console.log(moment().format('LLLL')); // Sunday, March 27, 2016 5:13 PM
console.log(moment().format('llll')); // Sun, Mar 27, 2016 5:17 PM

