/*
	unit: Megabyte (exp: 4096M = 4G)
	node --max_old_space_size=4096 app.js
	node --max-old-space-size=4096 app.js
*/

var oneK = 1024;
var oneM = oneK * oneK;

var myL = new Array();

function _pushD() {
	var d = new Date()
		, myStr = '';
	for(var i = 0; i < oneM; i++) {
		myStr += d;
	}
	myL.push(myStr);
	console.log('\n' + Date() + ' ~ myL.length = %d', myL.length);
}

setInterval(function() {
	_pushD();

	var tmpM = process.memoryUsage();
	for(var k in tmpM) {
		tmpM[k] = Math.floor(tmpM[k] / oneM) + ' M';
	}
	console.log('tmpM = %j', tmpM);
}, 1000);

