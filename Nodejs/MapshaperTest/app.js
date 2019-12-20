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


const cmd = 'geoFile.json -o topoFile.json format=topojson';
doRunCmd(cmd);

