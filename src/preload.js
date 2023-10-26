const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})