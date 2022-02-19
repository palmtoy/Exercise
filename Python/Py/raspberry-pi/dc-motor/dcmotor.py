import RPi.GPIO as GPIO
from time import sleep 

# Use GPIO numbers not pin numbers [ BCM : Broadcom SOC ( System on Chip ) channel ]
GPIO.setmode(GPIO.BCM)

G_MIN_SPEED = 1;
G_MAX_SPEED = 100;


class DCMotor:
  def __init__(self, pin1, pin2):
    self.pin1 = pin1
    self.pin2 = pin2
    self.pwmFrequency = 500  # unit: Hz
    GPIO.setup(self.pin1, GPIO.OUT)
    GPIO.setup(self.pin2, GPIO.OUT)
    self.pwmValue = None

  def isValidSpeed(self, pSpeed):
    b = pSpeed >= 1 and pSpeed <= 100
    if not b:
        print(pSpeed, 'is Not a valid speed value, please try again.')
    return b

  def runForward(self, pSpeed):
    if not self.isValidSpeed(pSpeed):
        return
    print('Run forward with speed', str(pSpeed) + '.')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(0)
    self.pwmValue = None
    GPIO.output(self.pin1, GPIO.LOW)
    GPIO.output(self.pin2, GPIO.LOW)
    sleep(0.1)
    self.pwmValue = GPIO.PWM(self.pin2, self.pwmFrequency)
    self.pwmValue.start(0)
    self.pwmValue.ChangeDutyCycle(pSpeed)

  def runBackward(self, pSpeed):
    if not self.isValidSpeed(pSpeed):
        return
    print('Run backward with speed', str(pSpeed) + '.')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(0)
    self.pwmValue = None
    GPIO.output(self.pin1, GPIO.LOW)
    GPIO.output(self.pin2, GPIO.LOW)
    sleep(0.1)
    self.pwmValue = GPIO.PWM(self.pin1, self.pwmFrequency)
    self.pwmValue.start(0)
    self.pwmValue.ChangeDutyCycle(pSpeed)

  def stop(self):
    print('Stop.')
    if self.pwmValue != None:
        self.pwmValue.ChangeDutyCycle(0)
    self.pwmValue = None
    GPIO.output(self.pin1, GPIO.LOW)
    GPIO.output(self.pin2, GPIO.LOW)

  def cleanup(self):
    print('GPIO Clean up.')
    GPIO.cleanup()

