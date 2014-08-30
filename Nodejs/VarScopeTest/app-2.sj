function rainman() {
  // rainman函数体内存在三个局部变量: i j k
  var i = 0;
  if (true) {
    var j = 0;
    for(var k = 0; k < 3; k++) {
      console.log('A: k = ', k); //分别弹出: 0 1 2
    }
    console.log('B: k = ', k); //弹出3
  }
  console.log('C: j = ',  j ); //弹出0
}

rainman();

/*
Output:

A: k =  0
A: k =  1
A: k =  2
B: k =  3
C: j =  0
*/

