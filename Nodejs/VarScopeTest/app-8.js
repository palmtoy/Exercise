function myTest(){

  foo();

  var foo = function() {
    alert("I come from `foo`.");
  }

}

myTest();

/*
Output:

TypeError: undefined is not a function
*/

