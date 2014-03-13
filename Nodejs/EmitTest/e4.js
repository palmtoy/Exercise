var util = require("util");
var events = require("events");

function MyStream(id) {
  events.EventEmitter.call(this);
  this.id = id;
  this.msgType = 'MSG_' + this.id;
  console.log('msgType = ', this.msgType);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit(this.msgType, data);
}

var stream = new MyStream(3);

console.log(stream instanceof events.EventEmitter); // true
console.log(MyStream.super_ === events.EventEmitter); // true

stream.on(stream.msgType, function(data) {
  console.log('I received data: "' + data + '"');
})

stream.write("It works!!!"); // I received data: "It works!"

/*
output:

*/

