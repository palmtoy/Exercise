var crypto = require('crypto');

function sha1(text) {
	return crypto
	.createHash('sha1')
	.update(text)
	.digest('hex');
}

var plainTest = process.argv[2];
if(!plainTest) {
	console.error('Please input the plain text ...');
	return;
}

var cipherText = sha1(plainTest);
console.log('Cipher text is:', cipherText);
