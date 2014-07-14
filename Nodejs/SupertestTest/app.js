/*

chrome ~ http://localhost:8081/user

*/

var request = require('supertest')
  , express = require('express');

var port = 8081;

var app = express();

app.get('/user', function(req, res){
  res.send(200, { name: 'palmtoy' });
});

app.listen(port);
console.log('Express http server is running on', port, '...');

request(app)
.get('/user')
.expect('Content-Type', /json/)
.expect('Content-Length', '18')
.expect(200)
.end(function(err, res){
  if (err) throw err;
  // console.log('res = ', res);
  console.log('res.body = ', res.body); // res.body =  { name: 'palmtoy' }
});

