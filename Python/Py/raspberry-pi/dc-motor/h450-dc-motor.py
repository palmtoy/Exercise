#!/usr/bin/env python3
# REF: https://www.electronicshub.org

from dcmotor import DCMotor

G_LOW_SPEED = 4
G_MEDIUM_SPEED = 7
G_HIGH_SPEED = 10

dcMotorA = DCMotor(17, 27)  # GPIO17, GPIO27

def printCmdTips():
    print('\nPlease enter the following cmd to continue ↓')
    print('f: Run forward, b: Run backward, h: High speed, s: Stop\n')

def go():
    printCmdTips()
    while True:
        x = input()
        try:
            if x == 'f':
                dcMotorA.runForward(G_MEDIUM_SPEED)
            elif x == 'b':
                dcMotorA.runBackward(G_LOW_SPEED)
            elif x == 'h':
                dcMotorA.runForward(G_HIGH_SPEED)
            elif x == 's':
                dcMotorA.stop()
            else:
                printCmdTips()
        except Exception as e:
            print('Error:', e)

if __name__ == "__main__":
    try:
        go()
    finally:
        dcMotorA.cleanup()

