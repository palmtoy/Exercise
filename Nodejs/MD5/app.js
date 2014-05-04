var crypto = require('crypto');

var content = 'password'

var md5 = crypto.createHash('md5');
md5.update(content);

/*
md5.update('pa');
md5.update('ss');
md5.update('wo');
md5.update('rd');
*/

var d = md5.digest('hex');  // MD5值是: 5f4dcc3b5aa765d61d8327deb882cf99

console.log('content = ', content);
console.log('    md5 = ', d);

