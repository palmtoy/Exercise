const foo = 100;

console.log('AAA: exports =', exports, '\n');
console.log('AAA: module.exports =', module.exports);
// module.exports ->  {}  <- exports

exports.foo = 200;
// module.exports ->  { foo: 200 }  <- exports

exports = { foo: 300 };
// exports -> { foo: 300 }
// module.exports ->  { foo: 200 }

console.log('BBB: exports =', exports, '\n'); // { foo: 300 }
console.log('BBB: module.exports =', module.exports); // { foo: 200 }

