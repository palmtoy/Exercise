#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
  // Create a new `motor` hardware instance.
  const motor = new five.Motor({
    pin: 'GPIO7'
    // pin: 11  // wPi-11 ( WiringPi, `$ gpio readall` )
    // pin: 'P1-26'  // RPi physical pin-26
  });

  // Inject the `motor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    motor
  });

  // Motor Event API

  // 'start' events fire when the motor is started.
  motor.on('start', () => {
    console.log(`motor: start ~ ${Date.now()}`);
		setTimeout(() => {
			motor.stop();
		}, 2000);
  });

  // 'stop' events fire when the motor is stopped.
  motor.on('stop', () => {
    console.log(`motor:  stop ~ ${Date.now()}`);
		setTimeout(() => {
			motor.start();
		}, 2000);
  });

  console.log();
  // Motor API

  // start([speed)
  // Start the motor. `isOn` property set to |true|
  // Takes an optional parameter `speed` [0-255]
  // to define the motor speed if a PWM Pin is
  // used to connect the motor.
  motor.start();

  // stop()
  // Stop the motor. `isOn` property set to |false|
});

