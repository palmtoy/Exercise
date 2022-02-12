from machine import Pin, Signal
import time


# 指明 GPIO2 管脚
pinObj = Pin(2, Pin.OUT)
led = Signal(pinObj, invert=True)

# 循环执行
while True:
  # pinObj.off()  # 点亮 LED
  led.on()
  time.sleep(1)  # 等待 x 秒
  # pinObj.on()  # 熄灭 LED
  led.off()
  time.sleep(1)  # 等待 x 秒

