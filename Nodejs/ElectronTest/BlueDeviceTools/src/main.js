const { strIcon } = require('./trayIcon');
const exec = require('child_process').exec;
const { app, BrowserWindow, Notification, Tray, nativeImage } = require('electron');

let G_MAIN_WINDOW = null;
let G_TRAY = null;
const G_NOTIFICATION_OBJ = {};

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
  const attrList = ['Product', 'BatteryPercent', 'BatteryStatusFlags'];
  const batteryThreshold = 10; // 电量阈值: 10%
  // const tmpCmd = 'ioreg -rkBatteryPercent -nAppleDeviceManagementHIDEventService | grep -e Product..= -e BatteryPercent..= -e BatteryStatusFlags..=';
  const tmpCmd = 'ioreg -rkBatteryPercent -nAppleDeviceManagementHIDEventService';
  exec(tmpCmd, function (error, strOut) {
    if (error !== null) {
      console.error('_checkBlueToothDevice ~ exec error:', error);
    } else {
      // console.log('_checkBlueToothDevice ~ strOut:\n', strOut);
      strOut = strOut.trim();
      if (!strOut || (strOut && strOut.length < attrList.join(' = ').length)) {
        return;
      }
      let jsonObj = {};
      const outList = strOut.split('\n');
      let deviceNum = 0;
      for (let i = 0; i < outList.length; i++) {
        const tmpList = outList[i].split('=');
        let k = tmpList[0].trim().replace(/"/g, '');
        if (!attrList.includes(k)) {
          continue;
        }
        deviceNum = Math.floor(Object.keys(jsonObj).length / attrList.length) + 1;
        k += `_${deviceNum}`;
        const v = tmpList[1].trim().replace(/"/g, '');
        jsonObj[k] = /^\d+$/.test(v) ? parseInt(v) : v;
      }
      console.log(`${new Date().toLocaleString()} ~ _checkBlueToothDevice ~ jsonObj =`, jsonObj);
      if (Object.keys(jsonObj).length < attrList.length) {
        return;
      }
      for (let n = 1; n <= deviceNum; n++) {
        if (jsonObj['BatteryStatusFlags' + `_${n}`] === 3) {
          // 3: 充电状态中; 0: 非充电状态中
          continue;
        }
        const batteryPercent = jsonObj['BatteryPercent' + `_${n}`];
        if (batteryPercent < batteryThreshold) {
          if (G_NOTIFICATION_OBJ[n]) {
            G_NOTIFICATION_OBJ[n].close();
          }
          G_NOTIFICATION_OBJ[n] = new Notification({
            title: `${jsonObj['Product' + `_${n}`]} 电量不足!`,
            body: `请充电 ( 当前电量: ${batteryPercent}% ).`,
            closeButtonText: '知道了',
          });
          G_NOTIFICATION_OBJ[n].show();
        }
      }
    }
  });
}

checkBlueToothDevice();
setInterval(() => {
  checkBlueToothDevice();
}, 2 * 60 * 60 * 1000); // 2 hours
