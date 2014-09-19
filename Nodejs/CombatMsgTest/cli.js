var request = require('request');
var port = 3000;


request.post({
  headers: {'Content-type': 'application/x-www-form-urlencoded', charset: 'utf-8'},
  url: 'http://localhost:' + port + '/combatmsg',
  body: 'user=will'
}, function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

