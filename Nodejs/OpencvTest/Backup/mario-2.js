var cv = require('opencv');

var colorRed = [0, 0, 255];
var targetFilename = "./images/game_scene.jpg";
var templateFilename = "./images/game_mario.jpg";

cv.readImage(targetFilename, function(err, imgTarget){
	cv.readImage(templateFilename, function(err, imgTemplate){
		var TM_CCORR_NORMED = 3;
		var res = imgTarget.matchTemplateByMatrix(imgTemplate, TM_CCORR_NORMED);
		var minMax = res.minMaxLoc();
		var topLeft = minMax.maxLoc;
		console.log('topLeft =', topLeft, '\n');

		var tmpWidth = imgTemplate.width();
		var tmpHeight = imgTemplate.height();
		console.log('size = {width: %d, height: %d}', tmpWidth, tmpHeight, '\n');

		imgTarget.rectangle([topLeft.x, topLeft.y], [tmpWidth, tmpHeight], colorRed, 2);
		var outputFilename = './game_scene-rectangle.jpg';
		imgTarget.save(outputFilename);
		console.log('Image saved to ' + outputFilename);
	});
})

