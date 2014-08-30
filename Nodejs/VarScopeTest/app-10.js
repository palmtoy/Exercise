function foo() { 
  var x = 1; 
  if (x) { 
    (function () { 
      var x = 2; 
      console.log('A: x = ', x);
      // some other code 
    }()); 
  } 
  // x is still 1. 
  console.log('B: x = ', x);
}

foo();

/*
Output:

A: x =  2
B: x =  1
*/

