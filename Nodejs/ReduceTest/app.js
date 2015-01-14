var originArray = [[0, 1], [2, 3], [4, 5]];

var flattened = originArray.reduce(function(a, b) {
  return a.concat(b);
}, [88, 99]);

// flattened is [0, 1, 2, 3, 4, 5]

console.log('originArray = ', originArray);
console.log('flattened = ', flattened);

