const strA = '{"foo":"ba000r"}';
console.log(`strA = ${strA}, strLen = ${strA.length}`); // strA = {"foo":"ba000r"}, strLen = 16

const tmpBufA = Buffer.from(strA);
console.log(tmpBufA); // <Buffer 7b 22 66 6f 6f 22 3a 22 62 61 30 30 30 72 22 7d>
console.log(tmpBufA.length); // 16
console.log(`tmpBufA.indexOf(0) = ${tmpBufA.indexOf(0)}`); // tmpBufA.indexOf(0) = -1
console.log(`tmpBufA.indexOf(111) = ${tmpBufA.indexOf(111)}`); // tmpBufA.indexOf(111) = 3
console.log();


const strB = '{"foo":"ba\0\0\0r"}';
console.log(`strB = ${strB}, strLen = ${strB.length}`); // strB = {"foo":"bar"}, strLen = 16

const tmpBufB = Buffer.from(strB);
console.log(tmpBufB); // <Buffer 7b 22 66 6f 6f 22 3a 22 62 61 00 00 00 72 22 7d>
console.log(tmpBufB.length); // 16
console.log();

const tmpList = [];
for (const v of tmpBufB) {
	tmpList.push(v);
}
console.log(tmpList); // [ 123, 34, 102, 111, 111, 34, 58, 34, 98, 97, 0, 0, 0, 114, 34, 125 ]
console.log();

console.log(`tmpBufB.indexOf(0) = ${tmpBufB.indexOf(0)}`); // tmpBufB.indexOf(0) = 10
console.log(`tmpBufB.indexOf(111) = ${tmpBufB.indexOf(111)}`); // tmpBufB.indexOf(111) = 3

