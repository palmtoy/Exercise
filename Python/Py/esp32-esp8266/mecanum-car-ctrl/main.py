try:
  import usocket as socket
except:
  import socket
import gc
from time import sleep
from machine import Pin, Signal
from dcmotor import DCMotor

G_GC_THRESHOLD = 204800 # unit: byte, 200KiB
G_CMD_IDX = 6

G_FORWARD_SPEED = 50
G_TURN_SPEED = 39
G_BACKWARD_SPEED = 30


def getWebPage():
    html = """
<html>
<head>
    <style>
        html {
            font-family: Arial;
            display: inline-block;
            margin: 0px auto;
            text-align: center;
        }
        .btnTurnLeft {
            background-color: #5882FA;
            color: black;
            padding: 30px 78px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnForward {
            background-color: cyan;
            color: black;
            padding: 30px 76px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnTurnRight {
            background-color: #5882FA;
            color: black;
            padding: 30px 60px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnSpeedUp {
            background-color: orange;
            color: black;
            padding: 30px 67px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnStop {
            background-color: red;
            color: black;
            padding: 30px 110px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnSlowDown {
            background-color: green;
            color: black;
            padding: 30px 53px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnBack {
            background-color: cyan;
            color: black;
            padding: 30px 64px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h1>Mecanum Car Controller :></h1>
    <br/>
    <p>
        <a href=\"?turn_left\"><button class="btnTurnLeft">TurnLeft</button></a>
        <a href=\"?car_forward\"><button class="btnForward">Forward</button></a>
        <a href=\"?turn_right\"><button class="btnTurnRight">TurnRight</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?speed_up\"><button class="btnSpeedUp">SpeedUp</button></a>
        <a href=\"?car_stop\"><button class="btnStop">Stop</button></a>
        <a href=\"?slow_down\"><button class="btnSlowDown">SlowDown</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?car_backward\"><button class="btnBack">Backward</button></a>
    </p>
</body>
</html>
"""
    return html


def main():
    gc.collect()

    ledLight = Signal(Pin(2, Pin.OUT), invert = False) # GPIO2 ( P2 )
    sleep(0.1)
    ledLight.on()

    dcMotorLT = DCMotor(15, 4) # GPIO15 ( P15 ), GPIO4 ( P4 )
    sleep(0.1)
    dcMotorLT.stop()

    dcMotorLB = DCMotor(16, 17) # GPIO16 ( P16 ), GPIO17 ( P17 )
    sleep(0.1)
    dcMotorLB.stop()

    dcMotorRT = DCMotor(5, 18) # GPIO5 ( P5 ), # GPIO18 ( P18 )
    sleep(0.1)
    dcMotorRT.stop()

    dcMotorRB = DCMotor(19, 23) # GPIO19 ( P19 ), GPIO23 ( P23 )
    sleep(0.1)
    dcMotorRB.stop()

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('', 80))
    sock.listen(5)
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
            turn_left = request.find('/?turn_left')
            car_forward = request.find('/?car_forward')
            turn_right = request.find('/?turn_right')
            speed_up = request.find('/?speed_up')
            car_stop = request.find('/?car_stop')
            slow_down = request.find('/?slow_down')
            car_backward = request.find('/?car_backward')
            if turn_left == G_CMD_IDX:
                print('cmd: turn_left')
                ledLight.on()
                dcMotorLT.forward(G_TURN_SPEED)
                dcMotorLB.backward(G_TURN_SPEED)
                dcMotorRT.forward(G_TURN_SPEED)
                dcMotorRB.backward(G_TURN_SPEED)
            elif turn_right == G_CMD_IDX:
                print('cmd: turn_right')
                ledLight.on()
                dcMotorLT.backward(G_TURN_SPEED)
                dcMotorLB.forward(G_TURN_SPEED)
                dcMotorRT.backward(G_TURN_SPEED)
                dcMotorRB.forward(G_TURN_SPEED)
            elif car_forward == G_CMD_IDX:
                print('cmd: car_forward')
                ledLight.on()
                dcMotorLT.forward(G_FORWARD_SPEED)
                dcMotorLB.forward(G_FORWARD_SPEED)
                dcMotorRT.forward(G_FORWARD_SPEED)
                dcMotorRB.forward(G_FORWARD_SPEED)
            elif speed_up == G_CMD_IDX:
                print('cmd: speed_up')
                ledLight.on()
                dcMotorLT.speedUp()
                dcMotorLB.speedUp()
                dcMotorRT.speedUp()
                dcMotorRB.speedUp()
            elif car_stop == G_CMD_IDX:
                print('cmd: car_stop')
                ledLight.off()
                dcMotorLT.stop()
                dcMotorLB.stop()
                dcMotorRT.stop()
                dcMotorRB.stop()
            elif slow_down == G_CMD_IDX:
                print('cmd: slow_down')
                ledLight.on()
                dcMotorLT.slowDown()
                dcMotorLB.slowDown()
                dcMotorRT.slowDown()
                dcMotorRB.slowDown()
            elif car_backward == G_CMD_IDX:
                print('cmd: car_backward')
                ledLight.on()
                dcMotorLT.backward(G_BACKWARD_SPEED)
                dcMotorLB.backward(G_BACKWARD_SPEED)
                dcMotorRT.backward(G_BACKWARD_SPEED)
                dcMotorRB.backward(G_BACKWARD_SPEED)
            resHtml = getWebPage()
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
