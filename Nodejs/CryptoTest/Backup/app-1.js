// var filename = process.argv[2];
var filename = './sha1.data';
var crypto = require('crypto');
var fs = require('fs');

var shasum = crypto.createHash('sha1');

var s = fs.ReadStream(filename);

s.on('data', function(d) {
  console.log("s.on('data') is running ...");
  shasum.update(d);
});

s.on('end', function() {
  console.log("s.on('end') is running ...");
  // var d = shasum.digest('hex');
  var d = shasum.digest('base64');
  console.log(d + '  ' + filename);
});
