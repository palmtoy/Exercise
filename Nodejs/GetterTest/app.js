var consts = require('./consts');

console.log('HERO_STATS = ', consts.HERO_STATS);
// consts.HERO_STATS = {};

console.log('HERO_STATS[0] = ', consts.HERO_STATS[0]);
console.log('HERO_STATS[2] = ', consts.HERO_STATS[2]);

consts.HERO_STATS[3] = 'Hello World';
console.log('HERO_STATS[3] = ', consts.HERO_STATS[3]);

console.log('\nHERO_STATS = ', consts.HERO_STATS, '\n');

consts.HERO_STATS.forEach(function(v, k) {
  console.log('k = ', k);
  console.log('v = ', v, '\n');
});
