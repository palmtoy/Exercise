var request = require('supertest');
var express = require('express');

var app = express();

app.get('/user', function(req, res) {
	res.status(200).json({ id: 'some fixed id', name: 'TOBI' });
});

request(app)
	.get('/user')
	.expect('Content-Type', /json/)
	.expect('Content-Length', '36')
	.expect(200)
	.end(function(err, res) {
		if (err) throw err;
  	console.log('\nAAA ~ res.body = ', res.body);
	});

describe('GET /user', function() {
	it('respond with json', function(done) {
		request(app)
		.get('/user')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
    .end(function(err, res){
      if (err) return done(err);
      console.log('\nBBB ~ res.body = ', res.body);
      done()
    });
	});
});

describe('GET /user', function() {
	it('user.name should be an case-insensitive match for "tobi"', function(done) {
		request(app)
		.get('/user')
		.set('Accept', 'application/json')
		.expect(function(res) {
			res.body.id = 'some fixed id';
			res.body.name = res.body.name.toUpperCase();
		})
		.expect(200, {
			id: 'some fixed id',
			name: 'TOBI'
		}, done);
	});
});

