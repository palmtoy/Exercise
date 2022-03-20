try:
  import usocket as socket
except:
  import socket
from machine import Pin, Signal
from genweb import CGenWeb
import gc

G_GC_THRESHOLD = 102400 # unit: byte, 200KiB
G_CMD_IDX = 6

def main():
    gc.collect()
    genWebObj = CGenWeb()
    # ledLight = Signal(Pin(2, Pin.OUT), invert=True) # GPIO2
    ledLight = Signal(Pin(2, Pin.OUT), invert=False) # GPIO2
    ledLight.off()
    ledState = False

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 80))
    s.listen(2)
    while True:
        try:
            if gc.mem_free() < G_GC_THRESHOLD:
                gc.collect()
            conn, addr = s.accept()
            conn.settimeout(3.0)
            print('Received HTTP GET connection request from %s' % str(addr))
            request = conn.recv(1024)
            conn.settimeout(None)
            request = str(request)
            print('GET Rquest Content = %s' % request)
            switch_on = request.find('/?switch_on')
            switch_off = request.find('/?switch_off')
            if switch_on == G_CMD_IDX:
                print('Switch ON -> GPIO2')
                ledState = True
                ledLight.on()
            if switch_off == G_CMD_IDX:
                print('Switch OFF -> GPIO2')
                ledState = False
                ledLight.off()
            resHtml = genWebObj.getWebPage(ledState)
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
