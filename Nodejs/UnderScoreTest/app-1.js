const _ = require('lodash');

const a1 = [10, 20, 30];
const a2 = [10, 20, 30];
// const a2 = [20, 10, 30];

console.log(`(a1 === a2) => ${_.isEqual(a1, a2)}`);
// console.log(`(a1 === a2) => ${_.isEqual(a1.sort(), a2.sort())}`);
// console.log(`(a1 === a2) => ${_.isEqual(_.sortBy(a1), _.sortBy(a2))}`);

console.log(`a1 => ${a1}, a2 => ${a2}`);

