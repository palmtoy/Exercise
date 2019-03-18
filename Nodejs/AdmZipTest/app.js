"use strict";

const request = require('request');
const fs = require('fs');
const admZip = require('adm-zip');

const linkObj = require('./ziplink.json');
console.log(`Start downloading ... [> ${linkObj.zipLink} <]`);

request({

	method: 'GET',
	url: linkObj.zipLink,
	encoding: null // <- this one is important !

}, function (error, response, body) {

	if(error) throw error;
	if(response.statusCode !== 200) {
		console.log('Download failed.');
		return;
	};
	
	const targetPath = '/tmp/CosFolder/';
	let zipFile = linkObj.zipLink.split('?')[0].split('/');
	zipFile = targetPath + zipFile[zipFile.length-1];
	console.log(`zipFile = ${zipFile}`);

	fs.writeFile(zipFile, body, function(err) {

		if(err) throw err;
		console.log('Finished downloading.');
		const zipObj = new admZip(zipFile);

		console.log('Start to unzip ...');
		zipObj.extractAllTo(targetPath, true);

		const zipEntries = zipObj.getEntries(); // an array of ZipEntry records
 
    zipEntries.forEach(function(zipEntry) {
			console.log(zipEntry.toString()); // outputs zip entries information
			let tmpName = targetPath + zipEntry.entryName;
			if (tmpName.indexOf('.zip' >= 0)) {
				console.log(`tmpName = ${tmpName}`);
				const tmpZipObj = new admZip(tmpName);
				tmpZipObj.extractAllTo(targetPath, true);
			}
    });

		console.log('Finished unzip.');

	});

});

