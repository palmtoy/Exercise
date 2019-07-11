const util = require('util');
const mapshaper = require('mapshaper');

const runCommands = util.promisify(mapshaper.runCommands);

async function doRunCmd(cmd) {
	await runCommands(cmd).then(() => {
			console.log('Done.');
	}).catch((error) => {
			mapshaper.printError(error);
	});
}

mapshaper.enableLogging();


const cmd = 'topoFile.json -o geoFile.json format=geojson combine-layers';
doRunCmd(cmd);

