import network
import esp
import time

esp.osdebug(None)

wlanObj = network.WLAN(network.STA_IF)
wlanObj.active(True)
wlanObj.config(dhcp_hostname = 'switch')
wlanObj.connect('TP2.4G_***_ssid', 'TP2.4G_***_pwd')

while wlanObj.isconnected() == False:
  time.sleep(0.1)
  pass

print('DHCP_HOSTNAME: {}.local'.format(wlanObj.config('dhcp_hostname')))
print('Connection successful:', wlanObj.ifconfig())
