from machine import Pin, PWM
from time import sleep

G_MIN_ANGLE = 43
G_MID_ANGLE = 67
G_MAX_ANGLE = 89

G_MIN_VIRTUAL_ANGLE = 0
G_MID_VIRTUAL_ANGLE = 50
G_MAX_VIRTUAL_ANGLE = 100

G_ANGLE_STEP = 2

class CServo:
  def __init__(self, pinNum):
    self.angle = G_MID_ANGLE
    # self.pwmFrequency = 611 # unit: Hz
    self.pwmFrequency = 700 # unit: Hz
    self.pinPwm = PWM(Pin(pinNum), freq=self.pwmFrequency, duty=self.angle)
    self.minDuty = 1
    self.maxDuty = 1022
    self.dutyPortion = ( self.maxDuty - self.minDuty ) / G_MAX_ANGLE
    sleep(0.3)
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

  def carDirection(self, virtualAngle):
    virtualAngle = int( virtualAngle )
    tmpAngle = G_MIN_ANGLE
    if (virtualAngle >= G_MID_VIRTUAL_ANGLE):
      virtualAngle -= G_MID_VIRTUAL_ANGLE
      tmpAngle = int( G_MID_ANGLE + ( G_MAX_ANGLE - G_MID_ANGLE ) * virtualAngle / G_MID_VIRTUAL_ANGLE )
    else:
      tmpAngle = int( G_MIN_ANGLE + ( G_MID_ANGLE - G_MIN_ANGLE ) * virtualAngle / G_MID_VIRTUAL_ANGLE )
    self.setDirection(tmpAngle)

  def turnLeft(self):
    self.angle -= G_ANGLE_STEP
    self.setDirection(self.angle)

  def turnRight(self):
    self.angle += G_ANGLE_STEP
    self.setDirection(self.angle)
