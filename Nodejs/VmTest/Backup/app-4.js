var vm = require('vm');

globalVar = 9;
// var localVar = 6;
localVar = 6;

var script = vm.createScript('globalVar += 1; localVar += 1;', 'myfile.vm');

for (var i = 0; i < 1000 ; i += 1) {
  script.runInThisContext();
}

console.log(globalVar);
console.log(localVar);

// 1009
