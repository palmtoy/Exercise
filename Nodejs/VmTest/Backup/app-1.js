var localVar = 123,
    usingscript, evaled,
    vm = require('vm');

usingscript = vm.runInThisContext('localVar = 1;', 'myfile.vm');
console.log('localVar: ' + localVar + ', usingscript: ' + usingscript);

evaled = eval('localVar = 1;');
console.log('localVar: ' + localVar + ', evaled: ' + evaled);

// localVar: 123, usingscript: 1
// localVar: 1, evaled: 1
