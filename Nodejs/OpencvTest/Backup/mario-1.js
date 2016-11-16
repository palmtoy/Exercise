var cv = require('opencv');
var targetFilename = "./images/game_scene.jpg";
var templateFilename = "./images/game_mario.jpg";

cv.readImage(targetFilename, function(err, target){
	cv.readImage(templateFilename, function(err, template){
		var TM_CCORR_NORMED = 3;
		var res = target.matchTemplateByMatrix(template, TM_CCORR_NORMED);
		var minMax = res.minMaxLoc();
		var topLeft = minMax.maxLoc;
		console.log('AAA: topLeft =', topLeft);

		target.canny(5, 300);
		template.canny(5, 300);
		res = target.matchTemplateByMatrix(template, TM_CCORR_NORMED);
		minMax = res.minMaxLoc();
		topLeft = minMax.maxLoc;
		console.log('BBB: topLeft =', topLeft);
	});
})

