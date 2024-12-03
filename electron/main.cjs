/* eslint-disable no-undef */
// electron 主进程入口文件
const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

// 是否是开发环境
// const isDev = process.env.IS_DEV == "true" ? true : false;
const isDev = false;
function createWindow() {
    // 创建主窗口
    const mainWindow = new BrowserWindow({
        // show: false, // 设置为 true
        // resizable: false,// 窗口大小是否可调整
        // movable:false,//窗口是否可移动
        // closable:false,// 窗口是否可关闭
        x: 0,//窗口相对于屏幕左侧的偏移量
        y: 0,//窗口相对于屏幕顶端的偏移量
        closable: true,// 窗口是否可关闭
        // fullscreen: true,
        // fullscreenable: true,
        // useContentSize:true,//width 和 height 将设置为 web 页面的尺寸
        width: 1920,
        height: 1080,
        // titleBarStyle: "hidden",// 窗口标题栏样式
        // width: 1000,
        // height: 900,
        autoHideMenuBar: true,
        // frame: true, // * app边框
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: path.join(__dirname, "../assets/img/homeLogo.png"),
    });
    // 隐藏系统菜单栏
    // mainWindow.setMenuBarVisibility(false);

    // 主窗口加载URL

    // mainWindow.loadURL(
    //     isDev
    //         ? "http://localhost:8023"
    //         : `file://${path.join(__dirname, "../dist/index.html")}`
    // );

    // 如果是开发环境，打开调试工具
    if (isDev) {
        const elePath = path.join(__dirname, '../node_modules/electron')
        require('electron-reload')('../', {
            electron: require(elePath),
        })
        mainWindow.loadURL('http://localhost:8023')
        mainWindow.webContents.openDevTools();
    } else {
        // 在生产环境中，监听特殊的快捷键来打开开发者工具
        mainWindow.loadFile(path.resolve(__dirname, '../dist/index.html'))
        // mainWindow.webContents.on("before-input-event", (event, input) => {
        //     // 打开开发者工具的快捷键是 Ctrl+Shift+I
        //     if (input.control && input.shift && input.key === "I") {
        //         mainWindow.webContents.openDevTools();
        //     }
        // });
    }
    // 等窗口加载完毕再显示
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    // 监听窗口关闭事件
    ipcMain.on("close", () => {
        mainWindow.close();
    });
}

// Electron 应用程序入口，应用程序准备好后执行回调函数
app.whenReady().then(() => {
    createWindow();

    // 监听激活事件
    app.on("activate", function () {
        // 如果当前没有打开的窗口，则创建一个新的窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// 监听窗口关闭事件，当所有的窗口都关闭了执行回调函数
app.on("window-all-closed", () => {
    // 当当前系统不是 macOS，退出应用程序
    if (process.platform !== "darwin") {
        app.quit();
    }
});
