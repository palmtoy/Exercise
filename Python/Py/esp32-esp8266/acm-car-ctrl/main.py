try:
  import usocket as socket
except:
  import socket
import gc
from time import sleep
from machine import Pin, Signal
from dcmotor import DCMotor
from servo import CServo

G_GC_THRESHOLD = 102000 # unit: byte

G_FORWARD_SPEED = 100
G_BACKWARD_SPEED = 10


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
        .btnForward {
            background-color: cyan;
            color: black;
            padding: 30px 80px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnBack {
            background-color: cyan;
            color: black;
            padding: 30px 65px;
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
    <h1>Ackerman Car Controller :></h1>
    <br/>
    <p>
        <a href=\"?servo_test\"><button class="btnForward">ServoTest</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?car_forward\"><button class="btnForward">Forward</button></a>
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
</html>"""
    return html


def main():
    gc.collect()

    ledLight = Signal(Pin(2, Pin.OUT), invert=False) # GPIO2 ( D2 )
    sleep(0.1)
    ledLight.on()
    dcMotorA = DCMotor(4, 5) # GPIO4 ( D4 ), GPIO5 ( D5 )
    sleep(0.1)
    dcMotorA.stop()
    servoB = CServo(15) # GPIO15 ( D15 )

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
            car_forward = request.find('/?car_forward')
            car_backward = request.find('/?car_backward')
            speed_up = request.find('/?speed_up')
            slow_down = request.find('/?slow_down')
            car_stop = request.find('/?car_stop')
            servo_test = request.find('/?servo_test')
            cmdIdx = 6
            if car_forward == cmdIdx:
                print('cmd: car_forward')
                ledLight.on()
                dcMotorA.forward(G_FORWARD_SPEED)
            elif car_backward == cmdIdx:
                print('cmd: car_backward')
                ledLight.on()
                dcMotorA.backward(G_BACKWARD_SPEED)
            elif speed_up == cmdIdx:
                print('cmd: speed_up')
                ledLight.on()
                dcMotorA.speedUp()
            elif slow_down == cmdIdx:
                print('cmd: slow_down')
                ledLight.on()
                dcMotorA.slowDown()
            elif car_stop == cmdIdx:
                print('cmd: car_stop')
                ledLight.off()
                dcMotorA.stop()
            elif servo_test == cmdIdx:
                print('cmd: servo_test')
                ledLight.off()
                for angle in range(0, 91, 1):
                    servoB.setDirection(angle)
                    sleep(1)
                for angle in range(90, -1, -1):
                    servoB.setDirection(angle)
                    sleep(1)
            resHtml = getWebPage()
            conn.send('HTTP/1.1 200 OK\n')
            conn.send('Content-Type: text/html\n')
            conn.send('Connection: closed.\n\n')
            conn.sendall(resHtml)
            conn.close()
        except OSError as e:
            conn.close()
            print('Connection closed.')


if __name__ == '__main__':
    main()
