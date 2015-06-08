fs = require('fs');

describe('File', function(){

    describe('#readFile()', function(){

        it('should read test-1.js without error', function(done){
            fs.readFile('test-1.js', function(err, data){
                if (err) throw err;
								console.log('1: data = ', data.toString());
                done();
            });
        })

        it('should read test-2.js without error', function(done){
            fs.readFile('test-2.js', function(err, data){
                if (err) throw err;
								console.log('2: data = ', data.toString());
                done();
            });
        })

    })
})

