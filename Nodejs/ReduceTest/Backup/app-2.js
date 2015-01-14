var ret = [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
  return previousValue + currentValue;
}, 10);

console.log('ret = ', ret);

