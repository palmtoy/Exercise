var getRndData = function(sampleL, n, retList) {
  if(sampleL.length < n) {
    return;
  }
  for(var i = 0; i < n; i++) {
    var rnd = Math.floor(Math.random() * sampleL.length);
    retList.push(sampleL[rnd]);
    sampleL.splice(rnd, 1);
  }
};

var sampleL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var retList = [];

getRndData(sampleL, 5, retList);

console.log('retList = ', retList);
