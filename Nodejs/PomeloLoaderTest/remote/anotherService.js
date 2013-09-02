// remote service

module.exports = function(context) {
  return {

    sayHi: function(msg, cb) {
			console.log('SayHi ~ received msg = ', msg);
			cb(null, 'hi, ' + msg);
    },

		minus: function(msg, cb) {
			console.log('Minus ~ received msg = ', msg);
			var res = msg.arg1 - msg.arg2;
			cb(null, res);
		}

  };
};

