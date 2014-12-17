var fs = require('fs');

var tmpPath = './pwd.txt';
var pwd4base64 = fs.readFileSync(tmpPath);
var pwd4origin = new Buffer(pwd4base64.toString(), 'base64').toString('ascii');
pwd4origin = '"' + pwd4origin + '"';

var tmpCmdC = 'echo ' + pwd4origin + ' | sudo -S kill -usr1 ' + '2537296';
console.log('tmpCmdC = ', tmpCmdC);


