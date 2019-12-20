var fs = require('fs');
var zlib = require('zlib');

var gunzip = zlib.createGunzip();
var rstream = fs.createReadStream('./myfile.txt.gz');

rstream  // reads from myfile.txt.gz
  .pipe(gunzip)  // uncompresses
  .pipe(process.stdout);  // writes to stdout
