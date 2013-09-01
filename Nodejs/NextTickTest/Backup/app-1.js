function foo() {
  console.log('foo');
}

// process.nextTick(foo);

setTimeout(foo, 0);

console.log('bar'); 
