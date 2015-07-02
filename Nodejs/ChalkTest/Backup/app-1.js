var chalk = require('chalk');
var myPrint = console.log;
 
// style a string 
var str = chalk.blue('Hello world!');
myPrint(str);
 
// combine styled and normal strings 
str = chalk.blue('Hello') + 'World' + chalk.red('!');
myPrint(str);
 
// compose multiple styles using the chainable API 
str = chalk.blue.bgRed.bold('Hello world!');
myPrint(str);
 
// pass in multiple arguments 
str = chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz');
myPrint(str);
 
// nest styles 
str = chalk.red('Hello', chalk.underline.bgBlue('world') + '!');
myPrint(str);
 
// nest styles of the same type even (color, underline, background) 
str = chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
);
myPrint(str);

