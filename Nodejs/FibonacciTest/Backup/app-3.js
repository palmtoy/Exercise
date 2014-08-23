// recursion.js
function fact(n){
  if(n == 0){
    console.log('fact: ');
    console.dir(process.memoryUsage() );
  }
  return n==0 ? 1 : n * fact(n-1);
}

var cnt = parseInt(process.argv[2]);
var ret = fact(cnt);
console.log('ret = ', ret);

