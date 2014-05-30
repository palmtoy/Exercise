var t = new Array(1E5-1);
console.time('time1');
for (var i = 0; i < 1E5; ++i) {
  t.push(1);
}
console.timeEnd('time1');
