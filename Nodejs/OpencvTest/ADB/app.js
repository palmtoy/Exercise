#!/usr/bin/env node

var cv = require('opencv'),
	async = require('async');


var targetFilename = './images/myscreen-resized.png';
var templateList = [
		{idx: 1, img: './images/ggplay.png', color: [255, 0, 0]}, // blue
	];


cv.readImage(targetFilename, function(err, imgTarget){

	async.each(templateList, function(tObj, next) {
		cv.readImage(tObj.img, function(err, imgTemplate){
			var TM_CCORR_NORMED = 3;
			var res = imgTarget.matchTemplateByMatrix(imgTemplate, TM_CCORR_NORMED);
			var minMax = res.minMaxLoc();
			var topLeft = minMax.maxLoc;
			console.log('%d: topLeft = %j', tObj.idx, topLeft);

			var tmpWidth = imgTemplate.width();
			var tmpHeight = imgTemplate.height();
			console.log('%d: size = {width: %d, height: %d}', tObj.idx, tmpWidth, tmpHeight, '\n');

			var LINE_WIDTH = 2;
			imgTarget.rectangle([topLeft.x, topLeft.y], [tmpWidth, tmpHeight], tObj.color, LINE_WIDTH);
			return next();
		});
	}, function(err) {
		var outputFilename = './images/rect-myscreen.png';
		imgTarget.save(outputFilename);
		console.log('Image saved to ' + outputFilename);
	});

});

