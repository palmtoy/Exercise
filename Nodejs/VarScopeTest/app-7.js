function myTest() {

  foo();

  function foo() {
    console.log("I come from `foo`.");
  }
}

myTest();


/*
Output:

I come from `foo`.
*/

