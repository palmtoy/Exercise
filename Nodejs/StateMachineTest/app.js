var JSM = require("javascript-state-machine");

var Foo = function() {
  this.counter = 7;
  this.initFSM();
};

Foo.prototype.onenterready   = function() { this.counter++; };
Foo.prototype.onenterrunning = function() { this.counter++; };

JSM.StateMachine.create({
  target : Foo.prototype,
  initial: { state: 'ready', event: 'initFSM', defer: true }, // unfortunately, trying to apply an IMMEDIATE initial state wont work on prototype based FSM, it MUST be deferred and called in the constructor for each instance
  events : [{name: 'execute', from: 'ready',   to: 'running'},
    {name: 'abort',   from: 'running', to: 'ready'}]
});

var foo = new Foo();
var bar = new Foo();

console.log('foo.current:', foo.current, 'ready', 'start with correct state');
console.log('bar.current:', bar.current, 'ready', 'start with correct state');
console.log('\n');

console.log('foo.counter:', foo.counter, 8, 'start with correct counter 7 (from constructor) + 1 (from onenterready)');
console.log('bar.counter:', bar.counter, 8, 'start with correct counter 7 (from constructor) + 1 (from onenterready)');
console.log('\n');

foo.execute(); // transition foo, but NOT bar
console.log('foo.current:', foo.current, 'running', 'changed state');

foo.abort(); // transition foo, but NOT bar
console.log('foo.current:', foo.current, 'ready', 'changed state');
console.log('bar.current:', bar.current, 'ready',   'state remains the same');
console.log('\n');

console.log('foo.counter:', foo.counter, 10, 'incremented counter during onenterrunning');
console.log('bar.counter:', bar.counter, 8, 'counter remains the same');
console.log('\n');

