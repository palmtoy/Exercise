path = require('path');

/*
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));

var tmp = path.join('/foo', '///bar2', 'baz/asdf', 'quux', '..');
console.log('tmp = ', tmp);

tmp = path.join('foo', {}, 'bar');
console.log('tmp = ', tmp);

tmp = path.resolve('/foo/bar', './baz');
console.log('tmp = ', tmp);

tmp = path.resolve('/foo/bar', '/tmp/file/');
console.log('tmp = ', tmp);

tmp = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
console.log('tmp = ', tmp);

tmp = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
console.log('tmp = ', tmp);

tmp = path.dirname('/foo/bar/baz/asdf/quux');
console.log('tmp = ', tmp);

tmp = path.basename('/foo/bar/baz/asdf/quux.html');
console.log('tmp = ', tmp);

tmp = path.basename('/foo/bar/baz/asdf/quux.html', '.html');
tmp = 'foo/bar/baz'.split(path.sep);
*/

var tmp;

// console.log(process.env.PATH);
// console.log(process.env);
// console.log(process);
console.log('path.delimiter = ', path.delimiter);
console.log('process.env.PATH = ', process.env.PATH);
tmp = process.env.PATH.split(path.delimiter);
console.log('tmp = ', tmp);
