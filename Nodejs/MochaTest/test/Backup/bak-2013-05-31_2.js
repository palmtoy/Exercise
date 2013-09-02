fs = require('fs');
describe('File', function(){
    describe('#readFile()', function(){
        it('should read test.ls without error', function(done){
            // fs.readFile('test.ls', function(err){
            fs.readFile('test.as', function(err){
                if (err) throw err;
                done();
            });
        })
    })
})

