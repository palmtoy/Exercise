#!/usr/bin/env node

const crypto = require('crypto');


function isDevIdInRatio (devId, ratio) {
	console.log(`_isDevIdInRatio ~ devId = ${devId}, ratio = ${ratio}`);

	const strHash = crypto.createHash('md5').update(devId).digest("hex")
	console.log(`_isDevIdInRatio ~ strHash = ${strHash}`);

	// remove the dash character ( - ), just keep last 8 chars
	const strHashPart = strHash.replace(/-/g, '').slice(-8);
	console.log(`_isDevIdInRatio ~ strHashPart = ${strHashPart}`);

	// change to decimalism
	let numHash = parseInt(strHashPart, 16);
	console.log(`_isDevIdInRatio ~ numHash = ${numHash}`);

	const modValue = numHash % 100;
	console.log(`_isDevIdInRatio ~ modValue = ${modValue}`);

	return modValue <= ratio;
};


const devId = '3CF62E32-52B2-6583-978B-25B671687516';
const ratio = Math.floor((Math.random() * 100) + 1);

const retIsIn = isDevIdInRatio(devId, ratio);
console.log(`\nretIsIn = ${retIsIn}`);

