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

