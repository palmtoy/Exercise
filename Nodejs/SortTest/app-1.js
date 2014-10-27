var o1 = { x: 'a6', y: 'b1' };
var o2 = { x: 'a3', y: 'b2' };
var o3 = { x: 'a6', y: 'b0' };

var ll = [o1, o2, o3];
console.log(ll);

var tmpLL = ll.sort(function(a, b) {
  if(a.x !== b.x) {
    if(a.x > b.x) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return a.y > b.y;
    if(a.y > b.y) {
      return 1;
    } else {
      return 0;
    }
  }
});

console.log('\n');
console.log(tmpLL);

