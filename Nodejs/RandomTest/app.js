var shuffleFunc = function() { 
  return 0.5 - Math.random();
};

var getRndData = function(sampleL, n, retList) {
  if(sampleL.length < n) {
    return;
  }

  for(var i = 0; i < n; i++) {
    var totalW = 0;
    sampleL.forEach(function(e) {
      totalW += e.w;
    });

    sampleL.sort(shuffleFunc);

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
};

var sampleL = [{v: 'A', w: 10}, {v: 'B', w: 10}, {v: 'C', w: 10}, {v: 'D', w: 10}, {v: 'E', w: 10}, {v: 'F', w: 10}, {v: 'G', w: 10}, {v: 'H', w: 10}, {v: 'I', w: 10}, {v: 'J', w: 10}];
var retList = [];

getRndData(sampleL, 5, retList);

console.log('retList = ', retList);

