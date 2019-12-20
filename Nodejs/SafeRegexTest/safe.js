const safe = require('safe-regex');

const regex = process.argv.slice(2).join(' ');

console.log(safe(regex));

/*

$ node safe.js '/(\/.+)+$/'
false

$ node safe.js '(x+x+)+y'
false

$ node safe.js '(beep|boop)*'
true

$ node safe.js '(a+){10}'
false

$ node safe.js '\blocation\s*:[^:\n]+\b(Oakland|San Francisco)\b'
true

*/

