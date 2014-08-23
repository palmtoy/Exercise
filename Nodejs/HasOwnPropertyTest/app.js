function ObjWithProto() {
  this.foo = 'foo_val';
}

ObjWithProto.prototype = {bar: 'bar_val'};

var dict = new ObjWithProto();
dict.foobar = 'foobar_val';


function forEach(dict) {
  var key;
  for (key in dict) {
    if ( dict.hasOwnProperty(key) ) {
      console.log('has', key, dict[key]);
    } else {
      console.log('not', key, dict[key]);
    }
  }
}
forEach( dict );


/*
Output:

has foo foo_val
has foobar foobar_val
not bar bar_val
*/

