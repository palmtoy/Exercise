'use strict';

var uglifyJS = require('uglify-js');

//代码压缩
var result = uglifyJS.minify("var b = function () {};", {fromString: true});
console.log("\n===========================");
console.log(result);

//文件压缩
result = uglifyJS.minify(["demo.js"]);
console.log("\n===========================");
console.log(result.code);

//多文件压缩，指定source map和网站来源
result = uglifyJS.minify(["main.js","demo.js"],{
	outSourceMap: "out.js.map",
	mangle:true
});
console.log("\n===========================");
console.log(result.code);
console.log(result.map);

