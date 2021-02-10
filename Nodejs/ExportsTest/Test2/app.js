const mod1 = require('./mod-x');

const mod2 = require('./mod-x');

console.log('(mod1 === mod2) is', mod1 === mod2, '\n');

console.log('mod1 =', mod1, '\n');
console.log('mod2 =', mod2, '\n');

mod1();
mod2();

