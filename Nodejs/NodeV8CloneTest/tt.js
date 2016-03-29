var Cloner = require('node-v8-clone').Cloner;
var a = [1, [2, 3, 4], 5];
 
// create a cloner instance for deep cloning optimized for arrays. 
var c = new Cloner(true, { 'Array': Cloner.deep_array });
var b = c.clone(a);

console.log('a[1] = %j', a[1]);
console.log('b[1] = %j', b[1]);

console.log('a === b -->', a === b); // false 
console.log('a[1] === b[1] -->', a[1] === b[1]); // false 

