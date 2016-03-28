var https = require('https'),
    pem = require('pem'),
    express = require('express');

var port = 4430;
 
pem.createCertificate({days:365, selfSigned:true}, function(err, keys){
  var app = express();
 
  app.get('/', function(req, res){
    res.send('Hello ~ o hai! ' + new Date());
  });
 
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(port);
	console.log('Https server is running on port:', port, '...');
});

