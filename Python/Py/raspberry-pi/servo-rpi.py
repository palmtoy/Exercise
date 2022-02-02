#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time

pin_servo = 26 # GPIO26

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) channel ]
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin_servo, GPIO.OUT)
pwm_servo = GPIO.PWM(pin_servo, 50)  # frequency: 50Hz
pwm_servo.start(0)


def destroy():
    pwm_servo.stop()
    GPIO.cleanup()


# 输入( 0 ～ 180 )度即可
# 不要超过180度
def setDirection(angle):
    # 0 = 停止转动; 2 = 0度; 7 = 90度; 12 = 180度
    duty = 2 + (angle / 18)
    pwm_servo.ChangeDutyCycle(duty)
    # 消除抖动
    time.sleep(0.3)
    pwm_servo.ChangeDutyCycle(0)
    print("角度=", angle, "-> duty=", duty)


def run():
    for angle in range(0, 180, 10):
        setDirection(angle)
        time.sleep(1)
    for angle in range(180, -10, -10):
        setDirection(angle)
        time.sleep(1)


if __name__ == "__main__":
    try:
        run()
    finally:
        destroy()

