var colors = require('colors');
 
colors.setTheme({
  custom: ['red', 'underline'],
  silly: ['rainbow', 'underline']
});
 
console.log('test'.custom);
console.log('rainbow text'.silly);
