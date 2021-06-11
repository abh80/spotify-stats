const { BrowserWindow, app, screen, ipcMain } = require("electron");
const platform = require("platform");
const path = require("path");
async function Init() {
  const primarymonitor = screen.getPrimaryDisplay();
  const win = new BrowserWindow({
    backgroundColor: "#000000",
    width: primarymonitor.size.width,
    height: primarymonitor.size.height,
    minHeight: 600,
    minWidth: 1000,
    frame: false,
    icon: path.join(__dirname, "assets", "app.ico"),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:3000/");
  ipcMain.handle("close-window", () => {
    win.close();
  });
  ipcMain.handle("min-window", () => {
    win.minimize();
  });
  win.on("page-title-updated", (e, title) => {
    win.webContents.send("title-update", title);
  });
}

app.on("ready", async () => {
  await Init();
});
app.on("window-all-closed", () => {
  app.quit();
});
