from machine import Pin, PWM
from time import sleep

class DCMotor:
  def __init__(self, pin1, pin2, minDuty = 256, maxDuty = 566):
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

  def forward(self, speed):
    self.stop()
    sleep(0.1)
    self.speed = speed
    self.pin1pwm.duty(self.calcDutyCycle(self.speed))
    self.pin2out.value(0)
    
  def backward(self, speed):
    self.stop()
    sleep(0.1)
    self.speed = speed
    self.pin1out.value(0)
    self.pin2pwm.duty(self.calcDutyCycle(self.speed))
 
  def stop(self):
    self.pin1out.value(0)
    self.pin2out.value(0)
    self.pin1pwm.duty(0)
    self.pin2pwm.duty(0)
    
  def calcDutyCycle(self, speed):
    dc = 0
    if self.speed <= 0 or self.speed > 100:
      dc = 0
    else:
      dc = int(self.minDuty + (self.maxDuty - self.minDuty) * ((self.speed - 1) / (100 - 1)))
    return dc
