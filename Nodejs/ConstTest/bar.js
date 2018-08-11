const {FOO} = require('./foo.js');

console.log(`FOO = ${FOO}`); // 'bar'

FOO = 'I want to change the value of FOO ...'; // TypeError: Assignment to constant variable.

console.log(`FOO = ${FOO}`); // won't be executed

