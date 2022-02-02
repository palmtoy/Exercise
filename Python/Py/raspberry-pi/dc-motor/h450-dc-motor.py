#!/usr/bin/env python3
# REF: https://www.electronicshub.org

from dcmotor import DCMotor
from time import sleep 

dcMotorA = DCMotor(9, 10)  # GPIO9, GPIO10

def go():
    dcMotorA.runForward()
    sleep(3)
    dcMotorA.setMediumSpeed()
    sleep(3)
    dcMotorA.stop()
    sleep(1)
    dcMotorA.runBackward()
    sleep(3)
    dcMotorA.setHighSpeed()
    sleep(3)
    dcMotorA.setLowSpeed()
    sleep(3)

if __name__ == "__main__":
    try:
        go()
    finally:
        dcMotorA.cleanup()

