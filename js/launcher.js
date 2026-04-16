// ── Déobfusqué et corrigé ────────────────────────────────

const API_HOME = "https://refuge-api.onrender.com/launcher/home";
console.log("API =", window.api);

async function launchGame() {
  if (minecraftLaunched) return;
  const version = ipcRenderer.sendSync("get-data", "currentVersion");
  console.log("Lancement de la version : " + version);
  console.log("AVANT POSTMESSAGE");
  window.api.send("launchGame", version);
  console.log("APRES POSTMESSAGE");
}

let minecraftLaunched = false;

async function getVersion() {
  return ipcRenderer.sendSync("get-data", "currentVersion");
}

// Écoute les changements de version
ipcRenderer.on("data-change", (event, key, value) => {
  if (key === "currentVersion") version = value;
});

// Chargement principal
window.onload = async function () {
  // Envoie le signal checkUpdate
  ipcRenderer.send("checkUpdate");

  // Vérifie si le jeu tourne déjà
  const gamePID = store.get("GamePID");
  if (pidIsRunning(gamePID)) {
    const actionBtn = document.getElementById("actionButton");
    if (actionBtn) {
      actionBtn.style.color = "#737373";
      actionBtn.innerHTML = await translateAndSave("Jeu en cours", lang);
      minecraftLaunched = true;
    }
  }

  // Affiche la version du launcher
  const versionEl = document.getElementById("version");
  if (versionEl) {
    versionEl.innerHTML = ipcRenderer.sendSync("get-data", "launcherVersion");
  }

  const currentVersion = await getVersion();

  try {
    const data = await getCachedDataOrFetch(
      API_HOME +
        "?lang=" +
        lang +
        "&cuid=" +
        cuidUser +
        "&authtoken=" +
        authtoken,
    );

    if (!data) return;

    // [1] Alerte
    // L'API retourne : { alert: bool, message: string, type: string }
    const alertData = data[1];
    if (alertData && alertData.alert === true) {
      const messageBox = document.getElementById("messageBox");
      const alertMsg = document.getElementById("alerteMessage");
      if (messageBox && alertMsg) {
        messageBox.style.display = "flex";
        alertMsg.innerHTML = alertData.message;
        messageBox.classList.remove(
          "type_danger",
          "type_warning",
          "type_infos",
        );
        if (alertData.type === "infos") messageBox.classList.add("type_infos");
        else if (alertData.type === "danger")
          messageBox.classList.add("type_danger");
        else messageBox.classList.add("type_warning");
      }
    }

    // [4] Joueurs connectés
    // L'API retourne : { players: number }
    const totalPlayersEl = document.getElementById("totalPlayers");
    if (totalPlayersEl) {
      totalPlayersEl.innerHTML = data[4].players;
    }

    // [3] Lien patchnote
    // L'API retourne : { link: string }
    const linkUpdateEl = document.getElementById("linkUpdate");
    if (linkUpdateEl) {
      linkUpdateEl.innerHTML =
        "<span onclick=\"getExternalLink('" +
        data[3].link +
        "')\">" +
        (await translateAndSave("Notes de mise à jour", lang)) +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
        '<path d="M14 6.00001L14 2.00001M14 2.00001H9.99999M14 2.00001L8 8M6.66667 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.07989 14 5.2 14H10.8C11.9201 14 12.4802 14 12.908 13.782C13.2843 14 13.5903 13.2843 13.782 12.908C14 12.4802 14 11.9201 14 10.8V9.33333" ' +
        'stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    }

    // [5] Versions disponibles
    // L'API retourne : { tags: string[], backgrounds: {} }
    const versionsEl = document.getElementById("versions");
    if (versionsEl) {
      versionsEl.innerHTML = "";
      const backgrounds = data[6]?.backgrounds || {};

      data[5].tags.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag;
        option.text = tag;
        if (tag === currentVersion) option.selected = true;
        versionsEl.appendChild(option);
      });

      // Change le fond selon le modpack sélectionné
      function applyBackground(version) {
        const bg = backgrounds[version];
        const newsEl = document.getElementById("content");
        if (newsEl) {
          newsEl.style.backgroundImage = bg
            ? `url('${bg}')`
            : 'url("https://refuge-api.onrender.com/proxy_images/launcher")';
        }
      }

      // Applique au chargement
      applyBackground(currentVersion || data[5].tags[0]);

      versionsEl.addEventListener("change", function () {
        const selectedVersion = versionsEl.value;
        ipcRenderer.invoke("store", "version", selectedVersion);
        ipcRenderer.send("set-data", "currentVersion", selectedVersion);
        version = selectedVersion;
        applyBackground(selectedVersion);
      });
    }

    // [2] Article / news  — L'API retourne l'objet directement (pas data[2].article)
    // { title, description, thumbnail, url, tags, date }
    const article = data[2];

    // [0] Vidéo  — L'API retourne l'objet directement (pas data[0].video)
    // { url, thumbnail }
    const video = data[0];

    let tagsList = "";
    (article.tags || "").split(",").forEach((tag) => {
      if (tag.trim()) tagsList += "<li>" + tag.trim() + "</li>";
    });

    const newsEl = document.getElementById("news");
    if (newsEl) {
      newsEl.innerHTML =
        "\n                    <div onclick=\"getExternalLink('" +
        article.url +
        "')\" " +
        "style=\"background-image: url('" +
        article.thumbnail +
        "')\">\n" +
        "                        <section>\n" +
        "                            <aside>\n" +
        "                                <ul>" +
        tagsList +
        "</ul>\n" +
        "                                <h3>" +
        article.title +
        "</h3>\n" +
        "                                <span>" +
        article.date +
        "</span>\n" +
        "                            </aside>\n" +
        "                        </section>\n" +
        "                    </div>" +
        "\n                    <div onclick=\"getExternalLink('" +
        video.url +
        "')\" " +
        "style=\"background-image: url('" +
        video.thumbnail +
        "')\">\n" +
        '                        <section><img src="../images/Icon_Video.svg" alt=""/></section>\n' +
        "                    </div>";
    }
  } catch (err) {
    console.log("Error fetching launcher home data:", err);
  }
};

console.log("window.parent =", window.parent === window);
console.log("window.opener =", window.opener);

window.addEventListener("message", (event) => {
  console.log("MESSAGE RECU :", event.data);
});
