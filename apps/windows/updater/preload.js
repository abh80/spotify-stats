const { ipcRenderer } = require("electron");

ipcRenderer.on("updating", () => {
  document.getElementById("status-text").textContent = "Starting Download";
});
ipcRenderer.on("downloading", () => {
  document.getElementById("status-text").textContent = "Downloading Update";
});
ipcRenderer.on("start", () => {
  document.getElementById("status-text").textContent = "Starting";
});
ipcRenderer.on("update-downloaded", () => {
  document.getElementById("status-text").textContent = "Restarting in 3s";
  let timer = 3;
  setInterval(() => {
    timer--;
    document.getElementById(
      "status-text"
    ).textContent = `Restarting in ${timer}s`;
  }, 1000);
});
