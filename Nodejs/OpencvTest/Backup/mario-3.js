var cv = require('opencv');

var colorDict = [
		[0, 255, 0], // green
		[255, 0, 0], // blue
		[0, 0, 255] // red
	];
var targetFilename = './images/game_scene.jpg';
var templateFileList = [
		'./images/game_mario.jpg',
		'./images/game_coin.jpg',
		'./images/game_block.jpg'
	];

cv.readImage(targetFilename, function(err, imgTarget){

	function _doDetect(j) {
		var templateFilename = templateFileList[j];
		cv.readImage(templateFilename, function(err, imgTemplate){
			var TM_CCORR_NORMED = 3;
			var res = imgTarget.matchTemplateByMatrix(imgTemplate, TM_CCORR_NORMED);
			var minMax = res.minMaxLoc();
			var topLeft = minMax.maxLoc;
			console.log('%d: topLeft = %j', i, topLeft, '\n');

			var tmpWidth = imgTemplate.width();
			var tmpHeight = imgTemplate.height();
			console.log('%d: size = {width: %d, height: %d}', i, tmpWidth, tmpHeight, '\n');

			imgTarget.rectangle([topLeft.x, topLeft.y], [tmpWidth, tmpHeight], colorDict[j], 2);
		});
	}

	var len = templateFileList.length;

	for(var i = 0; i < len; i++) {
		_doDetect(i);
	}

	setTimeout(function() {
		var outputFilename = './game_scene-rectangle.jpg';
		imgTarget.save(outputFilename);
		console.log('Image saved to ' + outputFilename);
	}, 2000);
});

