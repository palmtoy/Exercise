var timer =
{ 
  start: function()
  {
    var self = this;
    // setInterval(function(){self.tick();}, 1000);
    setInterval( this.tick.bind(this), 1000 );
  },

  tick: function()
  {
    console.log(Date(), "tick!");
  }
};

timer.start();
