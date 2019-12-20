const neatCsv = require('neat-csv');
const csvData = 'type,part\nunicorn,horn\nrainbow,pink';

async function ConverWithNeatCsv(tmpData) {
    const ret = await neatCsv(tmpData);
    console.log(ret);
		/*
			[ Row { type: 'unicorn', part: 'horn' },
				Row { type: 'rainbow', part: 'pink' } ]
		*/

    console.log(`typeof ret = ${typeof ret}, strRet = ${JSON.stringify(ret)}\n`);
		for (let i = 0; i < ret.length; i++) {
    	console.log(`ret[${i}] =`, ret[i]);
    	console.log(`Object.keys(ret[${i}]) = ${Object.keys(ret[i])}`);
    	console.log(`Object.values(ret[${i}]) = ${Object.values(ret[i])}`);
			console.log('------------------------------');
		}
		console.log('\n==============================\n');
}

ConverWithNeatCsv(csvData);


const util = require('util');
const fs = require('fs');

const csvFilePath = './psx.csv';

const readFile = util.promisify(fs.readFile);
(async () => {
	const csvFile = await readFile(csvFilePath);
	await ConverWithNeatCsv(csvFile);
})();



