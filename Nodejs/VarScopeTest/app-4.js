var x = 1;

function rain(){
  console.log('A: x = ', x);        //弹出 'undefined'，而不是1
  var x = 'rain-man';
  console.log('B: x = ', x);        //弹出 'rain-man'
}

rain();

console.log('C: x = ', x);        //弹出 'rain-man'

/*
Output:

A: x =  undefined
B: x =  rain-man
C: x =  1
*/

