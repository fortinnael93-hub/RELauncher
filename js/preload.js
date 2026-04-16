// preload.js
// nodeIntegration: true + contextIsolation: false
// → le renderer a déjà accès à Node.js directement
// → le preload sert uniquement à exposer des utilitaires globaux si besoin

const { ipcRenderer } = require("electron");

// Ajoute get-data en sendSync car il n'est pas dans ipcRenderer.invoke
// et est utilisé dans plusieurs fichiers
window.ipcRenderer = ipcRenderer;

// Expose les canaux autorisés pour éviter les appels non whitelistés
const validSendChannels = [
  "open-external-link",
  "WindowMinimize",
  "WindowMaximize",
  "WindowClose",
  "show-dialog",
  "checkUpdate",
  "set-discord-presence",
  "NGRadio-state-changed",
  "NGRadio-volume",
  "NGRadio-playpause",
  "set-data",
];

const validInvokeChannels = [
  "store",
  "main",
  "login",
  "loginLoading",
  "doubleAuth",
  "loginCode",
  "changeroute",
  "closeModal",
  "openModal",
  "logout",
  "dialog:openDirectory",
  "translate",
];

const validOnChannels = [
  "update_available",
  "update_download_progress",
  "update_downloaded",
  "store-change",
  "data-change",
  "route",
];

// Vérifie les canaux au moment de l'envoi
const safeIpc = {
  invoke: (channel, ...args) => {
    if (validInvokeChannels.includes(channel))
      return ipcRenderer.invoke(channel, ...args);
    throw new Error(`Canal invoke non autorisé : ${channel}`);
  },
  send: (channel, ...args) => {
    if (validSendChannels.includes(channel))
      return ipcRenderer.send(channel, ...args);
    throw new Error(`Canal send non autorisé : ${channel}`);
  },
  on: (channel, func) => {
    if (validOnChannels.includes(channel)) {
      const sub = (_event, ...args) => func(...args);
      ipcRenderer.on(channel, sub);
      return () => ipcRenderer.removeListener(channel, sub);
    }
    throw new Error(`Canal on non autorisé : ${channel}`);
  },
  sendSync: (channel, ...args) => {
    return ipcRenderer.sendSync(channel, ...args);
  },
};

window.safeIpc = safeIpc;
