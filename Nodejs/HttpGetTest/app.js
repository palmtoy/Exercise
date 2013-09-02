var http = require('http');
var resStr = '';

http.get("http://123.58.180.180:8080/messageTestProduct/login/index?account=palmtoy", function(res) {
	res.on('data', function(d) {
		console.log(Date());
		resStr += d.toString();
		console.log('data : ', d.toString());
	});

	res.on('end', function() {
		var obj = {};
		var resList = resStr.split('&');
		console.log("resList = ", resList);
		resList.forEach(function(element, index, array) {
			console.log("a[" + index + "] = " + element);
			var tmpIdx = element.indexOf('=');
			console.log("tmpIdx = ", tmpIdx);
			if (tmpIdx > -1) {
				var k = element.substring(0, tmpIdx);			
				var v = element.substring(tmpIdx+1);			
				if (k === 'expire_time') {
					v = parseInt(v, null);	
				}
				obj[k] = v;
			}
		});
		console.log('obj = ', JSON.stringify(obj));
		resStr = '';
	});

}).on('error', function(e) {
	console.log("Got error: " + e.message);
});

