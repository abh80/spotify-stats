const { contextBridge, ipcRenderer } = require("electron");
const platform = require("platform");
contextBridge.exposeInMainWorld("os", platform.os.toString());
contextBridge.exposeInMainWorld("electron", true);
const wrapper = {};
contextBridge.exposeInMainWorld("wrapper", wrapper);

// Event Handlers
ipcRenderer.on("title-update", (e, title) => {
  document.getElementById("window-controls-title").textContent = title;
});

// Initialize window controls to work
document.addEventListener("DOMContentLoaded", function DOMLOADED() {
  document.getElementById("close-btn").addEventListener("click", () => {
    ipcRenderer.invoke("close-window");
  });
  document.getElementById("min-btn").addEventListener("click", () => {
    ipcRenderer.invoke("min-window");
  });
  document
    .getElementById("window-controls")
    .classList.replace("hidden", "sticky");
});
