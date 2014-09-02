var underscore = require('underscore');

var shuffleFunc = function() { 
  return 0.5 - Math.random();
};

var getRndData = function(sampleL, n) {
  n = n || 1;
  if(sampleL.length < n) {
    return;
  }
  var retList = [];

  for(var i = 0; i < n; i++) {
    var totalW = 0;
    sampleL.forEach(function(e) {
      totalW += e.w;
    });

    // sampleL.sort(shuffleFunc);
    sampleL = underscore.shuffle(sampleL);

    var rnd = Math.floor(Math.random() * totalW + 1);
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

var rndCnt = parseInt(process.argv[2]) || 1;

var staticL = [{v: 'A', w: 10}, {v: 'B', w: 20}, {v: 'C', w: 30}, {v: 'D', w: 40}, {v: 'E', w: 50}, {v: 'F', w: 60}, {v: 'G', w: 70}];

var totalW = 0;
staticL.forEach(function(e) {
  totalW += e.w;
});
console.log('totalW = ', totalW, '\n');

staticL.forEach(function(e) {
  e.percent = (e.w / totalW * 100.0).toFixed(3) + '%';
});


for(var i = 0; i < rndCnt; i++) {
  var sampleL = staticL.slice();
  var retList = getRndData(sampleL, 3);
  // retList =  [ 'G', 'A', 'B' ]

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
  e.percent = (e.cnt / totalCnt * 100.0).toFixed(3) + '%';
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

