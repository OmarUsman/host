const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    createDomain: (name, pointsTo) => ipcRenderer.send('createDomain', name, pointsTo)
})