'use strict';

const {app, BrowserWindow, Menu} = require('electron');

const url = require('url');

let mainWindow;
let allowQuitting = false;

function toggleDevTools() {
  mainWindow.webContents.toggleDevTools();
}

function createMenus() {
  const template = [{
    label: 'Application',
    submenu: [
      {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
      {type: 'separator'},
      {
        label: 'Reload', accelerator: 'Command+R', click: () => mainWindow.reload()
      },
      {type: 'separator'},
      {
        label: 'Close', accelerator: 'Command+W', click: () => closeApp()
      },
      {
        label: 'Quit', accelerator: 'Command+Q', click: () => quitApp()
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
      {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
      {type: 'separator'},
      {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
      {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
      {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
      {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
    ]
  }, {
    label: 'Advanced',
    submenu: [
      {label: 'Show console', accelerator: 'CmdOrCtrl+J', click: toggleDevTools}
    ]
  }];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  mainWindow = new BrowserWindow({width: 1200, height: 800});
  mainWindow.loadURL(
      url.format({
        pathname: `${__dirname}/index.html`,
        protocol: 'file:',
        slashes: true
      })
  );

  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    closeApp();
  });

  mainWindow.on('close', event => {
    if (allowQuitting === false) {
      event.preventDefault();
      closeApp();
    }
  });

  createMenus();
}

function closeApp() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide();
  }
}

function quitApp() {
  if (app) {
    allowQuitting = true;
    app.quit();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', e => {
  console.log('quitting', e);
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});