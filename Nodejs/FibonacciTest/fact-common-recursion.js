// factorial[math expression: 5! = 120] ~ common_recursion.js
function commonFact(n) {
  if(n === 0) {
    console.log('commont fact: ');
    console.dir(process.memoryUsage() );
    return 1;
  } else {
    return n * commonFact(n-1);
  }
}

var cnt = parseInt(process.argv[2]) || 5;
var ret = commonFact(cnt);
console.log('ret = ', ret);

