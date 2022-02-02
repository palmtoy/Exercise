#!/usr/bin/env python3
# REF: https://www.electronicshub.org

from dcmotor import DCMotor

dcMotorA = DCMotor(9, 10)  # GPIO9, GPIO10

def printCmdTips():
    print('\nPlease enter the following cmd to continue ↓')
    print('f: Run forward, b: Run backward, l: low speed, m: medium speed, h: high speed, s: stop\n')

def go():
    printCmdTips()
    while True:
        x = input()
        try:
            if x == 'f':
                dcMotorA.runForward()
            elif x == 'b':
                dcMotorA.runBackward()
            elif x == 's':
                dcMotorA.stop()
            elif x == 'l':
                dcMotorA.setLowSpeed()
            elif x == 'm':
                dcMotorA.setMediumSpeed()
            elif x == 'h':
                dcMotorA.setHighSpeed()
            else:
                printCmdTips()
        except Exception as e:
            print('Error:', e)

if __name__ == "__main__":
    try:
        go()
    finally:
        dcMotorA.cleanup()

