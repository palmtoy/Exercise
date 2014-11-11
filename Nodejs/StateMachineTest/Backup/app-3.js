var jsm = require("javascript-state-machine");


var fsm = jsm.StateMachine.create({
  initial: { state: 'green', event: 'init' },
  events: [
    { name: 'panic', from: 'green', to: 'red'   },
    { name: 'calm',  from: 'red',   to: 'green' },
  ]});

console.log('current state:', fsm.current); // "green"
