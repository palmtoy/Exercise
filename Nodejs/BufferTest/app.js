var buf1 = new Buffer(26);

for (var i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
}

console.log('\n(a)buf1 = ' + buf1.toString('ascii', 0, buf1.length));

var buf2 = buf1.slice(0, 3);
console.log('\n(a)buf2 = ' + buf2.toString('ascii', 0, buf2.length));

buf1[0] = 65; // 65 is ASCII A
console.log('\n(A)buf2 = ' + buf2.toString('ascii', 0, buf2.length));
console.log('\n(A)buf1 = ' + buf1.toString('ascii', 0, buf1.length));
// abc
// !bc

