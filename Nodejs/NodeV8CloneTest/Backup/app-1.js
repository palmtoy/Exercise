var clone = require('node-v8-clone').clone;
var a = { x: { y: {} } };
 
// deep clone 
var b = clone(a, true);
console.log('a === b -->', a === b); // false 
console.log('a.x === b.x -->', a.x === b.x); // false 
console.log('a.x.y === b.x.y -->', a.x.y === b.x.y); // false 
 
// shallow clone 
var c = clone(a, false);
console.log('a === c -->', a === c); // false 
console.log('a.x === c.x -->', a.x === c.x); // true 
console.log('a.x.y === c.x.y -->', a.x.y === c.x.y); // true 

