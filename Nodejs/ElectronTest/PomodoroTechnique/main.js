const { app, BrowserWindow, ipcMain, Notification } = require('electron');

let G_MAIN_WINDOW = null;

function handleIPC() {
  ipcMain.handle('notification', async (e, { body, title, actions, closeButtonText }) => {
    const res = await new Promise((resolve, reject) => {
      console.log({
        title,
        body,
        actions,
        closeButtonText,
      });
      const notification = new Notification({
        title,
        body,
        actions,
        closeButtonText,
      });
      notification.show();
      notification.on('action', function (event) {
        resolve({ event: 'action' });
      });
      notification.on('close', function (event) {
        resolve({ event: 'close' });
      });
    });
    return res;
  });
}

function createMainWindow() {
  G_MAIN_WINDOW = new BrowserWindow({
    width: 260,
    height: 360,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  G_MAIN_WINDOW.loadFile('./index.html');

  return G_MAIN_WINDOW;
}

app.whenReady().then(() => {
  handleIPC();
  createMainWindow();
});
