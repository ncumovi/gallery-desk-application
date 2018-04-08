const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// 主菜单模块
const Menu = electron.Menu
// 文件上传模块
const path = require('path')
const url = require('url')



const template = [
  {
    label: '新增里程',
    click () { console.log('dddd') }
  },
  {
    label: '我们的心路历程',
    click () {
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true
      }))
    }
  },
  {
    label: '心无所恃博客',
    submenu: [
      {
        label: 'you can do this either',
        click () {mainWindow.loadURL('https://ncumovi.github.io/2018/02/05/desk-appliction/') }
      }
    ]
  }
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)




//监听Squirrel事件
// 监听的目的主要是为了在安装之后自动创建App快捷方式，还有为之后的自动更新做准备
var handleStartupEvent = function() {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }

  // 安装
  function install() {
    var cp = require('child_process');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }


 // 卸载
  function uninstall() {
    var cp = require('child_process');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow()
  // 窗口最大化
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
