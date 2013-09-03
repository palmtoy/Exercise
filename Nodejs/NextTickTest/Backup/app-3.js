var i = 0;
process.nextTick(function foo() {
  console.log('I am in foo...', ++i);
  process.nextTick(foo);
});
