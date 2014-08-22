var us = require('underscore');

var ll = [1, 2, 1, 0, 3, 1, 4];
var tmpL = [0, 1];
var retL = us.without(ll, 0, 1);

console.log('ll = ', ll);
console.log('tmpL = ', tmpL);
console.log('retL = ', retL);

var ll_2 = [1, 2, 3, 4, 5, 6];
var evens = us.filter(ll_2, function(num){ return num % 2 == 0; });
console.log('evens = ', evens);

var uL = us.uniq([1, 2, 1, 3, 1, 4, 2, 2, 2]);
console.log('uL = ', uL);

uL = us.uniq(['green', 'red', 'purple', 'red', 'red', 'green', 'green', 'purple']);
console.log('uL = ', uL);


var srcObj = {id: 1, name: 'Will_Source', tel: {comp: '1609706'}},
  targetObj = {name: 'Will_Target', gender: 1, tel: {homeTel: "1569809", officeTel: "01067890"}}; 

us.extend(targetObj, srcObj);

console.log('targetObj = ', targetObj);

