var chalk = require('chalk');
 
console.log(chalk.styles.red);
//=> {open: '\u001b[31m', close: '\u001b[39m'} 
  
console.log(chalk.styles.red.open + 'Hello' + chalk.styles.red.close + ' World');
