var java = require("java");
java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");

var list1 = java.newInstanceSync("java.util.ArrayList");
console.log(list1.sizeSync()); // 0
list1.addSync('item1');
console.log(list1.sizeSync()); // 1

java.newInstance("java.util.ArrayList", function(err, list2) {
	list2.addSync("item1");
	list2.addSync("item2");
	console.log(list2.toStringSync()); // [item1, item2]
});

var ArrayList = java.import('java.util.ArrayList');
var list3 = new ArrayList();
list3.addSync('item1');
console.log(list3.equalsSync(list1)); // true

var charArray = java.newArray("char", "hello world".split(''));
console.log(`\ncharArray = ${JSON.stringify(charArray)}, ${typeof charArray}`);
console.log(`\ncharArray[0] = ${charArray[0]}, charArray[${charArray.length}] = ${charArray[charArray.length-1]}`);

var byteArray = java.newArray(
  "byte",
  "hello world"
    .split('')
    .map(function(c) { return java.newByte(String.prototype.charCodeAt(c)); }));
console.log(`\nbyteArray = ${JSON.stringify(byteArray)}\n`);

var javaLong = java.newInstanceSync("java.lang.Long", 5);
console.log('\nPossibly truncated long value: ' + javaLong);
console.log('Original long value (as a string): ' + javaLong.longValue + '\n');

