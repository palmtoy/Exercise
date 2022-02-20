from machine import Pin, PWM
from time import sleep

G_MIN_ANGLE = 0
G_MAX_ANGLE = 90

class CServo:
  def __init__(self, pinNum):
    self.pwmFrequency = 611 # unit: Hz
    self.pinPwm = PWM(Pin(pinNum), freq=self.pwmFrequency)
    self.minDuty = 300
    self.maxDuty = 1000
    self.dutyPortion = ( self.maxDuty - self.minDuty ) / G_MAX_ANGLE
    self.setDirection(0)

  def setDirection(self, angle):
    dc = self.calcDutyCycle(angle)
    self.pinPwm.duty(dc)
    print("Angle=", angle, "-> Duty=", dc)
    # 消除抖动
    sleep(0.3)
    self.pinPwm.duty(0)

  def calcDutyCycle(self, angle):
    if angle < G_MIN_ANGLE:
      angle = G_MIN_ANGLE
    elif angle > G_MAX_ANGLE:
      angle = G_MAX_ANGLE
    dc = int( self.minDuty + self.dutyPortion * angle )
    return dc
