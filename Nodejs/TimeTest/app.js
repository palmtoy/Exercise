var time = require('time')(Date);

var now = new time.Date();
console.log(' CN: ', now.toString());

var another = new time.Date('Mar 28, 2016', 'UTC');
console.log('UTC: ', another.toString());

var more = new time.Date(2016, 03, 28, 'Asia/Shanghai');
console.log(' SH: ', more.toString());

