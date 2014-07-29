/*

chrome ~ http://localhost:8081/user

or

mocha app.js

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

describe('GET /users', function(){

  it('respond with json ~ 1', function(done){
    request(app)
    .get('/user')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect('{"name":"palmtoy"}') // body
    .expect(200, done);
  });

  it('respond with json ~ 2', function(done){
    request(app)
    .get('/user')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      console.log('res.body = ', res.body);
      console.log('res.text = ', res.text);
      done()
    });
  });

})

