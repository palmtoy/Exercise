var cv = require('opencv'),
	async = require('async');


var targetFilename = './images/game_scene.jpg';
var templateList = [
		{idx: 1, img: './images/game_mario.jpg', color: [0, 255, 0]}, // green
		{idx: 2, img: './images/game_coin.jpg', color: [255, 0, 0]}, // blue
		{idx: 3, img: './images/game_block.jpg', color: [0, 0, 255]}, // red
	];

cv.readImage(targetFilename, function(err, imgTarget){
	async.each(templateList, function(tObj, cb) {
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
			cb();
		});
	}, function(err) {
		var outputFilename = './game_scene-rectangle.jpg';
		imgTarget.save(outputFilename);
		console.log('Image saved to ' + outputFilename);
	});

});

