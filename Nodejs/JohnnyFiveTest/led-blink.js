#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	const ledObj = new five.Led('GPIO7');
  // "blink" the Led in 500ms on-off phase periods
  ledObj.blink(500);
});

