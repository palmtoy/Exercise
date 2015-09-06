var request = require('request');
var fs = require('fs');

var url = 'https://raw.githubusercontent.com/palmtoy/ImageBucket/master/LordOfPomelo/InstanceTest/0.jpg';
request(url).pipe(fs.createWriteStream('0.jpg'))

