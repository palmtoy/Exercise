try:
  import usocket as socket
except:
  import socket

import gc

from dcmotor import DCMotor
from machine import Pin, Signal, PWM

gc.collect()

ledLight = Signal(Pin(2, Pin.OUT), invert=True) # GPIO2 ( D4 )
ledLight.on()
pwmFrequency = 500
enablePin = PWM(Pin(4), pwmFrequency) # GPIO4 ( D2 )
pin1 = Pin(5, Pin.OUT) # GPIO5 ( D1 )
pin2 = Pin(14, Pin.OUT) # GPIO14 ( D5 )
dcMotorA = DCMotor(pin1, pin2, enablePin)

pin3 = Pin(12, Pin.OUT) # GPIO12 ( D6 )
pin4 = Pin(13, Pin.OUT) # GPIO13 ( D7 )
dcMotorB = DCMotor(pin3, pin4, enablePin)

forwardSpeed = 100
backwardSpeed = 80

def web_page():
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
        .btnLeft {
            background-color: green;
            color: black;
            padding: 30px 110px;
            text-align: center;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .btnRight {
            background-color: green;
            color: black;
            padding: 30px 100px;
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
    <h1>Smart Car Controller :></h1>
    <br/>
    <p>
        <a href=\"?car_forward\"><button class="btnForward">Forward</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?car_left\"><button class="btnLeft">Left</button></a>
        <a href=\"?car_stop\"><button class="btnStop">Stop</button></a>
        <a href=\"?car_right\"><button class="btnRight">Right</button></a>
    </p>
    <br/>
    <p>
        <a href=\"?car_backward\"><button class="btnBack">Backward</button></a>
    </p>
</body>
</html>"""
    return html


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 80))
s.listen(5)

while True:
    try:
        if gc.mem_free() < 102000:
            gc.collect()
        conn, addr = s.accept()
        conn.settimeout(3.0)
        print('Received HTTP GET connection request from %s' % str(addr))
        request = conn.recv(1024)
        conn.settimeout(None)
        request = str(request)
        print('GET Rquest Content = %s' % request)
        car_forward = request.find('/?car_forward')
        car_backward = request.find('/?car_backward')
        car_left = request.find('/?car_left')
        car_right = request.find('/?car_right')
        car_stop = request.find('/?car_stop')
        cmdIdx = 6
        if car_forward == cmdIdx:
            print('cmd: car_forward')
            ledLight.on()
            dcMotorA.forward(forwardSpeed)
            dcMotorB.forward(forwardSpeed)
        elif car_backward == cmdIdx:
            print('cmd: car_backward')
            ledLight.on()
            dcMotorA.backward(backwardSpeed)
            dcMotorB.backward(backwardSpeed)
        elif car_left == cmdIdx:
            print('cmd: car_left')
            ledLight.on()
            dcMotorA.backward(backwardSpeed)
            dcMotorB.forward(backwardSpeed)
        elif car_right == cmdIdx:
            print('cmd: car_right ')
            ledLight.on()
            dcMotorA.forward(backwardSpeed)
            dcMotorB.backward(backwardSpeed)
        elif car_stop == cmdIdx:
            print('cmd: car_stop')
            ledLight.off()
            dcMotorA.stop()
            dcMotorB.stop()
        resHtml = web_page()
        conn.send('HTTP/1.1 200 OK\n')
        conn.send('Content-Type: text/html\n')
        conn.send('Connection: closed.\n\n')
        conn.sendall(resHtml)
        conn.close()
    except OSError as e:
        conn.close()
        print('Connection closed.')
