var originStr = 'Hello World';

console.log('OriginStr =', originStr, '\n');

for(var i = 0; i < originStr.length; i++) {
	var tmpChar = originStr.charAt(i);
	var tmpCode = originStr.charCodeAt(i);
	console.log('tmpChar, tmpCode =', tmpChar, '\t', tmpCode);
}
console.log('');

var tmpArray = [];
for(var j = 0; j < originStr.length; j++) {
	var newCode = originStr.charCodeAt(j) + 1;
	var newChar = String.fromCharCode(newCode);
	tmpArray.push(newCode);
	console.log('newChar, newCode =', newChar, '\t', newCode);
}
console.log('');

console.log('tmpArray =', tmpArray);
targetStr = String.fromCharCode.apply(null, tmpArray);
console.log('TargetStr =', targetStr, '\n');

