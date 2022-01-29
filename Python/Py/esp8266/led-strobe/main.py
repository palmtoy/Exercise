import machine
import time


# 指明 GPIO2 管脚
pin = machine.Pin(2, machine.Pin.OUT)

# 循环执行
while True:
  time.sleep(1)   # 等待 x 秒
  pin.off()       # 切换 LED 状
  time.sleep(1)   # 等待 y 秒
  pin.on()        # 控制 LED 状态
