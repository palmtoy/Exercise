var cv = require('opencv');

var dlDir = process.env.HOME + '/Downloads/';

cv.readImage(dlDir + 'car.jpg', function(err, imgCar){
	cv.readImage(dlDir + 'car_head.jpg', function(err, imgCarHead){
		var res = cv.matchTemplate(imgCar, imgCarHead, cv.TM_CCOEFF_NORMED);
		var mnLoc = cv.minMaxLoc(res);
		console.log('mnLoc =', mnLoc);


		/*
		threshold = 0.8
		loc = np.where( res >= threshold)
		for pt in zip(*loc[::-1]):
				cv2.rectangle(img_rgb, pt, (pt[0] + w, pt[1] + h), (0,0,255), 2)

			cv2.imwrite('res.png',img_rgb)
		*/

	});
});

