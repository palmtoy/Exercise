var buf = new Buffer(6);

let str = '1',
    offset = 0;

let len = buf.write(str, offset, 1, 'hex');
console.log(`A: len = ${len}`); // len = 0  ( However, partially encoded characters will not be written. )
offset++;

str = '0' + 1;
len = buf.write(str, offset, 1, 'hex');
console.log(`B: len = ${len}`); // len = 1
offset++;

str = 0x1.toString();
len = buf.write(str, offset, 1, 'hex');
console.log(`C: len = ${len}`); // len = 0  ( However, partially encoded characters will not be written. )
offset++;

str = '0' + 0;
len = buf.write(str, offset, 1, 'hex');
console.log(`D: len = ${len}`); // len = 1
offset++;

str = '0';
len = buf.write(str, offset, 1, 'hex');
console.log(`E: len = ${len}`); // len = 0  ( However, partially encoded characters will not be written. )
offset++;

let n = 1;
len = buf.writeUInt8(n, offset);
console.log(`F: len = ${len}`); // len = 6  ( len equals 'offset plus the number of bytes written' )

console.log(buf); // <Buffer 00 01 00 00 00 01>

