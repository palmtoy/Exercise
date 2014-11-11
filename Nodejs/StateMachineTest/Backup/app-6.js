var JSM = require("javascript-state-machine");


var myFSM = function() {
  this.counter = 21;
  this.startup();
};

myFSM.prototype = {
  onwarn: function() { this.counter++; }
};

JSM.StateMachine.create({
  target: myFSM.prototype,
  events: [
    { name: 'startup', from: 'none',   to: 'green'  },
    { name: 'warn',    from: 'green',  to: 'yellow' },
    { name: 'panic',   from: 'yellow', to: 'red'    },
    { name: 'clear',   from: 'yellow', to: 'green'  }
  ]
});

var a = new myFSM();
var b = new myFSM();

console.log('a.current:', a.current, 'green', 'start with correct state');
console.log('b.current:', b.current, 'green', 'start with correct state');
console.log('\n');

console.log('a.counter:', a.counter, 21, 'start with correct counter');
console.log('b.counter:', b.counter, 21, 'start with correct counter');
console.log('\n');

a.warn();

console.log('a.current:', a.current, 'yellow', 'maintain independent current state');
console.log('b.current:', b.current, 'green',  'maintain independent current state');
console.log('\n');

console.log('a.counter:', a.counter, 22, 'counter for (a) should have incremented');
console.log('b.counter:', b.counter, 21, 'counter for (b) should remain untouched');
console.log('\n');

console.log('a.hasOwnProperty(current):', a.hasOwnProperty('current'), "each instance should have its own current state");
console.log('b.hasOwnProperty(current):', b.hasOwnProperty('current'), "each instance should have its own current state");
console.log('\n');

console.log('!a.hasOwnProperty(warn):', !a.hasOwnProperty('warn'), "each instance should NOT have its own event methods");
console.log('!b.hasOwnProperty(warn):', !b.hasOwnProperty('warn'), "each instance should NOT have its own event methods");
console.log('\n');

console.log('a.warn === b.warn:', a.warn === b.warn, "each instance should share event methods");
console.log('\n');

console.log('a.warn === a.__proto__.warn:', a.warn === a.__proto__.warn, "each instance event methods come from its shared prototype");
console.log('b.warn === b.__proto__.warn:', b.warn === b.__proto__.warn, "each instance event methods come from its shared prototype");

