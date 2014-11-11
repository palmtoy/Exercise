var jsm = require("javascript-state-machine");


var fsm = jsm.StateMachine.create({
  initial: 'green',

  error: function(eventName, from, to, args, errorCode, errorMessage) {
    return 'event ' + eventName + ' was naughty :- ' + errorMessage;
  },

  events: [
    { name: 'panic', from: 'green', to: 'red'   },
    { name: 'calm',  from: 'red',   to: 'green' },
  ]
});

console.log('1 ~ current state:', fsm.current);

console.log(fsm.calm()); // "event calm was naughty :- event not allowed in current state green"
// console.log(fsm.panic()); // ok

console.log('2 ~ current state:', fsm.current);
