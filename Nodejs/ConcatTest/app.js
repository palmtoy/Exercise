var L = [[{'a': 'AAA'}, {'b': 'BBB'}], [{'c': 'CCC'}, {'d': 'DDD'}], [{'e': 'EEE'}, {'f': 'FFF'}]];

var retL = [];
for(var i in L) {
  retL = retL.concat(L[i]);
}

console.log('AAA ~ L = ', JSON.stringify(L));
console.log('BBB ~ retL = ', JSON.stringify(retL));

