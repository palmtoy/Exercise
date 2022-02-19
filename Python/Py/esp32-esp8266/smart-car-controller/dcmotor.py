class DCMotor:
  def __init__(self, pin1, pin2, enablePin, minDuty=350, maxDuty=1023):
    self.pin1 = pin1
    self.pin2 = pin2
    self.enablePin = enablePin
    self.minDuty = minDuty
    self.maxDuty = maxDuty

  def forward(self, speed):
    self.speed = speed
    self.enablePin.duty(self.calcDutyCycle(self.speed))
    self.pin1.value(1)
    self.pin2.value(0)
    
  def backward(self, speed):
    self.speed = speed
    self.enablePin.duty(self.calcDutyCycle(self.speed))
    self.pin1.value(0)
    self.pin2.value(1)

  def stop(self):
    self.enablePin.duty(0)
    self.pin1.value(0)
    self.pin2.value(0)
    
  def calcDutyCycle(self, speed):
    dc = 0
    if self.speed <= 0 or self.speed > 100:
      dc = 0
    else:
      dc = int(self.minDuty + (self.maxDuty - self.minDuty) * ((self.speed - 1) / (100 - 1)))
    return dc
