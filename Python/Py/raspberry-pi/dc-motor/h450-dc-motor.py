#!/usr/bin/env python3
# REF: https://www.electronicshub.org

from dcmotor import DCMotor

G_LOW_SPEED = 25
G_MEDIUM_SPEED = 50
G_HIGH_SPEED = 100

dcMotorA = DCMotor(9, 10)  # GPIO9, GPIO10
dcMotorB = DCMotor(17, 27)  # GPIO17, GPIO27

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
                dcMotorB.runBackward(G_LOW_SPEED)
            elif x == 'b':
                dcMotorA.runBackward(G_LOW_SPEED)
                dcMotorB.runForward(G_MEDIUM_SPEED)
            elif x == 's':
                dcMotorA.stop()
                dcMotorB.stop()
            elif x == 'h':
                dcMotorA.runForward(G_HIGH_SPEED)
                dcMotorB.runBackward(G_LOW_SPEED)
            else:
                printCmdTips()
        except Exception as e:
            print('Error:', e)

if __name__ == "__main__":
    try:
        go()
    finally:
        dcMotorA.cleanup()

