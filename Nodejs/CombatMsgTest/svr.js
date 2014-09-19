var http = require('http');
var connect = require('connect');
var connectables = require('connectables');
var qs = require('qs');

var port = 3000;

var app = connect.createServer(
  connect.logger(),

  // used to parse the POST request string to json obj
  connect.bodyParser(),

  connectables.router(function(router) {
    // POST
    router.post('/combatmsg', function(req, res, next) {
      console.log('req.body = ', req.body);
      res.end('200');
    });
  })
);


var server = http.createServer(app);
server.listen(port);

console.log('Http server running at http://127.0.0.1:' + port);

