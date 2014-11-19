var l = ['a', 'b', 'c'];

function foo() {
  l.forEach(function(e, k) {
    console.log('k, e = ', k, e);
    if(k === 1) {
      return e;
    }
  })
  return null;
}

var ret = foo();
console.log('ret = ', ret);
