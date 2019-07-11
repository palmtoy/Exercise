const zlib = require('zlib');

const inputBuf = 'Hello World ~ Hello World ~ Hello World ~ ' + new Date();

zlib.gzip(inputBuf, (zipErr, zipBuf) => {
	if (zipErr) throw zipErr;
	console.log(`inputBuf = ${inputBuf}`);
	console.log(`zipBuf.length = ${zipBuf.length}, zipBuf =>`);
	console.log(zipBuf);
	console.log();


	zlib.gunzip(zipBuf, (unzipErr, unzipBuf) => {
		if (unzipErr) throw unzipErr;
		console.log(`unzipBuf.length = ${unzipBuf.length}, unzipBuf =>`);
		console.log(unzipBuf);
		const outputBuf = unzipBuf.toString();
		console.log(`outputBuf = ${inputBuf}`);
	});
});

