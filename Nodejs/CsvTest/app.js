const csv = require('csvtojson');

const csvFilePath = './psx.csv';

csv().fromFile(csvFilePath)
	.then((jsonObj)=>{
		console.log(`\ncallback style: jsonObj = ${JSON.stringify(jsonObj)}`);
		console.log('\n------------------------------');
	});


async function doConvert() {
	const jsonArray = await csv().fromFile(csvFilePath);
	console.log('\nasync-await style: jsonArray =', jsonArray);
	console.log('\n------------------------------');
}

doConvert();

