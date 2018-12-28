var buf = new Buffer(4);

let str = '1',
			offset = 0;

let len = buf.write(str, offset, 1, 'hex');
console.log(`A: len = ${len}`); // len = 0
offset++;

str = '0' + 1;
len = buf.write(str, offset, 1, 'hex');
console.log(`B: len = ${len}`); // len = 1
offset++;

str = 0x1.toString();
buf.write(str, offset, 1, 'hex');
offset++;

let n = 1;
buf.writeUInt8(n, offset);

console.log(buf); // <Buffer 00 01 00 01>

