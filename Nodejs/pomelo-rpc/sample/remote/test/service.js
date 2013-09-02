// remote service

module.exports = function(context) {
  return {

    echo: function(msg, cb) {
			console.log('Echo ~ received msg = ', msg);
      cb(null, 'echo: ' + msg);
    },

		combine: function(msg, cb) {
			console.log('Combine ~ received msg = ', msg);
			var sum = msg.arg1 + msg.arg2;
			var resp = 'sum(' + msg.arg1 + '+' + msg.arg2 + ') = ' + sum;
			cb(null, resp);
		}
  };
};