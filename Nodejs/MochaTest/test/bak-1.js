/*

mocha bak-1.js -g A1
mocha bak-1.js --grep A1

mocha bak-1.js -g B2
mocha bak-1.js --grep B2

*/

var fs = require('fs');

describe('File', function(){

	describe('#readFile-A', function(){

		it('A: should read test-A1.js without error', function(done){
			fs.readFile('test-1.js', function(err, data){
				if (err) throw err;
				console.log('\t1: data = ', data.toString());
				done();
			});
		});

		it('A: should read test-A2.js without error', function(done){
			fs.readFile('test-2.js', function(err, data){
				if (err) throw err;
				console.log('\t2: data = ', data.toString());
				done();
			});
		});

	});


	describe('#readFile-B', function(){

		it('B: should read test-B1.js without error', function(done){
			fs.readFile('test-1.js', function(err, data){
				if (err) throw err;
				console.log('\t1: data = ', data.toString());
				done();
			});
		});

		it('B: should read test-B2.js without error', function(done){
			fs.readFile('test-2.js', function(err, data){
				if (err) throw err;
				console.log('\t2: data = ', data.toString());
				done();
			});
		});

	});

});

