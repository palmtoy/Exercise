let obj = { a: 1 };
let niter = 22;

let before, str, took;

for (let i = 0; i < niter; i++) {
  obj = { obj1: obj, obj2: obj }; // 每个循环里面将对象 size 加倍
}

before = process.hrtime();
str = JSON.stringify(obj);
took = process.hrtime(before);
console.info(`str.length = ${str.length / 1024 / 1024} M\n`);
console.info('JSON.stringify execution time (hr): %ds - %dms', took[0], took[1] / 1000000, '\n');

before = process.hrtime();
res = str.indexOf('nomatch');
took = process.hrtime(before);
console.info('Pure indexof execution time (hr): %ds - %dms', took[0], took[1] / 1000000, '\n');

before = process.hrtime();
res = JSON.parse(str);
took = process.hrtime(before);
console.info('JSON.parse execution time (hr): %ds - %dms', took[0], took[1] / 1000000, '\n');

