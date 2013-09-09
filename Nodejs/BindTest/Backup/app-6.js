var EventEmitter = require('events').EventEmitter
    , util = require('util');

// Here is the Ticker constructor:
var Ticker = function(time) {
  this.time = time;
  this.tick = function() {
    this.emit('tick');
    setTimeout(this.tick.bind(this), this.time);
  };
}

util.inherits(Ticker, EventEmitter);

var newTicker = new Ticker(1000);

newTicker.on('tick', function() { console.log(Date(), "TICK"); });

newTicker.tick();
