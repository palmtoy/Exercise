var util = require("util");
var events = require("events");

function MyStream(id) {
  events.EventEmitter.call(this);
  this.id = id;
  this.msgType = 'MSG_' + this.id;
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit(this.msgType, data);
};

MyStream.prototype.read = function(data) {
  console.log('I received data: "' + data + '"');
};


var stream = new MyStream(3);

console.log(stream instanceof events.EventEmitter); // true
console.log(MyStream.super_ === events.EventEmitter); // true

console.log('stream.msgType =', stream.msgType); // stream.msgType = MSG_3

stream.on(stream.msgType, stream.read);

stream.write("It works!"); // I received data: "It works!"

/*
output:

true
true
stream.msgType = MSG_3
I received data: "It works!"
*/

