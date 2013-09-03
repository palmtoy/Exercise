var fs = require('fs');

var logFD = fs.openSync('./sioSvrLog.js', 'w');

for(var i = 0; i < 10; i++) {
  fs.write(logFD, 'hi, baby : ' + i + '\n');
}
