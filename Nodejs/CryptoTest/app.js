var str = 'Hello World';

var str4base64 = new Buffer(str).toString('base64');
console.log('\nstr4base64 = ' + str4base64); // SGVsbG8gV29ybGQ=

var str4origin = new Buffer(str4base64, 'base64').toString('ascii');
console.log('\nstr4origin = ' + str4origin); // Hello World

