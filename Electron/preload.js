const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('main',{
  readCom() {
    return ipcRenderer.invoke('set-title')
  },
})