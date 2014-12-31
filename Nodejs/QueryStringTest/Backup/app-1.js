var querystring = require('querystring');

var str = querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
console.log('1 ~ str*::*\t ', str);

str = querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
console.log('2 ~ str*::*\t ', str);

/*
output:

1 ~ str*::*   foo=bar&baz=qux&baz=quux&corge=
2 ~ str*::*   foo:bar;baz:qux
*/

