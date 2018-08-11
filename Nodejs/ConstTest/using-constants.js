var constants = require('./constants');

console.log(constants.MY_CONSTANT); // 'my-constant-value'

constants.MY_CONSTANT = 'I want to change the value of MY_CONSTANT ...';

console.log(constants.MY_CONSTANT); // 'my-constant-value'

