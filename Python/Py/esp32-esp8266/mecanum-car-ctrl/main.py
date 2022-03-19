try:
  import usocket as socket
except:
  import socket
import gc
from time import sleep
from machine import Pin, Signal
from dcmotor import CDcMotor
from genweb import CGenWeb

G_GC_THRESHOLD = 204800 # unit: byte, 200KiB
G_CMD_IDX = 6

G_FORWARD_SPEED = 60
G_TURN_SPEED = 50
G_BACKWARD_SPEED = 50


def main():
    gc.collect()

    genWebObj = CGenWeb()

    ledLight = Signal(Pin(2, Pin.OUT), invert = False) # GPIO2 ( P2 )
    sleep(0.1)
    ledLight.on()

    dcMotorLT = CDcMotor(15, 4) # GPIO15 ( P15 ), GPIO4 ( P4 )
    sleep(0.1)
    dcMotorLT.stop()

    dcMotorLB = CDcMotor(16, 17) # GPIO16 ( P16 ), GPIO17 ( P17 )
    sleep(0.1)
    dcMotorLB.stop()

    dcMotorRT = CDcMotor(5, 18) # GPIO5 ( P5 ), # GPIO18 ( P18 )
    sleep(0.1)
    dcMotorRT.stop()

    dcMotorRB = CDcMotor(19, 23) # GPIO19 ( P19 ), GPIO23 ( P23 )
    sleep(0.1)
    dcMotorRB.stop()

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('', 80))
    sock.listen(2)
    while True:
        try:
            if gc.mem_free() < G_GC_THRESHOLD:
                gc.collect()
            conn, addr = sock.accept()
            conn.settimeout(3.0)
            print('Received HTTP GET connection request from %s' % str(addr))
            request = conn.recv(1024)
            conn.settimeout(None)
            request = str(request)
            print('GET Rquest Content = %s' % request)
            speed_up = request.find('/?speed_up')
            slow_down = request.find('/?slow_down')
            left_front = request.find('/?left_front')
            car_forward = request.find('/?car_forward')
            right_front = request.find('/?right_front')
            car_left = request.find('/?car_left')
            car_stop = request.find('/?car_stop')
            car_right = request.find('/?car_right')
            turn_left = request.find('/?turn_left')
            car_backward = request.find('/?car_backward')
            turn_right = request.find('/?turn_right')
            if speed_up == G_CMD_IDX:
                print('cmd: speed_up')
                ledLight.on()
                dcMotorLT.speedUp()
                dcMotorLB.speedUp()
                dcMotorRT.speedUp()
                dcMotorRB.speedUp()
            elif slow_down == G_CMD_IDX:
                print('cmd: slow_down')
                ledLight.on()
                dcMotorLT.slowDown()
                dcMotorLB.slowDown()
                dcMotorRT.slowDown()
                dcMotorRB.slowDown()
            elif left_front == G_CMD_IDX:
                print('cmd: left_front')
                ledLight.on()
                dcMotorLB.forward(G_TURN_SPEED)
                dcMotorRT.forward(G_TURN_SPEED)
                dcMotorLT.stop()
                dcMotorRB.stop()
            elif car_forward == G_CMD_IDX:
                print('cmd: car_forward')
                ledLight.on()
                dcMotorLT.forward(G_FORWARD_SPEED)
                dcMotorLB.forward(G_FORWARD_SPEED)
                dcMotorRT.forward(G_FORWARD_SPEED)
                dcMotorRB.forward(G_FORWARD_SPEED)
            elif right_front == G_CMD_IDX:
                print('cmd: right_front')
                ledLight.on()
                dcMotorLT.forward(G_TURN_SPEED)
                dcMotorRB.forward(G_TURN_SPEED)
                dcMotorLB.stop()
                dcMotorRT.stop()
            elif car_left == G_CMD_IDX:
                print('cmd: car_left')
                ledLight.on()
                dcMotorLT.backward(G_TURN_SPEED)
                dcMotorLB.forward(G_TURN_SPEED)
                dcMotorRT.forward(G_TURN_SPEED)
                dcMotorRB.backward(G_TURN_SPEED)
            elif car_stop == G_CMD_IDX:
                print('cmd: car_stop')
                ledLight.off()
                dcMotorLT.stop()
                dcMotorLB.stop()
                dcMotorRT.stop()
                dcMotorRB.stop()
            elif car_right == G_CMD_IDX:
                print('cmd: car_right')
                ledLight.on()
                dcMotorLT.forward(G_TURN_SPEED)
                dcMotorLB.backward(G_TURN_SPEED)
                dcMotorRT.backward(G_TURN_SPEED)
                dcMotorRB.forward(G_TURN_SPEED)
            elif turn_left == G_CMD_IDX:
                print('cmd: turn_left')
                ledLight.on()
                dcMotorLT.backward(G_TURN_SPEED)
                dcMotorLB.backward(G_TURN_SPEED)
                dcMotorRT.forward(G_TURN_SPEED)
                dcMotorRB.forward(G_TURN_SPEED)
            elif car_backward == G_CMD_IDX:
                print('cmd: car_backward')
                ledLight.on()
                dcMotorLT.backward(G_BACKWARD_SPEED)
                dcMotorLB.backward(G_BACKWARD_SPEED)
                dcMotorRT.backward(G_BACKWARD_SPEED)
                dcMotorRB.backward(G_BACKWARD_SPEED)
            elif turn_right == G_CMD_IDX:
                print('cmd: turn_right')
                ledLight.on()
                dcMotorLT.forward(G_TURN_SPEED)
                dcMotorLB.forward(G_TURN_SPEED)
                dcMotorRT.backward(G_TURN_SPEED)
                dcMotorRB.backward(G_TURN_SPEED)
            resHtml = genWebObj.getWebPage()
            conn.send('HTTP/1.1 200 OK\n')
            conn.send('Content-Type: text/html\n')
            conn.send('Connection: closed.\n\n')
            conn.sendall(resHtml)
            conn.close()
        except OSError as e:
            conn.close()
            print('Connection closed. OSError =', e)


if __name__ == '__main__':
    main()
