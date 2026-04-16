console.log("Preload chargé");

// preload.js — compatible avec nodeIntegration: true + contextIsolation: false
// contextBridge n'est PAS utilisé ici car incompatible avec contextIsolation: false

const { contextBridge, ipcRenderer } = require("electron");

// On expose ipcRenderer directement sur window
// car nodeIntegration: true donne déjà accès à Node.js dans le renderer
window.ipcRenderer = ipcRenderer;

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
