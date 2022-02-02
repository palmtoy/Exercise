try:
  import usocket as socket
except:
  import socket

from machine import Pin
import gc

gc.collect()

ledLight = Pin(2, Pin.OUT)
led_state = "OFF"

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
        .buttonOn {
            background-color: red;
            color: white;
            padding: 80px 200px;
            text-align: center;
            display: inline-block;
            font-size: 80px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .buttonOff {
            background-color: black;
            color: white;
            padding: 80px 180px;
            text-align: center;
            display: inline-block;
            font-size: 80px;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <br/>
    <br/>
    <h1>ESP MicroPython Web Server</h1>
    <h2>LED state: <strong>""" + led_state + """</strong></h2>
    <p>
        <a href=\"?led_2_on\"><button class="buttonOn">LED ON</button></a>
    </p>
    <p>
        <a href=\"?led_2_off\"><button class="buttonOff">LED OFF</button></a>
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
        led_on = request.find('/?led_2_on')
        led_off = request.find('/?led_2_off')
        if led_on == 6:
            print('LED ON -> GPIO2')
            led_state = "ON"
            ledLight.off()
        if led_off == 6:
            print('LED OFF -> GPIO2')
            led_state = "OFF"
            ledLight.on()
        response = web_page()
        conn.send('HTTP/1.1 200 OK\n')
        conn.send('Content-Type: text/html\n')
        conn.send('Connection: close.\n\n')
        conn.sendall(response)
        conn.close()
    except OSError as e:
        conn.close()
        print('Connection closed.')
