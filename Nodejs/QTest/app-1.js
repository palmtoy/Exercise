var Q = require('q');

function foo() {
  return Q.fcall(function () {
    return 10;
  });
}


foo()
.then(function(v) {
  console.log('1: v = ', v);
  return [v];
})
.spread(function(tmpArr) {
  console.log('typeof tmpArr = ', typeof tmpArr);
  return tmpArr;
})
.then(function(v) {
  console.log('typeof v = ', typeof v);
  console.log('2: v = ', v);
})
.fail(function(err) {
  console.error(err)
  return err;
});

