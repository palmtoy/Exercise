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
  i = 0
  while True:
    if i >= 3:
      break
    # GPIO.output(pinLedRed, GPIO.HIGH)
    # GPIO.output(pinLedRed, True)
    time.sleep(0.5)
    GPIO.output(pinLedRed, 1)
    time.sleep(0.5)
    # GPIO.output(pinLedRed, GPIO.LOW)
    # GPIO.output(pinLedRed, False)
    GPIO.output(pinLedRed, 0)
    i += 1


if __name__ == "__main__":
  try:
    run()
  finally:
    destroy()

