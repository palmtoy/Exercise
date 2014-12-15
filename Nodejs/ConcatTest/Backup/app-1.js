var L1 = [{'a': 'AAA'}, {'b': 'BBB'}];
var L2 = [{'c': 'CCC'}, {'d': 'DDD'}];
var L3 = [{'e': 'EEE'}, {'f': 'FFF'}];

var L = L1.concat(L2);
L = L.concat(L3);

console.log('L = ', JSON.stringify(L));
