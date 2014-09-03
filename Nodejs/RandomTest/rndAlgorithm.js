var fs= require('fs');

var times = process.argv[2];
var numLen = 32;
var howMany = numLen * times;

console.log('howMany = ', howMany, '\n');

function getRandomBytes () {
  var buf= new Buffer(howMany);
  var fd= fs.openSync('/dev/random', 'r');
  fs.readSync(fd, buf, 0, howMany, null);
  fs.closeSync(fd)

  console.log('buf.length = ', buf.length, '\n');

  var retArr = [];
  for(var i = 0; i < times; i++) {
    var offset = i * numLen;
    var v = buf.readInt32LE(offset);
    v = v > 0 ? v : -v;
    retArr.push(v);
  }

  console.log('retArr.length = %j \n', retArr.length);
  console.log('retArr = %j', retArr);
}

getRandomBytes();

