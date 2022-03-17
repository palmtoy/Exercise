from machine import Pin, PWM
from time import sleep

G_RUN_FORWARD = 1
G_RUN_BACKWARD = 2
G_STOP = 3

G_SPEED_STEP = 10

class DCMotor:
  def __init__(self, pin1, pin2, minDuty = 380, maxDuty = 925):
    self.pin1out = Pin(pin1, Pin.OUT, value = 0)
    self.pin2out = Pin(pin2, Pin.OUT, value = 0)
    self.pwmFrequency = 20000 # unit: Hz
    self.pin1pwm = PWM(Pin(pin1), freq = self.pwmFrequency, duty = 0)
    self.pin2pwm = PWM(Pin(pin2), freq = self.pwmFrequency, duty = 0)
    self.pin1out.value(0)
    self.pin2out.value(0)
    self.pin1pwm.duty(0)
    self.pin2pwm.duty(0)
    self.minDuty = minDuty
    self.maxDuty = maxDuty
    self.status = G_STOP

  def forward(self, speed):
    if self.status != G_RUN_FORWARD:
      self.stop()
      sleep(0.1)
    self.status = G_RUN_FORWARD
    self.speed = speed
    self.pin1out.value(0)
    self.pin2pwm.duty(self.calcDutyCycle(self.speed))
    print('Speed = %d' % self.speed)
    
  def backward(self, speed):
    if self.status != G_RUN_BACKWARD:
      self.stop()
      sleep(0.1)
    self.status = G_RUN_BACKWARD
    self.speed = speed
    self.pin1pwm.duty(self.calcDutyCycle(self.speed))
    self.pin2out.value(0)
    print('Speed = %d' % self.speed)

  def speedCtrl(self):
    if self.status == G_RUN_FORWARD or self.status == G_STOP:
      self.forward(self.speed)
    elif self.status == G_RUN_BACKWARD:
      self.backward(self.speed)
    else:
      self.stop()

  def speedUp(self):
    self.speed += G_SPEED_STEP
    self.speedCtrl()
 
  def slowDown(self):
    self.speed -= G_SPEED_STEP
    self.speedCtrl()

  def stop(self):
    self.status = G_STOP
    self.speed = 0
    self.pin1out.value(0)
    self.pin2out.value(0)
    self.pin1pwm.duty(0)
    self.pin2pwm.duty(0)
    print('Speed = %d' % self.speed)
    
  def calcDutyCycle(self, speed):
    dc = 0
    if speed <= 0:
      self.speed = 0
      self.status = G_STOP
      return dc
    elif speed > 100:
      self.speed = 100
    dc = int(self.minDuty + (self.maxDuty - self.minDuty) * (self.speed / 100))
    return dc
