const { BrowserWindow, app, screen, ipcMain } = require("electron");
const Updater = require("./updater/main");
const Logger = require("electron-log");
const path = require("path");

function Init() {
  return new Promise(async (resolve, reject) => {
    const primarymonitor = screen.getPrimaryDisplay();
    const win = new BrowserWindow({
      backgroundColor: "#000000",
      width: primarymonitor.size.width,
      height: primarymonitor.size.height,
      minHeight: 600,
      minWidth: 1000,
      frame: false,
      icon: path.join(__dirname, "assets", "app.ico"),
      show: false,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        devTools: false,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    win.loadURL("https://spotify-stats-omega.vercel.app/home");
    ipcMain.handle("close-window", () => {
      win.close();
    });
    ipcMain.handle("min-window", () => {
      win.minimize();
    });
    win.on("page-title-updated", (e, title) => {
      win.webContents.send("title-update", title);
    });
    win.on("ready-to-show", () => {
      resolve(true);
      win.show();
    });
    app.on("will-quit", () => {
      win.removeAllListeners("close");
      app.quit();
    });
  });
}

app.on("ready", async () => {
  let updater = new Updater();
  updater.once("update:completed", async () => {
    await Init();
    updater.window.removeAllListeners("close");
    updater.close();
  });
  updater.once("update:error", () => {
    Logger.warn("Error occured during update , Quiting safetly");
    updater.window.removeAllListeners("close");
    updater.close();
  });
});
app.on("window-all-closed", () => {
  Logger.log("Quiting Application");
  app.quit();
});
