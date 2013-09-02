var fs = require('fs');
var util = require('util');


var cache = {'/etc':'/private/etc'};
// var cache = {};
fs.realpath('/etc/passwd', cache, function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
});

