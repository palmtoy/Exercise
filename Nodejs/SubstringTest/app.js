var os = require('os');

var hostname = os.hostname();
// var hostname = 'admin.st.uvw.zyz';
var hostname = 'admin.prod.uvw.zyz';
console.log('hostname =', hostname);

var idx4st = hostname.indexOf('admin.st');
console.log('idx4st =', idx4st);
var idx4prod = hostname.indexOf('admin.prod');
console.log('idx4prod =', idx4prod);

if(idx4st > -1) {
	console.log('Staging env ...');
} else if(idx4prod > -1) {
	console.log('Production env ...');
}

