const {app,BrowserWindow}  = require('electron')

var mainWindow = null;
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1200, 
        height: 800,
        autoHideMenuBar:true
    });
    mainWindow.loadURL(__dirname+'/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    })
});