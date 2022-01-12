#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
  // Create a standard `led` component
  // on a valid pwm pin
  // const ledObj = new five.Led('GPIO7');
  // const ledObj = new five.Led({ pin: 'GPIO7' });
  // const ledObj = new five.Led(11); // wPi-11 ( WiringPi, `$ gpio readall` )
  const ledObj = new five.Led('P1-26'); // RPi physical pin-26

  ledObj.pulse(1500);

  // Stop and turn off the led pulse loop after some millisecond (unit: ms)
  board.wait(600 * 1000, () => {
    // stop() terminates the interval, off() shuts the led off
    ledObj.stop().off();
  });
});

