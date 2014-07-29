var t = new Array(181000);
console.time('time2');
for (var i = 0; i < 200000; ++i) {
  t.push(1);
}
console.timeEnd('time2');
