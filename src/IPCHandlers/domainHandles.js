import { ipcMain } from 'electron'

export default function domainHandles() {
    ipcMain.handle('handleCreateDomain', (event) => {
        console.log("handler1")
    })

    ipcMain.handle('handleGetDomains', (event) => {
        console.log("handler2")
    })

    ipcMain.handle('handleEditDomain', (event) => {
        console.log("handler3")
    })

    ipcMain.handle('handleDeleteDomain', (event) => {
        console.log("handler4")
    })

}