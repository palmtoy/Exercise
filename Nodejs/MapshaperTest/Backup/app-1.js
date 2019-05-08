const mapshaper = require('mapshaper');

mapshaper.enableLogging();
mapshaper.runCommands('geoFile.json -o topoFile.json format=topojson', err => {
  if (err) {
    mapshaper.printError(err);
    process.exit(1);
  } else {
		console.log('Done.');
    process.exit(0);
  }
});

