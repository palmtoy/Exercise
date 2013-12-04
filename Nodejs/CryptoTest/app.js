var crypto = require('crypto');
var content = 'password'
var md5 = crypto.createHash('md5');
md5.update(content);
var d = md5.digest('hex');  //MD5值是5f4dcc3b5aa765d61d8327deb882cf99
console.log(' md5(%j) = ', content, d);

var shasum = crypto.createHash('sha1');
shasum.update(content);
var d = shasum.digest('hex');
console.log('sha1(%j) = ', content, d);
