// foo(); // TypeError "foo is not a function" 
bar(); // valid 
// baz(); // TypeError "baz is not a function" 
// spam(); // ReferenceError "spam is not defined" 

var foo = function () {}; // anonymous function expression ('foo' gets hoisted) 
function bar() {}; // function declaration ('bar' and the function body get hoisted) 
var baz = function spam() {
  console.log('I am spam & baz.');
}; // named function expression (only 'baz' gets hoisted) 

foo(); // valid 
bar(); // valid 
baz(); // valid 
// spam(); // ReferenceError "spam is not defined" 


/*
Output:

*/

