const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const rstream = fs.createReadStream('./myfile.txt');
const wstream = fs.createWriteStream('./myfile.txt.gz');

rstream  // reads from myfile.txt
	.pipe(gzip)  // compresses
	.pipe(wstream)  // writes to myfile.txt.gz
	.on('finish', function () {  // finished
		console.log('Done compressing.');
	});

