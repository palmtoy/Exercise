/*
node app.js --env=dev (default)
node app.js --env=prod
*/

var logger = require('pomelo-logger').getLogger('bearcat', 'app');
var Bearcat = require('bearcat');

var contextPath = require.resolve('./app/context.json');

var bearcat = Bearcat.createApp([contextPath]);

bearcat.start(function() {
  var car = bearcat.getBean('car'); // get bean
  car.runBefore(function(){}); // call the method
});

// Uncaught exception handler
process.on('uncaughtException', function(e) {
	logger.error('Caught exception: ' + e.stack);
});
