#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time


pinTrig = 17 # GPIO17
pinEcho = 27 # GPIO27

pinLedRed = 18 # GPIO18

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) Channel ]
GPIO.setmode(GPIO.BCM)
GPIO.setup(pinTrig, GPIO.OUT)  # 超声波发送引脚, 高电平时发出 40K Hz 的超声波
GPIO.setup(pinEcho, GPIO.IN)  # 超声波接收检测引脚, 当接收到返回的超声波时输出高电平

GPIO.setup(pinLedRed, GPIO.OUT)


# Trig 负责发射超声波
def sendTriggerPulse():
  # 发射超声波
  GPIO.output(pinTrig, GPIO.HIGH)
  # 保持 15us 的超声波发射, 避免能量太低无法返回
  time.sleep(0.000015)
  # 停止发射超声波
  GPIO.output(pinTrig, GPIO.LOW)

# Echo 负责接收超声波
def waitForEcho(value, timeoutCnt):
  # 持续获取 Echo 的状态
  while GPIO.input(pinEcho) != value and timeoutCnt > 0:
    timeoutCnt -= 1
    pass


# calc distance
def calcDistance():
  echoTimeoutCnt = 10000
  # 发射
  sendTriggerPulse()
  # 尝试接收超声波 ( 高电平 )
  waitForEcho(GPIO.HIGH, echoTimeoutCnt)
  startTime = time.time()  # 发现高电平 (即: 接收超声波的那一刻) 时开时计时
  # 尝试接收低电平
  waitForEcho(GPIO.LOW, echoTimeoutCnt)
  finishTime = time.time()  # 发现低电平 (即: 不再能接收超声波的那一刻) 时停止计时
  echoInterval = finishTime - startTime
  cmDistance = echoInterval * 340 * 100 / 2  # unit: cm; 声速: 340m/s
  print('startTime = %f, finishTime = %f, echoInterval = %f, cmDistance = %.1f(cm)' % (startTime, finishTime, echoInterval, cmDistance))
  return cmDistance


def cleanup():
  GPIO.cleanup()


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
      print('\n', time.asctime( time.localtime(time.time()) ), '\nBye ~')


if __name__ == "__main__":
  try:
    run()
  finally:
    cleanup()

