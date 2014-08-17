var shuffleFunc = function() { 
  return 0.5 - Math.random();
};

var l = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

l.sort(shuffleFunc);

console.log(l);

