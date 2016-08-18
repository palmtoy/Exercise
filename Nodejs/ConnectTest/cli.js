var request = require('request');


request('http://localhost:3000', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});


request('http://localhost:3000/hi', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});


request.post({
  headers: {'Content-type': 'application/x-www-form-urlencoded', charset: 'utf-8'},
  url: 'http://localhost:3000/wow',
  body: 'user=will'
}, function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});


request.post({
  headers: {'Content-type': 'application/x-www-form-urlencoded', charset: 'utf-8'},
  url: 'http://localhost:3000/qs',
  body: 'user[name][first]=will&user[email]=zgli@kabaminc.com'
}, function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

