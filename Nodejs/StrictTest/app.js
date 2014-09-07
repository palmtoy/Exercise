"use strict";


function testArgs(oneArg) {
  arguments[0] = 20;
  console.log('oneArg = ', oneArg);
}

testArgs(10);


with (Math){
  x = cos(3);
  y = tan(7);
}


function foo(testInt) {
  if (testInt-- == 0)
    return;
  arguments.callee(testInt--);
}

foo(3);

