const ipcRenderer = window.require("electron").ipcRenderer;

// Imports globaux (sans const/let pour être accessibles partout)
Store = require("electron-store");
axios = require("axios");
fs = require("fs");
fsp = fs.promises;
path = require("path");
os = require("os");
platform = os.platform();
arch = os.arch();

// Détermine l'OS/arch pour le launcher
let osArchInfo;
if (platform === "win32" && arch === "x64") osArchInfo = "windows64";
else if (platform === "win32" && arch === "ia32") osArchInfo = "windows32";
else if (platform === "darwin" && arch === "arm64") osArchInfo = "macarm";
else if (platform === "darwin" && arch === "x64") osArchInfo = "macintel";
else if (platform === "linux" && arch === "x64") osArchInfo = "linux64";
else if (platform === "linux" && arch === "ia32") osArchInfo = "linux32";

const crypto = require("crypto");

// Store initialisé ICI avant tout le reste
const store = new Store();
window.store = store;

// Variables globales
let authtoken = store.get("authtoken");
let username = store.get("username");
let accounts = store.get("accounts") ?? [];
let lang = store.get("lang") ?? "fr";
let max_ram = store.get("maxram");
if (max_ram === undefined || max_ram === null) max_ram = 2;
window.authtoken = authtoken;
window.username = username;
window.accounts = accounts;
window.lang = lang;
window.max_ram = max_ram;

const { machineIdSync } = require("node-machine-id");
const cuidUser = machineIdSync();
window.cuidUser = cuidUser;
const getmac = require("getmac");
const mac = getmac.default();
const hddserial = require("hddserial");
const instance = axios.create();

const totalMemoryBytes = os.totalmem();
const totalMemory = totalMemoryBytes / (1024 * 1024 * 1024);
const CACHE_EXPIRATION_TIME = 1 * 60 * 1000;

let version = store.get("currentVersion");
if (version === undefined) version = "stable";

let optmods = store.get("optmods") ?? [];

// Écoute les changements de store depuis le main process
ipcRenderer.on("store-change", (event, key, value) => {
  if (key === "username") {
    username = value;
    window.username = value;
  }
  if (key === "authtoken") {
    authtoken = value;
    window.authtoken = value;
  }
  if (key === "lang") {
    lang = value;
    window.lang = value;
  }
});

let API_RADIO = "https://refuge-api.onrender.com/radio/api";
let consoleContent = "";

function displayConsoleInDiv(text) {
  consoleContent += "<p>" + text + "</p>";
  let consoleDiv = document
    .getElementById("framecontent")
    ?.contentDocument?.getElementById("console");
  if (consoleDiv) {
    const isAtBottom =
      consoleDiv.scrollHeight - consoleDiv.scrollTop ===
      consoleDiv.clientHeight;
    consoleDiv.innerHTML += "<p>" + text + "</p>";
    if (isAtBottom) consoleDiv.scrollTop = consoleDiv.scrollHeight;
  }
}

window.getConsoleContent = function () {
  return consoleContent;
};

document.addEventListener("DOMContentLoaded", function () {
  // Sidebar liens actifs
  updateSidebarAvatar();
  const sidebarItems = document.querySelectorAll("#sidebar li");
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Menu liens actifs
  const menuItems = document.querySelectorAll("#menu li");
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      menuItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

function logout() {
  // Appelle la déconnexion puis redirige vers login
  ipcRenderer.invoke("logout");
}

ipcRenderer.on("route", (event, route) => {
  document.getElementById("framecontent").src = path.join(__dirname, route);
});

function ChangeRoute(route) {
  ipcRenderer.invoke("changeroute", route);
}

async function fetchDataFromApi(url, maxRetries = 3) {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const response = await instance.get(url);
      const timestamp = Date.now();
      store.set("apiCache" + url, { data: response.data, timestamp });
      return response.data;
    } catch (err) {
      console.log("Attempt " + (attempts + 1) + " failed: " + err.message);
      attempts++;
      if (attempts === maxRetries)
        throw new Error("Maximum retry attempts reached.");
    }
  }
}

async function getCachedDataOrFetch(url, forceRefresh = false) {
  const cached = store.get("apiCache" + url);
  if (
    cached &&
    Date.now() - cached.timestamp < CACHE_EXPIRATION_TIME &&
    !forceRefresh
  ) {
    return cached.data;
  }
  return await fetchDataFromApi(url);
}

const {
  translateAndSave: _translateAndSave,
  translatePageElements,
} = require("../js/translate");
window.translateAndSave = _translateAndSave;
translatePageElements(lang);

async function updateSidebarAvatar() {
  try {
    const response = await axios.post(
      "https://refuge-api.onrender.com/launcher/skins",
      {
        action: "getlist",
        authtoken: authtoken,
        cuid: cuidUser,
        username: username,
      },
    );

    const skins = response.data;
    if (!skins || skins.length === 0) return;

    const selectedSkin = skins.find((s) => s.selected == 1);
    if (!selectedSkin || !selectedSkin.skin_file) return;

    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const scale = 4;
      canvas.width = 8 * scale;
      canvas.height = 8 * scale;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 8, 8, 8, 8, 0, 0, 8 * scale, 8 * scale);

      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const avatarImg = document.getElementById("#avatar img");
        if (avatarImg) avatarImg.src = url;
      });
    };
    img.src = selectedSkin.skin_file;
  } catch (err) {
    console.error("Failed to update avatar:", err);
  }
}
