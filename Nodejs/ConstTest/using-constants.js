var constants = require('./constants');

console.log(constants.MY_CONSTANT); // 'my-constant-value'

constants.MY_CONSTANT = 'I want to change the value of MY_CONSTANT ...';

console.log(constants.MY_CONSTANT); // 'my-constant-value'


console.log(constants.BILL_STATUS.IN_PROGRESS); // 2

constants.BILL_STATUS.IN_PROGRESS = 22;

console.log(constants.BILL_STATUS.IN_PROGRESS); // 2

constants.BILL_STATUS = {};

console.log(constants.BILL_STATUS.IN_PROGRESS); // 2

console.log(constants.MONTH_DELIVERY); // 1

