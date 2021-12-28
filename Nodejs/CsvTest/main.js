#!/usr/bin/env node

const fs = require('fs');
const { parse: funcParse } = require('csv-parse');


const processFile = async () => {
	return new Promise((resolve, reject) => {
		const parserObj = funcParse({trim: true, skip_empty_lines: true, columns: true}, (err, data) => {
			if (err) {
				return reject(err);
			}
			return resolve(data);
		});

		fs.createReadStream('./demo-data.csv').pipe(parserObj);
	});
};


(async () => {
	const records = await processFile();
	console.info(records);
})();

