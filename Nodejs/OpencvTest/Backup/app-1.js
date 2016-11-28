var cv = require('opencv');

/*
	1) put the picture 'mona.jpg(Mona Lisa)' at Downloads folder
	2) node app.js
	3) open out.jpg at Downloads folder
*/

var dlDir = process.env.HOME + '/Downloads/';

cv.readImage(dlDir + 'mona.jpg', function(err, im){
	im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
		for (var i = 0; i < faces.length; i++){
			var x = faces[i]
			im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
		}

		im.save(dlDir + 'out.jpg');
	});
})

