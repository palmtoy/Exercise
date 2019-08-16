"use strict";

let myArray = [ 1, 3, 1, 2, 1, 1, 2, 3, 3, 3 ];

let uniqueArray = [ ... new Set(myArray) ]; 

console.log(`myArray = ${myArray}`)
console.log(`uniqueArray = ${uniqueArray}`)
console.log(`========================================\n`)


let myArray2 = [ 1, 3, 1, 2, 1, 1, 2, 3, 3, 3 ];
let uniqueArray2 = Array.from(new Set(myArray2))

console.log(`myArray2 = ${myArray2}`)
console.log(`uniqueArray2 = ${uniqueArray2}`)
console.log(`========================================\n`)

