var fs = require('fs');

var pwdFD = fs.open(process.env.HOME + '/.ssh/.password2', 'r');

console.log('pwdFD = ', pwdFD);
