const { app, BrowserWindow, ipcMain } = require('electron');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const { spawn } = require('child_process');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

export const dataBase = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Domain = dataBase.define('Domain', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pointsTo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Remove topbar
  mainWindow.setMenuBarVisibility(false)
};

async function handleCreateDomain(event, name, pointsTo) {
  try {
    const newDomain = await Domain.create({ name: name, pointsTo: pointsTo });
  } catch (error) {
    console.log(error)
  }
}

async function handleGetDomains(event) {
  try {
    return await Domain.findAll();
  } catch (error) {
    console.log(error)
  }
}

async function handleDeleteDomain(event, id) {
  try {
    await Domain.destroy({ where: { id: id } });
  } catch (error) {
    console.log(error)
  }
}

async function handleStartDomain(event, id) {
  try {
    var child = spawn("node", ["src/domain.js"], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
    // Handle events from the child process
    child.on('close', (code) => {
      console.log(`mDNS child process exited with code ${code}`);
    });

    child.on('error', (err) => {
      console.error(`mDNS child process error: ${err.message}`);
    });
  } catch (error) {
    console.log(error)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  try {
    await dataBase.authenticate();
    await dataBase.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  ipcMain.on('createDomain', handleCreateDomain)
  ipcMain.handle('getDomains', handleGetDomains)
  ipcMain.on('deleteDomain', handleDeleteDomain)
  ipcMain.on('startDomain', handleStartDomain)
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.