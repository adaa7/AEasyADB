import { app , BrowserWindow ,ipcMain} from 'electron';
import path from "path";
import {execSync , spawn} from 'child_process';
import iconv from "iconv-lite";

const __dirname = path.resolve();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'electron/preload.js')
    }
  })
  win.webContents.openDevTools()
  win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform == 'darwin') {
    app.quit()
  } 
})
let child;
function intt() {
  child = spawn("scrcpy");
  return iconv.decode(child, 'cp936')
}

ipcMain.handle('set-title', intt)