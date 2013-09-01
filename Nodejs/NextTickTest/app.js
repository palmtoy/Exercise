var cnt4Func1 = 0;
var forFunc1 = function() {
  cnt4Func1++;
  for(var i = 0; i < 3; i++) {
    console.log('%j ~ I am in forFunc1 : %s', Date.now(), 'a-'+cnt4Func1);
  }
  // process.nextTick(forFunc1);
  setTimeout(forFunc1, 0);
  // forFunc1();
};

var cnt4Func2 = 0;
var forFunc2 = function() {
  cnt4Func2++;
  for(var i = 0; i < 3; i++) {
    console.log('%j ~ I am in forFunc2 : %s', Date.now(), 'b-    '+cnt4Func2);
  }
  process.nextTick(forFunc2);
  // setTimeout(forFunc2, 0);
  // forFunc2();
};

forFunc1();
forFunc2();
