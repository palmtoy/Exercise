function getRandomNum(number){
  var today = new Date(); 
  var seed = today.getTime();
  var delta = Math.floor(Math.random() * seed);
  var sign = Math.floor(Math.random() * 2);
  if(!!sign) {
    seed += delta;
  } else {
    seed -= delta;
  }

  seed = (seed * 9301 + 49297) % 233280;
  return Math.floor(seed / 233280.0 * number);
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
  if(sampleL.length < n) {
    return;
  }
  var retList = [];

  for(var i = 0; i < n; i++) {
    var totalW = 0;
    sampleL.forEach(function(e) {
      totalW += e.w;
    });

    console.log('Before shullfe: sampleL = ', sampleL);
    sampleL = shuffleFunc(sampleL);
    console.log('After shullfe: sampleL = ', sampleL);
    console.log('===============================================');

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

var rndCnt = parseInt(process.argv[2]) || 1;

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

/*
Output:

node app.js 100000000                                                                                      [14:39:32]

totalW =  280

staticL =  [{"v":"A","w":10,"percent":"3.571%"},{"v":"B","w":20,"percent":"7.143%"},{"v":"C","w":30,"percent":"10.714%"},{"v":"D","w":40,"percent":"14.286%"},{"v":"E","w":50,"percent":"17.857%"},{"v":"F","w":60,"percent":"21.429%"},{"v":"G","w":70,"percent":"25.000%"}]

******************************************************************************************
******************************************************************************************

totalCnt =  300000000

statisticArr =  [{"v":"A","cnt":13196038,"percent":"4.399%"},{"v":"B","cnt":25121369,"percent":"8.374%"},{"v":"C","cnt":35888955,"percent":"11.963%"},{"v":"D","cnt":45413465,"percent":"15.138%"},{"v":"E","cnt":53622403,"percent":"17.874%"},{"v":"F","cnt":60512305,"percent":"20.171%"},{"v":"G","cnt":66245465,"percent":"22.082%"}]
*/

