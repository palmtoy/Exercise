var cnt4Func1 = 0;
var forFunc1 = function() {
  cnt4Func1++;
  for(var i = 0; i < 3; i++) {
    console.log('%j ~ I am in forFunc1 : %s', Date.now(), 'a-'+cnt4Func1);
  }
  setTimeout(forFunc1, 0);
  // forFunc1();
};

/*
var cnt4Func2 = 0;
var forFunc2 = function() {
  cnt4Func2++;
  for(var i = 0; i < 3; i++) {
    console.log('%j ~ I am in forFunc2 : %s', Date.now(), 'b-    '+cnt4Func2);
  }
  setImmediate(forFunc2); // node v0.10.x
  // forFunc2();
};
*/

var cnt4Func3 = 0;
var forFunc3 = function() {
  cnt4Func3++;
  for(var i = 0; i < 3; i++) {
    console.log('%j ~ I am in forFunc3 : %s', Date.now(), 'c-       '+cnt4Func3);
  }
  process.nextTick(forFunc3); // node v0.8.x
  // forFunc3();
};


forFunc1();
// forFunc2();
forFunc3();

