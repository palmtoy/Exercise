// node app.js -i 9 -f 5.6 -r 1..10 -l 11,22,33 -o WWW XYT

var program = require('commander');

function range(val) {
  return val.split('..').map(Number);
}

function list(val) {
  return val.split(',');
}

program
.version('0.0.1')
.usage('[options] <file ...>')
.option('-i, --integer <n>', 'An integer argument', parseInt)
.option('-f, --float <n>', 'A float argument', parseFloat)
.option('-r, --range <a>..<b>', 'A range', range)
.option('-l, --list <items>', 'A list', list)
.option('-o, --optional [value]', 'An optional value')
.parse(process.argv);

console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' args: %j', program.args);
