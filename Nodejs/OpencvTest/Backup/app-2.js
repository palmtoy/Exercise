/*
	1) put the picture 'mona.jpg(Mona Lisa)' at Downloads folder
	2) node app.js
	3) open mona_face.jpg at Downloads folder
*/

var cv = require('opencv');

var dlDir = process.env.HOME + '/Downloads/';

cv.readImage(dlDir + 'mona.jpg', function(err, im){
	im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
		for (var i = 0; i < faces.length; i++){
			var x = faces[i]
			im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
		}

		var monaFace = dlDir + 'mona_face.jpg';
		im.save(monaFace);
		console.log('Mona face picture has been saved to ' + monaFace + '.');
	});
})

