var util = require("util");
var events = require("events");

function MyStream() {
  events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit('100', data);
  console.log('New data: ' + JSON.stringify(data));
}

var stream = new MyStream();

console.log(stream instanceof events.EventEmitter); // true
console.log(MyStream.super_ === events.EventEmitter); // true

stream.on('100', function(data) {
  console.log('I received data: ' + JSON.stringify(data));
  data.AAA += ' ~ Yes! ~';
  data.BBB = 'I have been changed!';
})

stream.write({'AAA': "It works?"}); // I received data: {"AAA":"It works?"}

/*
output:

true
true
I received data: {"AAA":"It works?"}
New data: {"AAA":"It works? ~ Yes! ~","BBB":"I have been changed!"}
*/

