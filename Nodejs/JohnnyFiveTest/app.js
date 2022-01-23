#!/usr/bin/env node

const myEmitter = require('./my-emitter.js');
const _ = require('./dc-motor-l298n.js');

const G_RUN_TIME = 5 * 1000; // unit: ms

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function doDcMotorReady() {
	myEmitter.emit('carGoForward');
	await sleep(G_RUN_TIME);

	myEmitter.emit('carGoBack');
	await sleep(G_RUN_TIME);

	myEmitter.emit('carTurnLeft');
	await sleep(G_RUN_TIME);

	myEmitter.emit('carTurnRight');
	await sleep(G_RUN_TIME);

	myEmitter.emit('carStop');
	myEmitter.emit('exit');
}

myEmitter.on('dcMotorReady', doDcMotorReady);

