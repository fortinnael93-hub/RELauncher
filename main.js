const {
  app,
  BrowserWindow,
  ipcMain,
  session,
  globalShortcut,
  screen,
  Menu,
  Tray,
  Notification,
  shell,
  dialog,
  clipboard,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const DiscordRPC = require("discord-rpc");
const { machineIdSync } = require("node-machine-id");
const Store = require("electron-store");
const store = new Store();
const axios = require("axios");
const { exec } = require("child_process");

let window;
let hiddenRadioWindow;
let modalWindow;
let alertWindow;

let versionFromStore = store.get("version") || "stable";

const clientId = "450747976868954113";

DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: "ipc" });

let data = {
  NGRadioPlaying: false,
  NGRadioVolume: 0.1,
  currentRoute: "launcher",
  currentVersion: versionFromStore,
  crashReport: null,
  NGRadioAPI: null,
  NGRadioElapsed: null,
  NGRadioDuration: null,
  authtoken: store.get("authtoken"),
  cuidUser: machineIdSync(),
  lang: store.get("lang") || "fr",
  launcherVersion: app.getVersion(),
};

// ── Création de la fenêtre principale ─────────────────────────────────────────
const createWindow = () => {
  window = new BrowserWindow({
    transparent: true,
    width: 540,
    height: 690,
    center: true,
    frame: false,
    autoHideMenuBar: true,
    resizable: true,
    icon: __dirname + "/images/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      devTools: true,
    },
  });

  window.show();

  function loadWindow(file, width, height) {
    window.loadFile(`${__dirname}/routes/${file}`);
    window.setSize(width, height, true);
    window.setMinimumSize(width, height);
    window.center();
  }

  // Si authtoken existe → login_loading, sinon → login
  loadWindow(
    store.get("authtoken") ? "login_loading.html" : "login.html",
    540,
    670,
  );

  // ── Navigation entre pages ──────────────────────────────────────────────────
  ipcMain.handle("main", () => loadWindow("main.html", 1366, 768));
  ipcMain.handle("login", () => loadWindow("login.html", 540, 690));
  ipcMain.handle("loginLoading", () =>
    loadWindow("login_loading.html", 540, 670),
  );
  ipcMain.handle("doubleAuth", () => loadWindow("sendsms.html", 610, 602));
  ipcMain.handle("loginCode", () => loadWindow("login.html", 540, 670));

  // ── Changement de route interne (iframe) ────────────────────────────────────
  ipcMain.handle("changeroute", (e, route) => {
    if (data["currentRoute"] !== route) {
      data["currentRoute"] = route;

      if (route === "radio") {
        globalShortcut.register("MediaPlayPause", () => {
          window.webContents.send(
            "data-change",
            "TriggerNGRadio",
            !data["NGRadioPlaying"],
          );
        });
      } else {
        globalShortcut.unregisterAll();
      }

      window.webContents.send("route", route + ".html");
    }
  });

  // ── Store persistant ────────────────────────────────────────────────────────
  ipcMain.handle("store", (e, type, value) => {
    store.set(type, value);
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send("store-change", type, value);
    });
    if (type === "authtoken") data["authtoken"] = value;
    if (type === "lang") data["lang"] = value;
  });

  // ── Données non persistantes ────────────────────────────────────────────────
  ipcMain.on("get-data", (event, key) => {
    event.returnValue = data[key];
  });
  ipcMain.on("set-data", (event, key, value) => {
    data[key] = value;
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send("data-change", key, value);
    });
    if (key === "NGRadioPlaying" && !hiddenRadioWindow) createRadio();
  });

  // ── Contrôles fenêtre ───────────────────────────────────────────────────────
  ipcMain.on("WindowMinimize", () => window.minimize());
  ipcMain.on("WindowMaximize", () =>
    window.isMaximized() ? window.unmaximize() : window.maximize(),
  );
  ipcMain.on("WindowClose", () => window.hide());

  // ── Lien externe (utils.js → getExternalLink) ──────────────────────────────
  ipcMain.on("open-external-link", (event, url) => {
    shell.openExternal(url);
  });

  // ── Dialogue dossier (settings.js → browsePath) ─────────────────────────────
  ipcMain.handle("dialog:openDirectory", async () => {
    return dialog.showOpenDialog(window, {
      properties: ["openDirectory"],
    });
  });



  // ── Fenêtre modale ──────────────────────────────────────────────────────────
  modalWindow = new BrowserWindow({
    transparent: true,
    show: false,
    width: 580,
    height: 720,
    center: true,
    frame: false,
    autoHideMenuBar: true,
    resizable: false,
    icon: __dirname + "/images/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
      devTools: false,
    },
  });

  ipcMain.handle("closeModal", () => {
    modalWindow.hide();
    window.webContents.send("route", "accounts.html");
  });

  ipcMain.handle("openModal", (event, key) => {
    if (!modalWindow || modalWindow.isDestroyed()) {
      modalWindow = new BrowserWindow({
        transparent: true,
        show: false,
        width: 540,
        height: 700,
        center: true,
        frame: false,
        autoHideMenuBar: true,
        resizable: false,
        icon: __dirname + "/images/icon.ico",
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInSubFrames: true,
          contextIsolation: false,
          devTools: false,
        },
      });
    }
    modalWindow.loadFile(`${__dirname}/routes/${key}`);
    modalWindow.show();
  });

  modalWindow.on("focus", () => modalWindow.setBackgroundColor("#00000000"));
  modalWindow.on("blur", () => modalWindow.setBackgroundColor("#00000000"));

  // ── Déconnexion ─────────────────────────────────────────────────────────────
  ipcMain.handle("logout", () => {
    ["authtoken", "username", "accounts"].forEach((key) => store.delete(key));
    if (hiddenRadioWindow && !hiddenRadioWindow.isDestroyed()) {
      hiddenRadioWindow.close();
    }
    rpc.setActivity({}).catch(console.error);
    loadWindow("login.html", 540, 670);
  });

  // ── Dialogue ────────────────────────────────────────────────────────────────
  ipcMain.on("show-dialog", (event, args) => {
    dialog
      .showMessageBox({
        message: args.message,
        detail: args.url,
        buttons: ["Copier", "Fermer"],
        type: "info",
      })
      .then((response) => {
        if (response.response === 0) clipboard.writeText(args.url);
      });
  });

  // ── Vérification des mises à jour ───────────────────────────────────────────
  ipcMain.on("checkUpdate", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  // ── Fixes transparence ──────────────────────────────────────────────────────
  window.on("focus", () => window.setBackgroundColor("#00000000"));
  window.on("blur", () => window.setBackgroundColor("#00000000"));
  window.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      window.hide();
    }
  });
};

// ── Auto updater ───────────────────────────────────────────────────────────────
autoUpdater.on("update-available", () => {
  if (!window) return;
  window.loadFile(__dirname + "/routes/update.html");
  window.setSize(450, 150, true);
  window.resizable = false;
  window.center();
  window.setAlwaysOnTop(true, "floating");
  window.webContents.send("update_available");
});
autoUpdater.on("download-progress", (progressObj) => {
  if (!window) return;
  window.webContents.send(
    "update_download_progress",
    progressObj.percent.toFixed(2),
  );
});
autoUpdater.on("update-downloaded", () => {
  if (!window) return;
  window.webContents.send("update_downloaded");
  setTimeout(() => {
    app.isQuiting = true;
    autoUpdater.quitAndInstall();
  }, 5000);
});

// ── Radio cachée ───────────────────────────────────────────────────────────────
const createRadio = () => {
  hiddenRadioWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
  });
  hiddenRadioWindow.loadFile(`${__dirname}/routes/hiddenradio.html`);

  ipcMain.on("NGRadio-state-changed", () => {
    if (!hiddenRadioWindow || hiddenRadioWindow.isDestroyed()) {
      hiddenRadioWindow = new BrowserWindow({
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          devTools: false,
        },
      });
      hiddenRadioWindow.loadFile(__dirname + "/routes/hiddenradio.html");
    }
    hiddenRadioWindow.webContents.send("NGRadio-playpause");
  });

  ipcMain.on("NGRadio-volume", (event, volume) => {
    hiddenRadioWindow.webContents.send("NGRadio-volume", volume);
    data.NGRadioVolume = volume;
  });
};

// ── Instance unique ────────────────────────────────────────────────────────────
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (window) {
      if (window.isMinimized()) window.restore();
      if (!window.isVisible()) window.show();
      window.focus();
    }
  });
}

// ── Démarrage ──────────────────────────────────────────────────────────────────
app.whenReady().then(async () => {
  // Nettoyer le PID de jeu au démarrage
  if (store.get("GamePID")) {
    try {
      process.kill(store.get("GamePID"));
    } catch (e) {}
    store.delete("GamePID");
  }

  // Tray
  const tray = new Tray(__dirname + "/images/tray.png");
  tray.setToolTip("NationsGlory");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Check Update",
        click: () => autoUpdater.checkForUpdatesAndNotify(),
      },
      {
        label: "Quitter",
        type: "normal",
        click: () => {
          app.isQuiting = true;
          app.quit();
        },
      },
    ]),
  );
  tray.on("click", () => {
    if (window.isMinimized()) window.restore();
    if (!window.isVisible()) window.show();
  });

  // Fix CSP pour Twitch iframes
  session.defaultSession.webRequest.onHeadersReceived(
    { urls: ["https://player.twitch.tv/*", "https://embed.twitch.tv/*"] },
    (details, cb) => {
      const responseHeaders = details.responseHeaders;
      delete responseHeaders["Content-Security-Policy"];
      cb({ cancel: false, responseHeaders });
    },
  );

  // Discord RPC
  await rpc.login({ clientId }).catch(console.error);
  rpc.setActivity({}).catch(console.error);

  ipcMain.on("set-discord-presence", (event, arg) => {
    rpc
      .setActivity({
        state: arg.state,
        details: arg.details,
        startTimestamp: arg.startTimestamp,
        largeImageKey: arg.largeImageKey,
        largeImageText: arg.largeImageText,
        smallImageKey: arg.smallImageKey,
        smallImageText: arg.smallImageText,
        instance: arg.instance,
        buttons: arg.buttons,
      })
      .catch(console.error);
  });

  // Création fenêtre + radio
  createWindow();
  createRadio();
  autoUpdater.checkForUpdatesAndNotify();

  if (process.platform === "win32") app.setAppUserModelId(app.name);

  app.on("will-quit", () => rpc.destroy());

  app.on("before-quit", () => {
    if (store.get("GamePID")) {
      try {
        process.kill(store.get("GamePID"));
      } catch (e) {}
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
