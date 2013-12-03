var application = require('./application');
var dataPlugin = require('pomelo-data-plugin');

var createApp = function () {
  var app = application;
  app.init();
  return app;
};

var app = createApp();

// load/watch config file's data
app.use(dataPlugin, {
  watcher: {
    dir: __dirname + '/config/data',
    parseParams: {titles: 'titles', rows: 'rows'},
    interval: 3000
  }
});

//start
app.start();

// Uncaught exception handler
process.on('uncaughtException', function(err) {
  console.error(' Caught exception: ' + err.stack);
});
