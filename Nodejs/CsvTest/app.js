const csvFilePath = './psx.csv';

const csv=require('csvtojson');

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

