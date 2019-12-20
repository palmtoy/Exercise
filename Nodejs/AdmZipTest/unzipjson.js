"use strict";

const AdmZip = require('adm-zip');
const fs = require('fs');


fs.readFile('./topoFile.zip', (err, buf) => {
  if (err) throw err;

	var zipObj = new AdmZip(buf);
	var zipEntries = zipObj.getEntries();

	zipEntries.forEach(function(zipEntry) {
		console.log(zipEntry.toString()); // outputs zip entries information
		if (zipEntry.entryName.indexOf('.zip' >= 0)) {
			zipObj.extractAllTo('./FolderUnzip', true);
		}
	});

});

