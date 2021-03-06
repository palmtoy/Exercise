// tail recursive v1
var fiboFunc = function(a, b, curCnt, tmpCnt) {
  if(curCnt >= tmpCnt) {
    return;
  }

  ++curCnt;
  console.log(curCnt + '\t:\t' + a);

  fiboFunc(b, a+b, curCnt, tmpCnt);
};

var doFibonacci = function(tmpCnt) {
  var a = 0
    , b = 1
    , curCnt = 0;

  ++curCnt;
  console.log(curCnt + '\t:\t' + a);
  
  fiboFunc(b, a+b, curCnt, tmpCnt);
};

var cnt = parseInt(process.argv[2]);

doFibonacci(cnt);
