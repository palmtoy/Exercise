"use strict";

var testvar = 15;
function testFunc() {};
// delete testvar;
// delete testFunc;

var testObj = {};

Object.defineProperty(testObj, "testvar", {
  value: 10,
  configurable: false
});

// delete testObj.testvar;

console.log('testObj = ', JSON.stringify(testObj));
console.log('testObj.testvar = ', testObj.testvar);

