"use strict";


function testFunc() {
  return this;
}

var testvar = testFunc();


console.log('testFunc = ', testFunc);

console.log('testvar = ', testvar);

