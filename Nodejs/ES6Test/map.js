'use strict';

// instantiation
const myMap = new Map([
	[ 'A', 1 ],
	[ 'B', 2 ],
	[ 'C', 3 ]
]);

// what's built into Map for you
myMap.forEach( (val, key) => console.log(key, val) ); // A 1, B 2, C 3
console.log(`${typeof myMap}, myMap =`, myMap, '\n');

// what Array can do for you
const tmpArray = Array.from( myMap ).map(([key, value]) => ({ key, value })); // [{key:'A', value: 1}, ... ]
console.log(`${typeof tmpArray}, tmpArray =`, tmpArray, '\n');

// less awesome iteration
let entries = myMap.entries( );
for (let entry of entries) {
	console.log(entry);
}

