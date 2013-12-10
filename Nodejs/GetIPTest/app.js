var os = require('os');
var IPv4, hostName;

hostName = os.hostname();

var tmpI = os.networkInterfaces().en0;
for(var i = 0; i < tmpI.length; i++){
  if(tmpI[i].family === 'IPv4'){
    IPv4 = tmpI[i].address;
  }
}

console.log('typeof IPv4: ' + typeof IPv4);
console.log('Local IP : ' + IPv4);
console.log('LocalHost: ' + hostName);

var pf = os.platform();
console.log('Platform: ' + pf);

