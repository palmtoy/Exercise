#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
  // Create a new `motor` hardware instance.
  const motor = new five.Motor({
    address: 0x60,
		controller: 'PCA9685',
		frequency: 1000, // Hz
		pins: {
			pwm: 13, // DC-Motor-1, pwm
			dir: 11, // DC-Motor-1, dir
		},
  });

  // Motor Event API

  // 'start' events fire when the motor is started.
  motor.on('start', () => {
    console.log(`start: ${Date.now()}`);
		setTimeout(() => {
			motor.stop();
		}, 6000);
  });

  // 'stop' events fire when the motor is started.
  motor.on('stop', () => {
    console.log(` stop: ${Date.now()}`);
		setTimeout(() => {
			motor.start();
		}, 2000);
  });

  // Motor API

  // start()
  // Start the motor. `isOn` property set to |true|
	console.log(new Date().toString());
  motor.start();
});

