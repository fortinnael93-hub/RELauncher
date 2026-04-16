const {
  app,
  BrowserWindow,
  ipcMain,
  session,
  globalShortcut,
  Menu,
  Tray,
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

let mainWindow;
let hiddenRadioWindow;
let modalWindow;

let versionFromStore = store.get("version") || "stable";

const clientId = "450747976868954113";
DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: "ipc" });
let rpcReady = false; // ✅ garde une trace si RPC est connecté

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

// ── Instance unique ─────────────────────────────────────────────────────────
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });
}

// ── Traduction ──────────────────────────────────────────────────────────────
ipcMain.handle("translate", async (event, text, lang) => {
  if (lang === "fr") return text;
  try {
    const res = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "fr",
      target: lang,
      format: "text",
    });
    return res.data.translatedText;
  } catch (e) {
    console.error("translate error:", e.message);
    return text;
  }
});

// ── Radio cachée ────────────────────────────────────────────────────────────
// ✅ Les listeners ipcMain.on sont enregistrés UNE SEULE FOIS ici
let radioListenersRegistered = false;

const createRadio = () => {
  if (hiddenRadioWindow && !hiddenRadioWindow.isDestroyed()) return;

  hiddenRadioWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
  });
  hiddenRadioWindow.loadFile(`${__dirname}/routes/hiddenradio.html`);

  // ✅ On n'enregistre les listeners qu'une seule fois
  if (!radioListenersRegistered) {
    radioListenersRegistered = true;

    ipcMain.on("NGRadio-state-changed", () => {
      if (!hiddenRadioWindow || hiddenRadioWindow.isDestroyed()) {
        createRadio();
      }
      hiddenRadioWindow.webContents.send("NGRadio-playpause");
    });

    ipcMain.on("NGRadio-volume", (event, volume) => {
      if (hiddenRadioWindow && !hiddenRadioWindow.isDestroyed()) {
        hiddenRadioWindow.webContents.send("NGRadio-volume", volume);
      }
      data.NGRadioVolume = volume;
    });
  }
};

// ── Création de la fenêtre principale ───────────────────────────────────────
const createWindow = () => {
  mainWindow = new BrowserWindow({
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

  mainWindow.show();

  function loadWindow(file, width, height) {
    mainWindow.loadFile(`${__dirname}/routes/${file}`);
    mainWindow.setSize(width, height, true);
    mainWindow.setMinimumSize(width, height);
    mainWindow.center();
  }

  loadWindow(
    store.get("authtoken") ? "login_loading.html" : "login.html",
    540,
    670,
  );

  // ── Navigation ────────────────────────────────────────────────────────────
  ipcMain.handle("main", () => loadWindow("main.html", 1366, 768));
  ipcMain.handle("login", () => loadWindow("login.html", 540, 690));
  ipcMain.handle("loginLoading", () =>
    loadWindow("login_loading.html", 540, 670),
  );
  ipcMain.handle("doubleAuth", () => loadWindow("sendsms.html", 610, 602));
  ipcMain.handle("loginCode", () => loadWindow("login.html", 540, 670));

  // ── Changement de route ───────────────────────────────────────────────────
  ipcMain.handle("changeroute", (e, route) => {
    if (data["currentRoute"] !== route) {
      data["currentRoute"] = route;

      if (route === "radio") {
        globalShortcut.register("MediaPlayPause", () => {
          mainWindow.webContents.send(
            "data-change",
            "TriggerNGRadio",
            !data["NGRadioPlaying"],
          );
        });
      } else {
        globalShortcut.unregisterAll();
      }

      mainWindow.webContents.send("route", route + ".html");
    }
  });

  // ── Store persistant ──────────────────────────────────────────────────────
  ipcMain.handle("store", (e, type, value) => {
    store.set(type, value);
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send("store-change", type, value);
    });
    if (type === "authtoken") data["authtoken"] = value;
    if (type === "lang") data["lang"] = value;
  });

  // ── Données non persistantes ──────────────────────────────────────────────
  ipcMain.on("get-data", (event, key) => {
    event.returnValue = data[key];
  });
  ipcMain.on("set-data", (event, key, value) => {
    data[key] = value;
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send("data-change", key, value);
    });
    // ✅ createRadio uniquement si pas déjà créée
    if (
      key === "NGRadioPlaying" &&
      (!hiddenRadioWindow || hiddenRadioWindow.isDestroyed())
    ) {
      createRadio();
    }
  });

  // ── Contrôles fenêtre ─────────────────────────────────────────────────────
  ipcMain.on("WindowMinimize", () => mainWindow.minimize());
  ipcMain.on("WindowMaximize", () =>
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize(),
  );
  ipcMain.on("WindowClose", () => mainWindow.hide());

  // ── Liens externes ────────────────────────────────────────────────────────
  ipcMain.on("open-external-link", (event, url) => {
    shell.openExternal(url);
  });

  // ── Dialogue dossier ──────────────────────────────────────────────────────
  ipcMain.handle("dialog:openDirectory", async () => {
    return dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
  });

  // ── Fenêtre modale ────────────────────────────────────────────────────────
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
    mainWindow.webContents.send("route", "accounts.html");
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

  // ── Déconnexion ───────────────────────────────────────────────────────────
  ipcMain.handle("logout", () => {
    ["authtoken", "username", "accounts"].forEach((key) => store.delete(key));
    if (hiddenRadioWindow && !hiddenRadioWindow.isDestroyed()) {
      hiddenRadioWindow.close();
      hiddenRadioWindow = null;
    }
    // ✅ On vérifie que RPC est prêt avant d'appeler setActivity
    if (rpcReady) rpc.setActivity({}).catch(console.error);
    loadWindow("login.html", 540, 670);
  });

  // ── Dialogue message ──────────────────────────────────────────────────────
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

  // ── Mises à jour ──────────────────────────────────────────────────────────
  ipcMain.on("checkUpdate", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  // ── Discord presence depuis renderer ──────────────────────────────────────
  ipcMain.on("set-discord-presence", (event, arg) => {
    if (!rpcReady) return; // ✅ Ne plante pas si Discord est fermé
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

  // ── Fixes transparence ────────────────────────────────────────────────────
  mainWindow.on("focus", () => mainWindow.setBackgroundColor("#00000000"));
  mainWindow.on("blur", () => mainWindow.setBackgroundColor("#00000000"));
  mainWindow.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

// ── Auto updater ─────────────────────────────────────────────────────────────
autoUpdater.on("update-available", () => {
  if (!mainWindow) return;
  mainWindow.loadFile(__dirname + "/routes/update.html");
  mainWindow.setSize(450, 150, true);
  mainWindow.resizable = false;
  mainWindow.center();
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("download-progress", (progressObj) => {
  if (!mainWindow) return;
  mainWindow.webContents.send(
    "update_download_progress",
    progressObj.percent.toFixed(2),
  );
});
autoUpdater.on("update-downloaded", () => {
  if (!mainWindow) return;
  mainWindow.webContents.send("update_downloaded");
  setTimeout(() => {
    app.isQuiting = true;
    autoUpdater.quitAndInstall();
  }, 5000);
});

// ── Démarrage ─────────────────────────────────────────────────────────────────
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
  tray.setToolTip("ReLaunch");
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
    if (mainWindow.isMinimized()) mainWindow.restore();
    if (!mainWindow.isVisible()) mainWindow.show();
  });

  // ── Redirection auth vers API custom ────────────────────────────────────
  const { API_URL } = require("./js/config");
  session.defaultSession.webRequest.onBeforeRequest(
    {
      urls: [
        API_URL + "/v2/auth/*",
        API_URL + "/v2/reauth*",
        API_URL + "/v2/disconnect*",
        API_URL + "/v2/send2auth*",
      ],
    },
    (details, callback) => {
      const newUrl = details.url.replace(
        "https://authserver.nationsglory.fr",
        API_URL,
      );
      callback({ redirectURL: newUrl });
    },
  );

  // Autoriser nmsr.life pour les renders 3D de skins
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ["https://api.nmsr.life/*"] },
    (details, callback) => {
      callback({ requestHeaders: details.requestHeaders });
    },
  );

  // Fix CSP pour Twitch iframes
  session.defaultSession.webRequest.onHeadersReceived(
    { urls: ["https://player.twitch.tv/*", "https://embed.twitch.tv/*"] },
    (details, cb) => {
      const responseHeaders = details.responseHeaders;
      delete responseHeaders["Content-Security-Policy"];
      cb({ cancel: false, responseHeaders });
    },
  );

  // ✅ Discord RPC — ne bloque pas si Discord est fermé
  try {
    await rpc.login({ clientId });
    rpcReady = true;
    rpc.setActivity({}).catch(console.error);
    console.log("Discord RPC connecté.");
  } catch (e) {
    rpcReady = false;
    console.warn("Discord RPC non disponible (Discord fermé ?):", e.message);
  }

  // Création fenêtre
  createWindow();
  // ✅ createRadio() appelée UNE SEULE FOIS ici, pas dans createWindow
  createRadio();

  autoUpdater.checkForUpdatesAndNotify();

  if (process.platform === "win32") app.setAppUserModelId(app.name);

  app.on("will-quit", () => {
    if (rpcReady) rpc.destroy();
  });

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
