var fs= require('fs');

function getRandomArr(cnt) {
  var maxCnt = Math.floor(1024 * 1024 * 1024 / 10 / 4);
  var retArr = [];

  cnt = cnt || 0;
  cnt = Math.max(cnt, 0);
  cnt = Math.min(cnt, maxCnt);

  var numLen = 4;
  var byteNum = numLen * cnt;

  if(byteNum <= 0) {
    return retArr;
  }

  // max 0.1 GByte
  var buf = new Buffer(byteNum);
  var fd = fs.openSync('/dev/random', 'r');
  fs.readSync(fd, buf, 0, byteNum, null);
  fs.closeSync(fd)

  for(var i = 0; i < cnt; i++) {
    var offset = i * numLen;
    var v = buf.readInt32LE(offset);
    v = v > 0 ? v : -v;
    retArr.push(v);
  }

  return retArr;
}


var rndCnt = parseInt(process.argv[2]) || 1;
var numForEach = 3;
var tmpCnt = rndCnt * numForEach * 10;

var gSeedArr = [];
function getRandomNum(maxNum){
  if(gSeedArr.length <= 0) {
    gSeedArr = getRandomArr(tmpCnt);
    tmpCnt -= gSeedArr.length;
    tmpCnt = Math.max(tmpCnt, 0);
  }

  if(gSeedArr.length <= 0) {
    console.error('Not enough random numbers!');
    process.exit(-1);
  }

  var seed = gSeedArr.pop();

  /*
  seed = (seed * 9301 + 49297) % 233280;
  return Math.floor(seed / 233280.0 * maxNum);
  */
  return Math.floor(seed % maxNum);
};


var shuffleFunc = function(tmpL) {
  // change the position 'i' with position x
  var len = tmpL.length;
  for(var i = 0; i < len; i++) {
    var rnd = getRandomNum(len);
    var tmp = tmpL[rnd];
    tmpL[rnd] = tmpL[i];
    tmpL[i] = tmp;
  }
  return tmpL;
};

var getRndData = function(sampleL, n) {
  n = n || 1;
  var retList = [];
  if(sampleL.length < n) {
    return retList;
  }

  for(var i = 0; i < n; i++) {
    var totalW = 0;
    sampleL.forEach(function(e) {
      totalW += e.w;
    });

    sampleL = shuffleFunc(sampleL);
    var rnd = getRandomNum(totalW + 1);

    for(var k = 0; k < sampleL.length; k++) {
      var e = sampleL[k];
      rnd -= e.w;
      if(rnd <= 0) {
        retList.push(e.v);
        sampleL.splice(k, 1);
        break;
      }
    }
  }
  return retList;
};


var statisticDict = {};

var staticL = [{v: 'A', w: 10}, {v: 'B', w: 20}, {v: 'C', w: 30}, {v: 'D', w: 40}, {v: 'E', w: 50}, {v: 'F', w: 60}, {v: 'G', w: 70}];

var totalW = 0;
staticL.forEach(function(e) {
  totalW += e.w;
});
console.log('totalW = ', totalW, '\n');

var fixedNum = 3;

staticL.forEach(function(e) {
  e.percent = (e.w / totalW * 100.0).toFixed(fixedNum) + '%';
});


for(var i = 0; i < rndCnt; i++) {
  var sampleL = staticL.slice();
  var retList = getRndData(sampleL, numForEach);
  // retList = [ 'G', 'A', 'B' ]

  retList.forEach(function(o) {
    statisticDict[o] = statisticDict[o] || {v: o, cnt: 0, percent: ''};
    statisticDict[o].cnt ++;
  });
}

var totalCnt = 0;
for(var j in statisticDict) {
  totalCnt += statisticDict[j].cnt;
}

for(var k in statisticDict) {
  var e = statisticDict[k];
  e.percent = (e.cnt / totalCnt * 100.0).toFixed(fixedNum) + '%';
}

var statisticArr = [];
for(var k in statisticDict) {
  var e = statisticDict[k];
  statisticArr.push(e);
}

statisticArr.sort(function(objA, objB) {
  return objA.v > objB.v;
})


console.log('staticL = ', JSON.stringify(staticL), '\n');
console.log('******************************************************************************************');
console.log('******************************************************************************************', '\n');

console.log('totalCnt = ', totalCnt, '\n');
console.log('statisticArr = ', JSON.stringify(statisticArr));

