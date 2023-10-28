const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    createDomain: (name, pointsTo) => { ipcRenderer.send('createDomain', name, pointsTo) },
    getDomains: () => ipcRenderer.invoke('getDomains'),
    deleteDomain: (id) => ipcRenderer.send('deleteDomain', id),
    startDomain: (id) => ipcRenderer.send('startDomain', id),
})