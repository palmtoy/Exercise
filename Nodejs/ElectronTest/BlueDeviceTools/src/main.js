const { strIcon } = require('./trayIcon');
const exec = require('child_process').exec;
const { app, BrowserWindow, Notification, Tray, nativeImage } = require('electron');

let G_MAIN_WINDOW = null;
let G_TRAY = null;
let G_NOTIFICATION_OBJ = null;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createMainWindow() {
  G_MAIN_WINDOW = new BrowserWindow({
    width: 183,
    height: 46,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  G_MAIN_WINDOW.loadFile('./src/index.html');

  return G_MAIN_WINDOW;
}

app.whenReady().then(() => {
  createMainWindow();
  const trayIcon = nativeImage.createFromDataURL(`data:image/png;base64,${strIcon}`);
  G_TRAY = new Tray(trayIcon);
  G_TRAY.setToolTip('BlueDeviceTools');
  G_TRAY.on('click', () => {
    G_MAIN_WINDOW.show();
    G_MAIN_WINDOW.focus();
  });
});

function checkBlueToothDevice() {
  const tmpCmd =
    'ioreg -rkBatteryPercent -nAppleDeviceManagementHIDEventService | grep -e Product..= -e BatteryPercent..= -e BatteryStatusFlags..=';
  exec(tmpCmd, function (error, strOut) {
    if (error !== null) {
      console.error('_checkBlueToothDevice ~ exec error:', error);
    } else {
      console.log('_checkBlueToothDevice ~', strOut);
      strOut = strOut.trim();
      if (!strOut || (strOut && strOut.length < 'Magic Trackpad ='.length)) {
        return;
      }
      const tmpList = strOut.split('\n');
      for (let i = 0; i < tmpList.length; i++) {
        tmpList[i] = tmpList[i].replace(/=/g, ':'); // replace '=' with ':'
      }
      const strJson = `{${tmpList.join(',')}}`;
      let jsonObj = {};
      try {
        jsonObj = JSON.parse(strJson);
      } catch (err) {
        console.error('_checkBlueToothDevice ~ JSON.parse error:', err);
        return;
      }
      if (Object.keys(jsonObj).length < 3) { // BatteryStatusFlags, BatteryPercent, Product
        return;
      }
      if (jsonObj.BatteryStatusFlags === 3) { // 3: 充电状态中; 0: 非充电状态中
        return;
      }
      const batteryPercent = jsonObj.BatteryPercent;
      if (batteryPercent < 10) {
        if (G_NOTIFICATION_OBJ) {
          G_NOTIFICATION_OBJ.close();
        }
        G_NOTIFICATION_OBJ = new Notification({
          title: `${jsonObj.Product} 电量不足!`,
          body: `请充电 ( 当前电量: ${batteryPercent}% ).`,
          closeButtonText: '知道了',
        });
        G_NOTIFICATION_OBJ.show();
      }
    }
  });
}

setInterval(() => {
  checkBlueToothDevice();
}, 2 * 60 * 60 * 1000); // 2 hours
