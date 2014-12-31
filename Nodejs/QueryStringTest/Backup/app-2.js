var querystring = require('querystring');

var str = querystring.parse('foo=bar&baz=qux&baz=quux&corge');
console.log('str*::*\t ', str);

/*
output:

str*::*   { foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }
*/

