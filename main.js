const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'favicon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Varsayılan menü çubuğunu gizle
  win.setMenuBarVisibility(false);

  // Uygulamanın index.html dosyasını yükle
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // macOS de pencereler kapansa bile uygulama genelde açık kalır (Cmd + Q ile kapatılana dek)
  // Ancak Windows ve Linux'ta tüm pencereler kapanınca çıkarız
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
