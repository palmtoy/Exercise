'use strict';

var myMap = new Map();

var keyString = 'a string',
	keyObj = {},
	keyFunc = function() {};

// setting the values
myMap.set(keyString, "value associated with 'a string' - 1");
myMap.set(keyObj, 'value associated with keyObj - 2');
myMap.set(keyFunc, 'value associated with keyFunc - 3');

console.log(`myMap.size = ${myMap.size}\n`); // 3

// getting the values
console.log(myMap.get(keyString));     // "value associated with 'a string'"
console.log(myMap.get(keyObj));        // "value associated with keyObj"
console.log(myMap.get(keyFunc), '\n'); // "value associated with keyFunc"

console.log(myMap.get('a string'));    // "value associated with 'a string'", because keyString === 'a string'
console.log(myMap.get({}));            // undefined, because keyObj !== {}
console.log(myMap.get(function() {})); // undefined, because keyFunc !== function () {}

