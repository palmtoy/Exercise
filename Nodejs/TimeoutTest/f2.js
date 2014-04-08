var t1 = setTimeout( function(){console.log('Hello World!\n');}, 1000 );

console.log('t1 = ', t1, '\n');

setTimeout( function(){
  console.log('t1 = ', t1, '\n');
  clearTimeout(t1);
  }, 2000 );

setTimeout( function(){
  console.log('t1 = ', t1, '\n');
  clearTimeout(t1);
  }, 3000 );

setTimeout( function(){
  console.log('t1 = ', t1, '\n');
  clearTimeout(t1);
  }, 4000 );

