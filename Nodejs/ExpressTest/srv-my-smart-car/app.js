#!/usr/bin/env node

const myEmitter = require('./controllers/my-emitter.js');
const _ = require('./controllers/dc-motor-l298n.js');

const express = require('express');
const cors = require('cors')

let G_MOTOR_READY = false;

const app = express();
app.use(cors());

const port = 9527;
app.listen(port, () => {
	console.log(`My smart car server is running on port ${port} ...`);
});


async function handleDcMotorEvt(req, res) {
	const evt = req.url.split('/')[1];
	const msg = `${evt} ~ ` + new Date().toString();
	res.json(msg);

	if (!G_MOTOR_READY) {
		console.log(`${new Date().toString()} ~ DC Motors are NOT ready now.`);
		return;
	}

	console.log(msg);
	myEmitter.emit(evt);
}

app.post('/carGoForward', async (req, res) => {
	await handleDcMotorEvt(req, res);
});


app.post('/carGoBack', async (req, res) => {
	await handleDcMotorEvt(req, res);
});


app.post('/carTurnLeft', async (req, res) => {
	await handleDcMotorEvt(req, res);
});


app.post('/carTurnRight', async (req, res) => {
	await handleDcMotorEvt(req, res);
});


app.post('/carStop', async (req, res) => {
	await handleDcMotorEvt(req, res);
});


myEmitter.on('dcMotorReady', () => {
	G_MOTOR_READY = true;
	myEmitter.emit('carStop');
});

