"use strict";

function testFunction() {
  var testvar = 4;
  console.log('1 ~ testvar = ' , testvar);
  return testvar;
}

testFunction();

testvar = 5; // This causes a syntax error.
console.log('2 ~ testvar = ' , testvar);

