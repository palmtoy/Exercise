/*
var assert = require("assert")

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      assert.equal(1, [11, 22, 33].indexOf(33));
    })
  })
})
*/


/*
var should = require('should');

var book = {name : '枪炮、病毒和钢铁'};

describe('Book', function () {
	it('图书应该应该一致', function () {
		var newBook={name : '枪炮、病毒和钢铁2'};
		newBook.should.eql(book);
		});
});
*/

fs = require('fs');
describe('File', function(){
    describe('#readFile()', function(){
        it('should read test.ls without error', function(done){
            fs.readFile('test.ls', function(err){
                if (err) throw err;
                done();
            });
        })
    })
})

