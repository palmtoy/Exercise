#!/usr/bin/env python3
# REF: https://www.electronicshub.org

import RPi.GPIO as GPIO

GPIO.setwarnings(False)

in1 = 9 # GPIO9
in2 = 10 # GPIO10

lowSpeed = 25
mediumSpeed = 50
highSpeed = 100
pwmFrequency = 50  # unit: Hz
pwmValue = None

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) channel ]
GPIO.setmode(GPIO.BCM)
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)

pwmValue = GPIO.PWM(in1, pwmFrequency)
pwmValue.start(0)
pwmValue.ChangeDutyCycle(0)
GPIO.output(in2, GPIO.LOW)

print('Please enter the following cmd to continue ↓')
print('f: Run forward, b: Run backward, l: low speed, m: medium speed, h: high speed, s: stop, e: exit')
print('\n')

while(1):
    x = input()
    if x == 'f':
        print('Run forward with low speed ...')
        if pwmValue != None:
            pwmValue.ChangeDutyCycle(0)
        pwmValue = None
        GPIO.output(in1, GPIO.LOW)
        GPIO.output(in2, GPIO.LOW)
        pwmValue = GPIO.PWM(in1, pwmFrequency)
        pwmValue.start(0)
        pwmValue.ChangeDutyCycle(lowSpeed)
    elif x == 'b':
        print('Run backward with low speed ...')
        if pwmValue != None:
            pwmValue.ChangeDutyCycle(0)
        pwmValue = None
        GPIO.output(in1, GPIO.LOW)
        GPIO.output(in2, GPIO.LOW)
        pwmValue = GPIO.PWM(in2, pwmFrequency)
        pwmValue.start(0)
        pwmValue.ChangeDutyCycle(lowSpeed)
    elif x == 's':
        print('Stop.')
        if pwmValue != None:
            pwmValue.ChangeDutyCycle(0)
        pwmValue = None
        GPIO.output(in1, GPIO.LOW)
        GPIO.output(in2, GPIO.LOW)
    elif x == 'l':
        print('Run with low speed ...')
        if pwmValue != None:
            pwmValue.ChangeDutyCycle(lowSpeed)
    elif x == 'm':
        print('Run with medium speed ...')
        if pwmValue != None:
            pwmValue.ChangeDutyCycle(mediumSpeed)
    elif x == 'h':
        print('Run with high speed ...')
        if pwmValue != None:
            pwmValue.ChangeDutyCycle(highSpeed)
    elif x == 'e':
        GPIO.cleanup()
        print('GPIO Clean up.')
        break
    else:
        print('<<<  Wrong data  >>>')
        print('Please enter the defined data to continue.')

