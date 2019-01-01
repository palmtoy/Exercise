const symbol1 = Symbol();
const symbol2 = Symbol(168);
const symbol3 = Symbol('foo');

console.log(typeof symbol1); // expected output: 'symbol'

console.log(symbol2); // expected output: 'Symbol(168)'
console.log(symbol2.toString()); // expected output: 'Symbol(168)'

console.log(symbol3.toString()); // expected output: 'Symbol(foo)'

console.log(Symbol('foo') === Symbol('foo')); // expected output: false

