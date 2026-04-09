/**
 * launcher.js — Écran principal du launcher
 * Récupère les données depuis l'API custom
 */

const { ipcRenderer } = require("electron");
const Store = require("electron-store");
const { API_URL } = require("../js/config");

const store = new Store();

let minecraftLaunched = false;

// ── Lancer le jeu ─────────────────────────────────────────
async function launchGame() {
  if (minecraftLaunched) return;

  const version = ipcRenderer.sendSync("get-data", "version");
  console.log("Lancement de la version :", version);
  parent.postMessage({ action: "launchGame", version: version }, "*");
}

// ── Récupérer la version actuelle ─────────────────────────
async function getVersion() {
  return ipcRenderer.sendSync("get-data", "version");
}

// ── Écouter les changements de version depuis main.js ────
ipcRenderer.on("data-change", (event, key, value) => {
  if (key === "version") version = value;
});

// ── Cache simple ──────────────────────────────────────────
const cache = {};
async function getCachedDataOrFetch(url) {
  if (cache[url] && Date.now() - cache[url].time < 60000)
    return cache[url].data;

  const token = store.get("authtoken") || "";
  const lang = store.get("lang") || "fr";

  if (!token) {
    console.warn("Aucun token trouvé, veuillez vous connecter.");
    return null;
  }

  // Fix: éviter le doublon de lang — construire l'URL proprement
  const separator = url.includes("?") ? "&" : "?";
  const fullUrl = `${url}${separator}token=${token}&lang=${lang}`;
  const resp = await fetch(fullUrl);
  if (resp.status === 401) {
    console.error("Token invalide ou expiré !");
    // Option : rediriger vers login ici
    return null;
  }

  const data = await resp.json();
  cache[url] = { data, time: Date.now() };
  return data;
}

// ── Initialisation de la page ─────────────────────────────
window.onload = async function () {
  ipcRenderer.send("checkUpdate");

  // Fond par défaut
  const content = document.getElementById("content");
  if (content)
    content.style.backgroundImage = 'url("../images/Background.png")';

  // Vérifier si le jeu tourne déjà
  const pid = store.get("GamePID");
  if (pid) {
    const btn = document.getElementById("actionButton");
    if (btn) {
      btn.style.background = "#737373";
      btn.innerHTML = "Jeu en cours";
      minecraftLaunched = true;
    }
  }

  // Version du launcher
  const versionEl = document.getElementById("version");
  if (versionEl)
    versionEl.innerHTML = ipcRenderer.sendSync("get-data", "launcherVersion");

  const currentVersion = await getVersion();

  try {
    const data = await getCachedDataOrFetch(`${API_URL}/launcher/home?lang=fr`);
    if (!data) return;

    // ── Alerte / message ──
    const alertData = data[1];
    if (alertData && alertData.alert) {
      const msgBox = document.getElementById("messageBox");
      const msgTxt = document.getElementById("alerteMessage");
      if (msgBox && msgTxt) {
        msgBox.style.display = "flex";
        msgTxt.innerHTML = alertData.message;
        msgBox.classList.remove("type_infos", "type_warning", "type_danger");
        msgBox.classList.add("type_" + (alertData.type || "infos"));
      }
    }

    // ── Joueurs connectés ──
    const playersEl = document.getElementById("totalPlayers");
    if (playersEl) playersEl.innerHTML = data[4]?.players || 0;

    // ── Lien patchnote ──
    const linkUpdate = document.getElementById("linkUpdate");
    if (linkUpdate && data[3]?.link) {
      linkUpdate.innerHTML = `<span onclick="getExternalLink('${data[3].link}')" style="cursor:pointer">Notes de mise à jour ↗</span>`;
    }

    // ── Versions ──
    const versionsEl = document.getElementById("versions");
    if (versionsEl && data[5]?.tags) {
      versionsEl.innerHTML = "";
      data[5].tags.forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.innerHTML = v;
        if (v === currentVersion) opt.selected = true;
        versionsEl.appendChild(opt);
      });

      versionsEl.addEventListener("change", function () {
        const val = versionsEl.value;
        ipcRenderer.sendSync("set-data", "version", val);
        ipcRenderer.send("set-data", "version", val);
        version = val;
      });
    }

    // ── News / article ──
    const newsEl = document.getElementById("news");
    const article = data[2];
    if (newsEl && article) {
      const tags = (article.tags || "")
        .split(",")
        .map((t) => `<li>${t.trim()}</li>`)
        .join("");
      newsEl.innerHTML = `
        <div onclick="getExternalLink('${article.url || "#"}')"
             style="background-image: url('${article.thumbnail || ""}');">
            <section>
                <aside>
                    <ul>${tags}</ul>
                    <h3>${article.title}</h3>
                    <span>${article.date ? new Date(article.date).toLocaleDateString(store.get("lang") || "fr") : ""}</span>
                </aside>
            </section>
        </div>`;
    }
  } catch (err) {
    console.error("[launcher] Erreur chargement données:", err);
  }
};
