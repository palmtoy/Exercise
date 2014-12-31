var x = require('./x');

console.log('1 ~ x.a = ', x.a);

setTimeout(function() {
  console.log('2 ~ x.a = ', x.a);
}, 500);

