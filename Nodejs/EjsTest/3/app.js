var connect = require('connect')
  , http = require('http');

var app = connect().use(function(req, res){
  var now = new Date();
  var body = now + ' ~ Hello World ! by: Will Lee';
  res.writeHead(200, {
    'Content-Type': 'text/plain'
    , 'Content-Length': body.length
  });
  res.end(body);
});

var port = 3000;
http.createServer(app).listen(port);

console.log('Connect server listening on port %d ...', port);

