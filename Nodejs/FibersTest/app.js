var Future = require('fibers/future');

Future.task(function() {

  var funcy = function(arg) {
    return arg+1;
  }.future();

  var ret = funcy(5).wait(); // returns 6
  console.log('ret =', ret);

}).detach();

