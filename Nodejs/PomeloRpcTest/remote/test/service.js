// remote service

module.exports = function(context) {
  return {
    echo: function(msg, cb) {
      console.log('receive msg from client = ', msg);
      cb(null, 'echo from server: ' + msg);
    }
  };
};
