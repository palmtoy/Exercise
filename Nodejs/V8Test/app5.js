var t = new Array(180000);
console.time('time1');
for (var i = 0; i < 200000; ++i) {
  t.push(1);
}
console.timeEnd('time1');
