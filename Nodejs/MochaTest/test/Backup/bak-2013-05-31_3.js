/*
fs = require('fs');
describe('File', function(){
    describe('#readFile()', function(){
        it('should read test.ls without error', function(done){
            fs.readFile('test.ls', function(err){
                if (err) throw err;
                done();
            });
        })
        it('should read test.js without error', function(done){
            fs.readFile('test.js', function(err){
                if (err) throw err;
                done();
            });
        })
    })
})
*/

/*
describe('Array', function(){
    describe('#indexOf()', function(){
          it('should return -1 when the value is not present', function(){
        })
    })
});
*/

fs = require('fs');
describe('File', function(){
    describe('#readFile()', function(){
        it.skip('should read test.ls without error', function(done){
            fs.readFile('test.ls', function(err){
                if (err) throw err;
                done();
            });
        })
        it('should read test.js without error', function(done){
        })
    })
})

