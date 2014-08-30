function test() { 
  bar(); // "this will run!" 
  foo(); // TypeError "foo is not a function" 

  function bar() { // function declaration, given the name 'bar' 
    console.log("this will run!"); 
  } 

  var foo = function () { // function expression assigned to local variable 'foo' 
    console.log("this won't run!"); 
  } 
} 

test();

/*
Output:

this will run!

foo(); // TypeError "foo is not a function"
    ^
*/

