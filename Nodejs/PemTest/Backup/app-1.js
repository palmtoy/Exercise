var https = require('https'),
    pem = require('pem');
var port = 4430;
 
pem.createCertificate({days:730, selfSigned:true}, function(err, keys){
    https.createServer({key: keys.serviceKey, cert: keys.certificate}, function(req, res){
        res.end('Hello World!')
    }).listen(port);
});

console.log('Https server is running on port:', port, '...');

