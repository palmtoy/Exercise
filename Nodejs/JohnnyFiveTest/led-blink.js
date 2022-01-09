#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
  // const ledObj = new five.Led('GPIO7');
  // const ledObj = new five.Led({ pin: 'GPIO7' });
  // const ledObj = new five.Led(11); // wPi-11 ( WiringPi, `$ gpio readall` )
  const ledObj = new five.Led('P1-26'); // RPi physical pin-26
  // "blink" the Led in 500ms on-off phase periods
  ledObj.blink(500);
});

