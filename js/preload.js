name=preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Whitelist des canaux IPC sécurisés
const validChannels = {
  invoke: [
    'store',
    'main',
    'login',
    'loginLoading',
    'doubleAuth',
    'loginCode',
    'changeroute',
    'closeModal',
    'openModal',
    'logout',
    'dialog:openDirectory',
  ],
  on: [
    'update_available',
    'update_download_progress',
    'update_downloaded',
    'store-change',
    'data-change',
    'route',
  ],
  send: [
    'open-external-link',
    'WindowMinimize',
    'WindowMaximize',
    'WindowClose',
    'show-dialog',
    'checkUpdate',
    'set-discord-presence',
    'NGRadio-state-changed',
    'NGRadio-volume',
    'NGRadio-playpause',
    'set-data',
  ],
};

// Exposer une API sécurisée
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // Invoke - attend une réponse
    invoke: (channel, ...args) => {
      if (validChannels.invoke.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
      throw new Error(`Channel ${channel} not allowed`);
    },

    // Send - pas de réponse
    send: (channel, ...args) => {
      if (validChannels.send.includes(channel)) {
        return ipcRenderer.send(channel, ...args);
      }
      throw new Error(`Channel ${channel} not allowed`);
    },

    // Listener
    on: (channel, func) => {
      if (validChannels.on.includes(channel)) {
        const subscription = (_event, ...args) => func(...args);
        ipcRenderer.on(channel, subscription);
        return () => ipcRenderer.removeListener(channel, subscription);
      }
      throw new Error(`Channel ${channel} not allowed`);
    },

    // Sync (utiliser avec prudence)
    sendSync: (channel, ...args) => {
      if (validChannels.invoke.includes(channel)) {
        return ipcRenderer.sendSync(channel, ...args);
      }
      throw new Error(`Channel ${channel} not allowed`);
    },
  },
  versions: process.versions,
  platform: process.platform,
});
