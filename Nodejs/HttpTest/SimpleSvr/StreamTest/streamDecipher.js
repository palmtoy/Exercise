const crypto = require('crypto');
const fs = require('fs');

// get your password from safe store
const password = new Buffer('my-secret');
const aes = crypto.createDecipher('aes-256-cbc', password);
const rstream = fs.createReadStream('./myfile.encrypted');

rstream  // reads from myfile.txt
  .pipe(aes)  // decrypt with aes256
  .pipe(process.stdout);  // output stdout

