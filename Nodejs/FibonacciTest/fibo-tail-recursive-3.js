// tail recursive v2
var fiboFunc = function(a, b, curCnt, tmpCnt, resList) {
  if(curCnt > tmpCnt) {
    return resList;
  }

  resList.push(b);

  return fiboFunc(b, a+b, ++curCnt, tmpCnt, resList);
};

var doFibonacci = function(tmpCnt) {
  var a = 0
    , b = 1
    , originList = [a, b]
    , curCnt = originList.length;

  var resList = fiboFunc(b, a+b, ++curCnt, tmpCnt, originList);

  console.log('\nLen = ', resList.length);
  console.log('\nresList = ', resList, '\n');
};

var cnt = parseInt(process.argv[2]);

doFibonacci(cnt);
