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
	var randomNum = 1;
	console.log('AAA: randomNum =', randomNum);
	if(Math.random() < 0.5) {
		randomNum = -1;
	}
	console.log('BBB: randomNum =', randomNum);
	var newCode = originStr.charCodeAt(j) + randomNum;
	var newChar = String.fromCharCode(newCode);
	tmpArray.push(newCode);
	console.log('newChar, newCode =', newChar, '\t', newCode);
}
console.log('');

console.log('tmpArray =', JSON.stringify(tmpArray));
targetStr = String.fromCharCode.apply(null, tmpArray);
console.log('TargetStr =', targetStr, '\n');

