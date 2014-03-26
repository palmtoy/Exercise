var fun = function(i) {
  console.log('i = ', i);
};

var gV = 100;

setTimeout(fun, 1000, ++gV);

