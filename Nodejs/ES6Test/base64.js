const tmpJson = {
	foo: 'bar'
};

const tmpStr = JSON.stringify(tmpJson);

const strBase64 = Buffer.from(tmpStr).toString('base64');

const jsonObj = JSON.parse(Buffer.from(strBase64, 'base64').toString());

console.log(`   tmpStr = ${tmpStr}`);
console.log(`strBase64 = ${strBase64}`);
console.log('jsonObj   =', jsonObj);

