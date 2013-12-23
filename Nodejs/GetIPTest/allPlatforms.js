// ubuntu
var os = require('os');
var IPv4,hostName;
hostName=os.hostname();
for(var i=0;i<os.networkInterfaces().eth0.length;i++){
  if(os.networkInterfaces().eth0[i].family=='IPv4'){
    IPv4=os.networkInterfaces().eth0[i].address;
  }
}
console.log('----------local IP: '+IPv4);
console.log('----------local host: '+hostName);


// win32
var os = require('os');
var IPv4,hostName;
hostName=os.hostname();
for(var i=0;i<os.networkInterfaces()['Local Area Connection'].length;i++){
  if(os.networkInterfaces()['Local Area Connection'][i].family=='IPv4'){
    IPv4=os.networkInterfaces()['Local Area Connection'][i].address;
  }
}
console.log('----------local IP: '+IPv4);
console.log('----------local host: '+hostName);


// mac
var os = require('os');
var IPv4, hostName;

hostName = os.hostname();
for(var i = 0; i < os.networkInterfaces().en0.length; i++){
  if(os.networkInterfaces().en0[i].family == 'IPv4'){
    IPv4 = os.networkInterfaces().en0[i].address;
  }
}

console.log('Local IP : ' + IPv4);
console.log('LocalHost: ' + hostName);

