var os = require('os');
var IPv4, hostName;

hostName = os.hostname();

for(var i = 0; i < os.networkInterfaces().en0.length; i++){
  if(os.networkInterfaces().en0[i].family === 'IPv4'){
    IPv4 = os.networkInterfaces().en0[i].address;
  }
}

console.log('typeof IPv4: ' + typeof IPv4);
console.log('Local IP : ' + IPv4);
console.log('LocalHost: ' + hostName);

var pf = os.platform();
console.log('Platform: ' + pf);

