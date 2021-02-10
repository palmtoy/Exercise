const strA = '{"foo":"ba000r"}';
console.log(`strA = ${strA}, strLen = ${strA.length}`);
const tmpBufA = Buffer.from(strA);
console.log(tmpBufA);
console.log(`tmpBufA.length = ${tmpBufA.length}`);
const tmpListA = [];
for (const v of tmpBufA) {
	tmpListA.push(v);
}
console.log(tmpListA);
console.log(`tmpBufA.indexOf(0) = ${tmpBufA.indexOf(0)}`);
console.log(`tmpBufA.indexOf(111) = ${tmpBufA.indexOf(111)}`);
console.log();
/*
	strA = {"foo":"ba000r"}, strLen = 16
	<Buffer 7b 22 66 6f 6f 22 3a 22 62 61 30 30 30 72 22 7d>
	tmpBufA.length = 16
	[ 123, 34, 102, 111, 111, 34, 58, 34, 98, 97, 48, 48, 48, 114, 34, 125 ]
	tmpBufA.indexOf(0) = -1
	tmpBufA.indexOf(111) = 3
*/

const strB = '{"foo":"ba\0\0\0r"}';
console.log(`strB = ${strB}, strLen = ${strB.length}`);
const tmpBufB = Buffer.from(strB);
console.log(tmpBufB);
console.log(`tmpBufB.length = ${tmpBufB.length}`);
const tmpListB = [];
for (const v of tmpBufB) {
	tmpListB.push(v);
}
console.log(tmpListB);
console.log(`tmpBufB.indexOf(0) = ${tmpBufB.indexOf(0)}`);
console.log(`tmpBufB.indexOf(111) = ${tmpBufB.indexOf(111)}`);
console.log();
/*
	strB = {"foo":"bar"}, strLen = 16
	<Buffer 7b 22 66 6f 6f 22 3a 22 62 61 00 00 00 72 22 7d>
	tmpBufB.length = 16
	[ 123, 34, 102, 111, 111, 34, 58, 34, 98, 97, 0, 0, 0, 114, 34, 125 ]
	tmpBufB.indexOf(0) = 10
	tmpBufB.indexOf(111) = 3
*/

const objC = { foo: 0, bar: 0 };
console.log('objC =', objC);
const strC = JSON.stringify(objC);
console.log(`strC = ${strC}, strLen = ${strC.length}`);
const tmpBufC = Buffer.from(strC);
console.log(tmpBufC);
console.log(`tmpBufC.length = ${tmpBufC.length}`);
const tmpListC = [];
for (const v of tmpBufC) {
    tmpListC.push(v);
}
console.log(tmpListC);
console.log(`tmpBufC.indexOf(0) = ${tmpBufC.indexOf(0)}`);
console.log(`tmpBufC.indexOf(111) = ${tmpBufC.indexOf(111)}`);
/*
	objC = { foo: 0, bar: 0 }
	strC = {"foo":0,"bar":0}, strLen = 17
	<Buffer 7b 22 66 6f 6f 22 3a 30 2c 22 62 61 72 22 3a 30 7d>
	tmpBufC.length = 17
	[ 123, 34, 102, 111, 111, 34, 58, 48, 44, 34, 98, 97, 114, 34, 58, 48, 125 ]
	tmpBufC.indexOf(0) = -1
	tmpBufC.indexOf(111) = 3
*/

