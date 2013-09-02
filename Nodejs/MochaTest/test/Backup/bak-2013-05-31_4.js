fs = require('fs');
describe('File', function(){
    describe('#readFile()', function(){
        it.skip('should read test.as without error', function(done){
            fs.readFile('test.as', function(err){
                if (err) throw err;
                done();
            });
        })
        it('should read test.js without error', function(done){
					done();
        })
    })
})

