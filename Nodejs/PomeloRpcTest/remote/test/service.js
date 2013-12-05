// remote service

module.exports = function(context) {
  return {
    echo: function(msg, cb) {
      console.log('Receive msg(`%s`) from client.', msg);
      cb(null, 'Echo from server: ' + msg);
    }
  };
};

