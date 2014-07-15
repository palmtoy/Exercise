var qs = require('qs');

var str = qs.parse('user[name][first]=will&user[email]=will@learnboost.com');
console.log('AAA ~ str = ', str);
// => { user: { name: { first: 'will' }, email: 'will@learnboost.com' } }

str = qs.stringify({ user: { name: 'will', email: 'will@learnboost.com' }})
console.log('BBB ~ str = ', str);
// => user[name]=will&user[email]=will%40learnboost.com
