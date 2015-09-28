var tty = require('tty.js');

var app = tty.createServer({
  shell: 'zsh',
  users: {
    foo: 'bar'
  },
  port: 6868
});

app.get('/foo', function(req, res, next) {
  res.send('bar');
});

app.listen();
