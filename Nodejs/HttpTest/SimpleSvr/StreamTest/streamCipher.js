const crypto = require('crypto');
const fs = require('fs');

// get your password from safe store
const password = new Buffer('my-secret');
const aes = crypto.createCipher('aes-256-cbc', password);
const rstream = fs.createReadStream('./myfile.txt');
const wstream = fs.createWriteStream('./myfile.encrypted');

rstream  // reads from myfile.txt
  .pipe(aes)  // encrypts with aes256
  .pipe(wstream)  // writes to myfile.encrypted
  .on('finish', () => {  // finished
    console.log('Done encrypting.');
  });

