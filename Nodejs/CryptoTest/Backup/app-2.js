console.log(new Buffer("Hello World").toString('base64')); // SGVsbG8gV29ybGQ=

console.log(new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')); // Hello World

var str = 'Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.';
var str4base64 = new Buffer(str).toString('base64');
console.log('\nstr4base64 = ' + str4base64);
var str4origin = new Buffer(str4base64, 'base64').toString('ascii');
console.log('\nstr4origin = ' + str4origin);
