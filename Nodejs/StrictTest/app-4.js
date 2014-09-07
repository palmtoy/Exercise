"use strict";

var testObj = Object.defineProperties({}, {
  prop1: {
    value: 10,
    writable: false // by default
  },
  prop2: {
    get: function () {
      return 20;
    }
  }
});

console.log('testObj = ', JSON.stringify(testObj));
console.log('testObj.prop1 = ', testObj.prop1);
console.log('testObj.prop2 = ', testObj.prop2);

testObj.prop1 = 80; 
testObj.prop2 = 90;

