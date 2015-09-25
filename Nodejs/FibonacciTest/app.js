// factorial[math expression: 5! = 120] ~ tail_recursion.js
function tailFact(n, p) {
  p = p || 1;
  if(n === 0) {
    console.log('tail fact: ');
    console.dir(process.memoryUsage() );
    return p;
  } else {
    return tailFact(n-1, p*n);
  }
}

var cnt = parseInt(process.argv[2]) || 1;
var ret = tailFact(cnt);
console.log('ret = ', ret);

