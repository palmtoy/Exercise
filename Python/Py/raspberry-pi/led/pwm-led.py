#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time

pinLedRed = 18 # GPIO18

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) channel ]
GPIO.setmode(GPIO.BCM)
GPIO.setup(pinLedRed, GPIO.OUT)


def destroy():
  GPIO.cleanup()


def run():
  print('The red led is blinking ...')
  pwmFrequency = 500  # unit: Hz
  pwmLedRed = GPIO.PWM(pinLedRed, pwmFrequency)
  pwmLedRed.start(0)
  pwmDuty = 0
  while True:
    if pwmDuty > 100:
      break
    pwmLedRed.ChangeDutyCycle(pwmDuty)
    pwmDuty += 1
    time.sleep(0.1)


if __name__ == "__main__":
  try:
    run()
  finally:
    destroy()

