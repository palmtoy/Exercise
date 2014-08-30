var a = 1; 

function b() { 
  a = 10; 
  console.log('1: a = ', a);
  return; 
  function a() {} 
} 

b(); 

console.log('2: a = ', a);

/*
Output:

a =  1
*/

