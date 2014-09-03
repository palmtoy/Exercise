var fs= require('fs');

function getRandomBytes(cnt) {
  // var maxCnt = Math.floor(1024 * 1024 * 1024 / 3 / 4);
  var maxCnt = 10;
  var retArr = [];

  cnt = Math.max(cnt, 0);
  cnt = Math.min(cnt, maxCnt);

  var numLen = 4;
  var byteNum = numLen * cnt;

  // max one third GByte
  var buf = new Buffer(byteNum);
  var fd = fs.openSync('/dev/random', 'r');
  fs.readSync(fd, buf, 0, byteNum, null);
  fs.closeSync(fd)

  // console.log('buf.length = ', buf.length, '\n');

  for(var i = 0; i < cnt; i++) {
    var offset = i * numLen;
    var v = buf.readInt32LE(offset);
    v = v > 0 ? v : -v;
    retArr.push(v);
  }

  return retArr;
}


var times = process.argv[2];
var tmpCnt = times;

var retArr = [];
for(var j = 0; j < times; j++) {
  if(retArr.length <= 0) {
    retArr = getRandomBytes(tmpCnt);
    tmpCnt -= retArr.length;
    console.log('\ntmpCnt = %j', tmpCnt);
  }

  var v = retArr.pop();
  console.log('%j: v = %j', j, v);
}

