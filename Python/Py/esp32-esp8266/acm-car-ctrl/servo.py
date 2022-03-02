from machine import Pin, PWM
from time import sleep

G_MIN_ANGLE = 30
G_MID_ANGLE = 50
G_MAX_ANGLE = 70

G_ANGLE_STEP = 3

class CServo:
  def __init__(self, pinNum):
    self.angle = G_MID_ANGLE
    self.pwmFrequency = 611 # unit: Hz
    self.pinPwm = PWM(Pin(pinNum), freq=self.pwmFrequency, duty=self.angle)
    self.minDuty = 300
    self.maxDuty = 1000
    self.dutyPortion = ( self.maxDuty - self.minDuty ) / G_MAX_ANGLE
    self.setDirection(self.angle)

  def calcDutyCycle(self):
    dc = int( self.minDuty + self.dutyPortion * self.angle )
    return dc

  def setDirection(self, angle):
    if angle < G_MIN_ANGLE:
      angle = G_MIN_ANGLE
    elif angle > G_MAX_ANGLE:
      angle = G_MAX_ANGLE
    self.angle = angle
    dc = self.calcDutyCycle()
    self.pinPwm.duty(dc)
    print("Angle =", self.angle, "-> Duty =", dc)
    sleep(0.3) # 消除抖动
    self.pinPwm.duty(0)

  def turnLeft(self):
    self.angle += G_ANGLE_STEP
    self.setDirection(self.angle)

  def turnRight(self):
    self.angle -= G_ANGLE_STEP
    self.setDirection(self.angle)
