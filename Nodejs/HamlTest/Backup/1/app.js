#!/usr/bin/env node

var haml = require('haml');
var fs = require('fs');


fs.readFile('./tpl_index.haml', function(err, tmpData) {
	var htmlData = haml.compile(tmpData.toString());
	fs.writeFileSync('./index.html', htmlData);
});

