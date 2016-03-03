var nameRegexInv = new RegExp("((?=[\x20-\x7e]+)[^A-Za-z0-9-_])");

var name = ' !@#$%^&*()+|~[];\',./{}:\"<>?aZ09€£¥₩-_';

for(var i = 0; i < name.length; i++) {
	var ret = nameRegexInv.test(name[i]);
	console.log(name[i], ' : ', ret);
	console.log('-----------------------------------------\n');
}

