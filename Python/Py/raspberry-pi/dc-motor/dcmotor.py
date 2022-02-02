import RPi.GPIO as GPIO
from time import sleep 

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) channel ]
GPIO.setmode(GPIO.BCM)


class DCMotor:
  def __init__(self, pin1, pin2):
    self.pin1 = pin1
    self.pin2 = pin2
    self.lowSpeed = 25
    self.mediumSpeed = 50
    self.highSpeed = 100
    self.pwmFrequency = 50  # unit: Hz
    GPIO.setup(self.pin1, GPIO.OUT)
    GPIO.setup(self.pin2, GPIO.OUT)
    self.pwmValue = None

  def runForward(self):
    print('Run forward with low speed ...')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(0)
    self.pwmValue = None
    GPIO.output(self.pin1, GPIO.LOW)
    GPIO.output(self.pin2, GPIO.LOW)
    sleep(0.1)
    self.pwmValue = GPIO.PWM(self.pin1, self.pwmFrequency)
    self.pwmValue.start(0)
    self.pwmValue.ChangeDutyCycle(self.lowSpeed)

  def runBackward(self):
    print('Run backward with low speed ...')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(0)
    self.pwmValue = None
    GPIO.output(self.pin1, GPIO.LOW)
    GPIO.output(self.pin2, GPIO.LOW)
    sleep(0.1)
    self.pwmValue = GPIO.PWM(self.pin2, self.pwmFrequency)
    self.pwmValue.start(0)
    self.pwmValue.ChangeDutyCycle(self.lowSpeed)

  def stop(self):
    print('Stop.')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(0)
    self.pwmValue = None
    GPIO.output(self.pin1, GPIO.LOW)
    GPIO.output(self.pin2, GPIO.LOW)

  def setLowSpeed(self):
    print('Run with low speed ...')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(self.lowSpeed)

  def setMediumSpeed(self):
    print('Run with medium speed ...')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(self.mediumSpeed)

  def setHighSpeed(self):
    print('Run with high speed ...')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(self.highSpeed)


  def cleanup(self):
    print('GPIO Clean up.')
    GPIO.cleanup()

