/**
 * settings.js — Gestion des paramètres du launcher
 */

if (typeof ipcRenderer === "undefined")
  var ipcRenderer = require("electron").ipcRenderer;
if (typeof Store === "undefined") var Store = require("electron-store");
if (typeof store === "undefined") var store = new Store();

const DEFAULTS = {
  lang: "fr",
  max_ram: 4,
  min_ram: 1,
  java_path: "",
  install_path: "",
  username: "",
  authtoken: "",
  version: "",
  launcherVersion: "1.0.0",
};

function loadSettings() {
  const langSelect = document.getElementById("lang");
  if (langSelect) {
    langSelect.value = store.get("lang") || DEFAULTS.lang;
    langSelect.addEventListener("change", () => {
      store.set("lang", langSelect.value);
      ipcRenderer.send("set-data", "lang", langSelect.value);
    });
  }

  const ramRange = document.getElementById("max_ram");
  const ramLabel = document.getElementById("ram_label");
  const savedRam = store.get("max_ram") || DEFAULTS.max_ram;
  if (ramRange) {
    ramRange.value = savedRam;
    if (ramLabel) ramLabel.innerText = savedRam + " Go";
    ramRange.addEventListener("input", () => {
      const val = parseInt(ramRange.value);
      if (ramLabel) ramLabel.innerText = val + " Go";
      store.set("max_ram", val);
      ipcRenderer.send("set-data", "max_ram", val);
    });
  }

  const javaInput = document.getElementById("java_path");
  if (javaInput) {
    javaInput.value = store.get("java_path") || DEFAULTS.java_path;
    javaInput.addEventListener("change", () => {
      store.set("java_path", javaInput.value);
      ipcRenderer.send("set-data", "java_path", javaInput.value);
    });
  }

  const installInput = document.getElementById("install_path");
  if (installInput) {
    installInput.value = store.get("install_path") || DEFAULTS.install_path;
    installInput.addEventListener("change", () => {
      store.set("install_path", installInput.value);
      ipcRenderer.send("set-data", "install_path", installInput.value);
    });
  }

  const usernameEl = document.getElementById("settings_username");
  if (usernameEl) usernameEl.innerText = store.get("username") || "—";
}

function browsePath(inputId) {
  ipcRenderer.invoke("dialog:openDirectory").then((result) => {
    if (result && !result.canceled && result.filePaths.length > 0) {
      const selectedPath = result.filePaths[0];
      const input = document.getElementById(inputId);
      if (input) {
        input.value = selectedPath;
        store.set(inputId, selectedPath);
        ipcRenderer.send("set-data", inputId, selectedPath);
      }
    }
  });
}

function resetSettings() {
  if (!confirm("Réinitialiser tous les paramètres ?")) return;
  Object.entries(DEFAULTS).forEach(([key, value]) => {
    store.set(key, value);
    ipcRenderer.send("set-data", key, value);
  });
  loadSettings();
}

function logout() {
  store.delete("authtoken");
  store.delete("username");
  // Bug fix: send au lieu de invoke — main.js écoute via ipcMain.handle("logout")
  ipcRenderer.invoke("logout");
  window.ChangeRoute && ChangeRoute("login");
}

window.addEventListener("DOMContentLoaded", () => loadSettings());

ipcRenderer.on("store-change", (event, key, value) => {
  store.set(key, value);
  loadSettings();
});

window.browsePath = browsePath;
window.resetSettings = resetSettings;
window.logout = logout;
window.loadSettings = loadSettings;
