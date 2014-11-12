var jsm = require("javascript-state-machine");

var fsm = jsm.StateMachine.create({
  events: [
    { name: 'startup', from: 'none',  to: 168 },
    { name: 'panic',   from: 168, to: 'red'   },
    { name: 'calm',    from: 'red',   to: 168 },
  ]});

console.log('1 ~ current state:', fsm.current); // none

fsm.startup();

console.log('2 ~ current state:', fsm.current); // 168

fsm.panic();

console.log('3 ~ current state:', fsm.current); // red

