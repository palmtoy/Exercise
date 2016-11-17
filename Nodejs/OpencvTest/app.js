var cv = require('opencv');

cv.readImage("./images/car.jpg", function(err, img){
  if (err) throw err;
  if (img.width() < 1 || img.height() < 1) throw new Error('Image has no size');

  img.detectObject("./data/hogcascade_cars_sideview.xml", {}, function(err, cars){
    if (err) throw err;

    for (var i = 0; i < cars.length; i++) {
      var c = cars[i];
      img.rectangle([c.x, c.y], [c.width, c.height]);
    }

		var tmpJpg = './tmp/cardetection.jpg';
    img.save(tmpJpg);
    console.log('Image saved to ' + tmpJpg);
  });
});

