var EventEmitter = require('events').EventEmitter
, util = require('util');

// Here is the Ticker constructor:
var Ticker = function(time) {
  var self = this;
  this.time = time;
  setInterval(function() {
    self.emit('tick');
  }, self.time);
};

util.inherits(Ticker, EventEmitter);

var ticker = new Ticker(1000);

ticker.on('tick', function() { console.log(Date(), "TICK"); });
