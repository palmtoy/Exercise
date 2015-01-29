var http = require('http');
var port = 8080;

http.createServer(function (req, res) {
  res.writeHead(200, {});
  http.get({
    host: 'www.baidu.com', 
    // host: 'www.sina.com.cn', 
    port: 80, path: '/'}, 
      function(r) {
        var chunks = [];
        r.on('data', function (chunk) {
          chunks.push(chunk);
        });
        r.on('end', function() {
          chunks.forEach(
            function(chunk) {
              res.write(chunk);
            });
          res.end();
        });
    });
}).listen(port);

console.log('HTTP server is running on port:' + port);

