/*

var a = [];

for (var i = 0; i < 10; i++) {
  var c = i;
  a[i] = function () {
    console.log(c);
  };
}

a[6](); // 9

*/


/*

var a = [];

for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}

a[6](); // 10

*/


var a = [];

for (var i = 0; i < 10; i++) {
  a[i] = (function (k) {
      return function() {
        console.log(k);
      }
    })(i);
}

a[6](); // 6
a[9](); // 9

