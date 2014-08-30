var b = require('./b');

module.exports = { 
  a: function(){
    b.b();
  },

  c: function(){
    console.log('ok');    
  }
};

