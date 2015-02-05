function CFuncs() {
  this.onenter = function() {
    console.log('Hello World');
  };

  var f = function() { return 'f' };
  this.f = f;

  this.foo = 'bar';
}

CFuncs.prototype.myFunc = function() { return 'myFunc' };
CFuncs.prototype.myStr = 'myStr';

var o = new CFuncs();
o.tmpFunc = function() { return 'tmpFunc' };
o.tmpK = 'tmpV';

console.log(JSON.stringify(o));

