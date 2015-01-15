var meld = require('meld');

var myObject = {
  doSomething: function(a, b) {
    return a + b;
  }
};

// Call a function after myObject.doSomething returns
var remover = meld.after(myObject, 'doSomething', function(result) {
  console.log('AOP after ~ myObject.doSomething returned: ' + result);
});

myObject.doSomething(1, 2); // Logs: "myObject.doSomething returned: 3"

remover.remove();

var res = myObject.doSomething(5, 6); // Nothing logged
console.log('res =', res);

