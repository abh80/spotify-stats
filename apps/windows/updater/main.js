const { BrowserWindow, ipcMain } = require("electron");
const EventEmitter = require("events");
const update = require("electron-simple-updater");
const path = require("path");
const Logger = require("electron-log");
class Updater extends EventEmitter {
  constructor() {
    super();
    this.window = new BrowserWindow({
      backgroundColor: "#000000",
      height: 400,
      width: 350,
      show: false,
      frame: false,
      icon: path.join(__dirname, "..", "assets", "app.ico"),
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    this.window.loadFile(path.join(__dirname, "updater.html"));
    this.window.on("ready-to-show", () => {
      Logger.log("Updater Opening");
      this.window.show();
      this.init();
    });
  }
  close() {
    this.window.close();
  }
  init() {
    this.update = update.init({
      url: "https://raw.githubusercontent.com/abh80/spotify-stats/alpha/updates/win32-x64-prod.json",
      autoDownload: true,
      logger: false,
      checkUpdateOnStart: false,
    });
    if (this.update.options.disabled) {
      Logger.warn(
        "Skiping updates due to app may not be packaged or launched from Windows Store"
      );
      this.window.webContents.send("start");
      return this.emit("update:completed");
    }
    this.update.checkForUpdates();
    this.update.on("update-available", (meta) => {
      this.window.webContents.send("updating");
      Logger.log("Checking for updates...");
    });
    this.update.on("update-downloaded", () => {
      Logger.warn("Installing Update...");
      setTimeout(() => {
        this.window.webContents.send("update-downloaded");
        this.update.quitAndInstall();
      }, 4000);
    });
    this.update.on("update-downloading", () => {
      Logger.log("Downloading Update...");
      this.window.webContents.send("downloading");
    });
    this.update.on("error", (e) => {
      Logger.log(e);
      this.emit("update:error");
    });
    this.update.on("update-not-available", () => {
      Logger.log("Update Not available , starting application");
      this.window.webContents.send("start");
      setTimeout(() => {
        this.emit("update:completed");
      }, 2000);
    });
  }
}

module.exports = Updater;
