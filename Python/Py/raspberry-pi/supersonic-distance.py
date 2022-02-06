#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time


pinTrig = 17 # GPIO17
pinEcho = 27 # GPIO27

pinLedRed = 18 # GPIO18

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) Channel ]
GPIO.setmode(GPIO.BCM)
GPIO.setup(pinTrig, GPIO.OUT)  # 对应触发超声波发射的引脚, 高电平时发射 8个 40K Hz的超声波; pinEcho 输出高电平 ( GPIO.HIGH )
GPIO.setup(pinEcho, GPIO.IN)  # 对应超声波接收检测的引脚, 当接收到返回的超声波时输出低电平 ( GPIO.LOW )

GPIO.setup(pinLedRed, GPIO.OUT)


# Trig 负责发射超声波
def sendTriggerPulse():
  # 发射超声波
  GPIO.output(pinTrig, GPIO.HIGH)
  # 给 pinTrig 输入一个长为 15us 的高电平方波来触发超声波发射
  time.sleep(0.000015)
  # 停止发射超声波
  GPIO.output(pinTrig, GPIO.LOW)

# Echo 负责接收超声波
def waitForEcho(value, timeoutCnt):
  # 持续获取 Echo 的状态
  while GPIO.input(pinEcho) != value and timeoutCnt > 0:
    timeoutCnt -= 1
    # if value == GPIO.HIGH:
    #   print('timeoutCnt = %d' % timeoutCnt)
    pass


# calc distance
def calcDistance():
  echoTimeoutCnt = 10000
  # 发射超声波, pinEcho 输出高电平
  sendTriggerPulse()
  waitForEcho(GPIO.HIGH, echoTimeoutCnt)
  startTime = time.time()  # pinEcho 输出高电平 (即: pinTrig 发出超声波的那一刻) 时开时计时
  # 接收到返回的超声波, pinEcho 输出低电平
  waitForEcho(GPIO.LOW, echoTimeoutCnt)
  finishTime = time.time()  # pinEcho 输出低电平 (即: pinEcho 接收超声波的那一刻) 时停止计时
  echoInterval = finishTime - startTime
  cmDistance = echoInterval * 340 * 100 / 2  # unit: cm; 声速: 340m/s
  print('startTime = %f, finishTime = %f, echoInterval = %f, cmDistance = %.1f(cm)' % (startTime, finishTime, echoInterval, cmDistance))
  return cmDistance


def cleanup():
  GPIO.cleanup()
  print('\n', time.asctime( time.localtime(time.time()) ), '\nBye ~')


def run():
  try:
    while True:
      distance = calcDistance()
      if distance <= 20:  # unit: cm
        GPIO.output(pinLedRed, GPIO.HIGH)  # 亮
      else:
        GPIO.output(pinLedRed, GPIO.LOW)  # 灭
      time.sleep(0.5)
  except KeyboardInterrupt:
      pass


if __name__ == "__main__":
  try:
    run()
  finally:
    cleanup()

