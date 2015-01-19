var Fiber = require('fibers');

var inc = Fiber(function(start) {
  console.log('ZZZ ~ start =', start);
  var total = start;
  while (true) {
    console.log('AAA ~ total =', total);
    var ret = Fiber.yield(total);
    console.log('BBB ~   ret =', ret);
    total += ret;
    console.log('CCC ~ total =', total);
  }
});

for (var ii = inc.run(2); ii <= 10; ii = inc.run(3)) {
  console.log('         ii =', ii + '\n');
}

