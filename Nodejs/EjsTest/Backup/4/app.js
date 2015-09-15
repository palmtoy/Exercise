var connect = require('connect'),
    ejs = require('ejs'),
    http = require('http');

var app = connect().use(function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  var now = new Date();
  res.end(ejs.render(now + ' ~ Hi baby'));
});

var port = 3000;
http.createServer(app).listen(port);

console.log('Connect server listening on port %d ...', port);

