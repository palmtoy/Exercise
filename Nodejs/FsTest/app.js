var fs = require('fs');

var cache = {'/etc': '/private/etc'};
// var cache = {'/etc':'/etc'};
// var cache = {};
fs.realpath('/etc/passwd', cache, function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
  console.log('cache = ', cache);
});

/*
var cache = {'/temp': './Backup/temp/app10.js', '/temp2': './Backup/temp'};
fs.realpath('/temp', cache, function (err, resolvedPath) {
  if (err) throw err;
  console.log(resolvedPath);
  console.log('cache = ', cache);
});
*/

