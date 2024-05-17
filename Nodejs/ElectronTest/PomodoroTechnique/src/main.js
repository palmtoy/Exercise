const { strIcon } = require('./trayIcon');
const exec = require('child_process').exec;
const { app, BrowserWindow, ipcMain, Notification, Tray, nativeImage } = require('electron');

let G_MAIN_WINDOW = null;
let G_TRAY = null;
let G_NOTIFICATION_OBJ = null;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function handleIPC() {
  ipcMain.handle('notification', async (e, { body, title, actions, closeButtonText }) => {
    const res = await new Promise((resolve, reject) => {
      console.log({
        title,
        body,
        actions,
        closeButtonText,
      });
      const tmpNotification = new Notification({
        title,
        body,
        actions,
        closeButtonText,
      });
      tmpNotification.show();
      tmpNotification.on('action', function (event) {
        resolve({ event: 'action' });
      });
      tmpNotification.on('close', function (event) {
        resolve({ event: 'close' });
      });
    });
    return res;
  });
}

function createMainWindow() {
  G_MAIN_WINDOW = new BrowserWindow({
    width: 143,
    height: 50,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  G_MAIN_WINDOW.loadFile('./src/index.html');

  return G_MAIN_WINDOW;
}

app.whenReady().then(() => {
  handleIPC();
  createMainWindow();
  const trayIcon = nativeImage.createFromDataURL(`data:image/png;base64,${strIcon}`);
  G_TRAY = new Tray(trayIcon);
  G_TRAY.setToolTip('Pomodoro');
  G_TRAY.on('click', () => {
    G_MAIN_WINDOW.show();
    G_MAIN_WINDOW.focus();
  });
});

function checkBlueToothDevice() {
  const tmpCmd =
    'ioreg -rkBatteryPercent -nAppleDeviceManagementHIDEventService | grep -e Product..= -e BatteryPercent..= | tr -d \\\\n | sed -E "s/.*Product..= \\"([^\\"]*)\\".*Percent..= (.*)/\\1 = \\2%/g" && echo';
  exec(tmpCmd, function (error, strOut) {
    if (error !== null) {
      console.error('_checkBlueToothDevice ~ exec error:', error);
    } else {
      console.log('_checkBlueToothDevice ~', strOut);
      strOut = strOut.trim();
      if (!strOut || (strOut && strOut.length < 'Magic Trackpad ='.length)) {
        return;
      }
      const strPercent = strOut.replace(/[^\d]/g, ''); // 只保留数字, 'Magic Trackpad = 35%' => 35
      const numPercent = parseInt(strPercent, 10) || 100;
      const deviceName = (strOut.match(/[\p{Letter}\p{Mark}]+/gu) || []).join(''); // 'Magic Trackpad = 35%' => [ 'Magic', 'Trackpad' ].join('') => 'MagicTrackpad'
      if (numPercent < 20) {
        if (G_NOTIFICATION_OBJ) {
          G_NOTIFICATION_OBJ.close();
        }
        G_NOTIFICATION_OBJ = new Notification({
          title: `${deviceName} 电量不足!`,
          body: `请充电 ( 当前电量: ${numPercent}% ).`,
          closeButtonText: '知道了',
        });
        G_NOTIFICATION_OBJ.show();
      }
    }
  });
}

setInterval(() => {
  checkBlueToothDevice();
}, 60 * 60 * 1000); // 1 hour
