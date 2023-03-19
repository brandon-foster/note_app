const path = require('path');

const { app, BrowserWindow } = require('electron');

const express = require('express');
const bodyParser = require('body-parser');

const BASE_DIR = require('./config/baseDir');

const adminRouter = require('./routers/adminRouter');
const mainRouter = require('./routers/mainRouter');
const errorController = require('./controllers/errorController');
const rootDir = require('./util/rootDir');

(function initExpress() {
    const noteapp = require('./app.js');
}());

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    const url = require('url').format({
      protocol: 'http',
      slashes: true,
      hostname: 'localhost',
      port: '3000',
      pathname: require('path').join(`${BASE_DIR}`),
    });
    win.loadURL(url)
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows() === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

