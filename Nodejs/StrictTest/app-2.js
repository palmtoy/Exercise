function testFunction() {
  "use strict";
  
  testvar = 4; // This causes a syntax error.
  console.log('1 ~ testvar = ' , testvar);
  return testvar;
}

testFunction();

testvar = 5;
console.log('2 ~ testvar = ' , testvar);

