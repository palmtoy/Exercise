var Fiber = require('fibers');

var inc = Fiber(function(start) {
  var total = start;
  while (true) {
    console.log('AAA ~ total =', total);
    total += Fiber.yield(total);
    console.log('BBB ~ total =', total);
  }
});

for (var ii = inc.run(1); ii <= 16; ii = inc.run(2)) {
  console.log('         ii =', ii + '\n');
}

