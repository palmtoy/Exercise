var jsm = require("javascript-state-machine");


var fsm = jsm.StateMachine.create({
  initial: { state: 'green', event: 'init', defer: true },
  events: [
    { name: 'panic', from: 'green', to: 'red'   },
    { name: 'calm',  from: 'red',   to: 'green' },
  ]});

console.log('1 ~ current state:', fsm.current); // "none"

fsm.init();

console.log('2 ~ current state:', fsm.current); // "green"

