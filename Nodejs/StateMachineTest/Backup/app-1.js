var jsm = require("javascript-state-machine");

var fsm = jsm.StateMachine.create({
  events: [
    { name: 'startup', from: 'none',  to: 'green' },
    { name: 'panic',   from: 'green', to: 'red'   },
    { name: 'calm',    from: 'red',   to: 'green' },
  ]});

console.log('1 ~ current state:', fsm.current); // "none"

fsm.startup();

console.log('2 ~ current state:', fsm.current); // "green"

