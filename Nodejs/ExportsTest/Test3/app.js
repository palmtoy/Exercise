const student1 = require('./student');
const student2 = require('./student');

console.log('(student1 === student2) is', student1 === student2, '\n');

student1.printIdx();
student2.printIdx();

console.log('\nAAA: student1 =', student1, '\n');
console.log('AAA: student2 =', student2, '\n');

student1.setIdx(200);

student1.printIdx();
student2.printIdx();

console.log('\nBBB: student1 =', student1, '\n');
console.log('BBB: student2 =', student2, '\n');

