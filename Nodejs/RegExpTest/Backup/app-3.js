var nameRegexInv = new RegExp("((?=[\x20-\xff]+)[^A-Za-z0-9-_])|(?=[\u2016-\u29FB]+)");

var name = ' !@#$%^&*()+|~[];\',./{}:\"<>?£¥₩€aZ09-_';

for(var i = 0; i < name.length; i++) {
	var ret = nameRegexInv.test(name[i]);
	console.log(name[i], name.charCodeAt(i), ' : ', ret);
	console.log('-----------------------------------------\n');
}

