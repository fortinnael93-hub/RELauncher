const BASE_DIR = getBaseDirectory();

function getBaseDirectory() {
  let dir;
  switch (os.platform()) {
    case "win32":
      let appdata =
        process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
      if (!appdata.endsWith(path.sep)) appdata += path.sep;
      dir = path.join(appdata, ".NationsGlory");
      break;
    case "darwin":
      dir = path.join(
        os.homedir(),
        "Library",
        "Application Support",
        ".NationsGlory",
      );
      break;
    default:
      dir = path.join(os.homedir(), ".config", ".NationsGlory");
      break;
  }
  return path.normalize(dir);
}

async function getAvailableVersions() {
  const versionsDir = path.join(BASE_DIR, "versions");
  const entries = await fsp.readdir(versionsDir);
  return entries.filter((e) => e !== "temp");
}

function directoryExists(dirPath) {
  return fs.existsSync(dirPath);
}

function setupLanguageSelector() {
  const selector = document.getElementById("languageSelector");
  if (!selector) return;
  selector.value = lang;
  selector.addEventListener("change", (e) => {
    ipcRenderer.invoke("store", "lang", e.target.value);
    ipcRenderer.invoke("changeroute", "launcher");
  });
}

function setupSettingButton() {
  const settingBtn = document.querySelector(".setting");
  const actionBtn = document.querySelector(".setting-action button");
  const details = document.querySelector(".setting-details");
  const actionImg = document.querySelector(".setting-action button img");
  if (!actionBtn) return;

  settingBtn.addEventListener("click", () => {
    const isHidden = !details.style.display || details.style.display === "none";
    details.style.display = isHidden ? "flex" : "none";
    isHidden
      ? actionImg.classList.add("rotated")
      : actionImg.classList.remove("rotated");
  });
}

function setupRamRange() {
  const ramRange = document.getElementById("ram-range");
  if (!ramRange) return;

  const maxRam = Math.floor(totalMemory);
  document.getElementById("ram-range").value = max_ram;
  document.getElementById("ram-range").max = maxRam;
  document.getElementById("current-value").textContent = max_ram;
  document.getElementById("max-value").textContent = maxRam;

  ramRange.addEventListener("input", () => {
    document.getElementById("current-value").textContent = ramRange.value;
    ipcRenderer.invoke("store", "maxram", ramRange.value);
  });
}

function computeFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("md5");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (err) => reject(err));
  });
}

async function findFileByHash(dir, targetHash) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      const filePath = path.join(dir, entry.name);
      const hash = await computeFileHash(filePath);
      if (hash === targetHash) return filePath;
    }
  }
  return null;
}

async function populateModsContainer(currentVersion) {
  const container = document.getElementById("modsContainer");
  if (!container) return;

  const modsPath = path.join(BASE_DIR, "versions", currentVersion, "mods");
  if (!directoryExists(modsPath)) {
    container.innerHTML = await translateAndSave(
      "<p>Lance une première fois le jeu pour accéder à cette partie.</p>",
      lang,
    );
    return;
  }

  const versions = await getAvailableVersions();
  const modsDirs = versions.map((v) =>
    path.join(BASE_DIR, "versions", v, "mods"),
  );
  const presence = await checkModsPresenceInDirs(modsDirs);
  const allowedMods = await getCachedDataOrFetch(
    `https://refuge-api.onrender.com/launcher/getMoreMods?token=${authtoken}&cuid=${cuidUser}&lang=${lang}`,
    true,
  );

  displayMods(container, versions, allowedMods, presence);
}

async function checkModsPresenceInDirs(dirs) {
  const result = {};
  for (const dir of dirs) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const filePath = path.join(dir, entry.name);
        const hash = await computeFileHash(filePath);
        result[hash] = true;
      }
    }
  }
  return result;
}

async function displayMods(container, versions, mods, presence) {
  container.innerHTML = "";
  mods.sort((a, b) => b.recommended - a.recommended);

  for (let i = 0; i < mods.length; i++) {
    const mod = mods[i];
    const element = await createModElement(mod, i, presence);
    container.appendChild(element);
    addModCheckboxEventListener(element, mod, versions);
  }
}

async function createModElement(mod, index, presence) {
  const el = document.createElement("div");
  el.className = "moremod";
  el.setAttribute("data-hash", mod.hash);

  const isActive = presence && presence[mod.hash] && optmods.includes(mod.hash);
  if (isActive) el.classList.add("active");

  const checkboxId = "c" + index + "-Checkbox";
  el.innerHTML = `
        <input type="checkbox" id="${checkboxId}" class="moremod-checkbox" ${isActive ? "checked" : ""}>
        <label for="${checkboxId}" class="moremod-label"></label>
        <div class="moremod-info">
            <h1>${mod.name} ${mod.recommended ? '<span class="badge-info">' + (await translateAndSave("Recommendé", lang)) + "</span>" : ""}</h1>
            <p>${mod.description}</p>
        </div>`;
  return el;
}

function addModCheckboxEventListener(el, mod, versions) {
  const checkbox = el.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", async function () {
    await handleModCheckboxChange(this, mod, versions);
  });
}

async function handleModCheckboxChange(checkbox, mod, versions) {
  const versionDirs = versions.map((v) => path.join(BASE_DIR, "versions", v));
  for (const dir of versionDirs) {
    const optmodsDir = path.join(dir, "opt-mods");
    const modsDir = path.join(dir, "mods");
    await moveModFile(checkbox, mod, optmodsDir, modsDir);
  }
}

async function moveModFile(checkbox, mod, optmodsDir, modsDir) {
  const sourceDir = checkbox.checked ? optmodsDir : modsDir;
  const destDir = checkbox.checked ? modsDir : optmodsDir;

  const found = await findFileByHash(sourceDir, mod.hash);
  const el = document.querySelector(`.moremod[data-hash="${mod.hash}"]`);
  if (el)
    checkbox.checked
      ? el.classList.add("active")
      : el.classList.remove("active");

  if (found) {
    const dest = path.join(destDir, path.basename(found));
    try {
      await fsp.rename(found, dest);
      console.log(
        `Successfully ${checkbox.checked ? "moved" : "removed"} ${mod.name} with hash ${mod.hash}`,
      );
      updateOptmods(checkbox.checked, mod.hash);
      ipcRenderer.invoke("store", "optmods", optmods);
    } catch (err) {
      console.error("Error moving file:", err);
    }
  }
}

async function repareng() {
  try {
    const dir = getBaseDirectory();
    const exists = await fsp
      .access(dir, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      await fsp.rm(dir, { recursive: true, force: true });
      alert(await translateAndSave("Opération terminée", lang));
    } else {
      console.log("The directory " + dir + " does not exist.");
    }
  } catch (err) {
    console.error(
      "An error occurred while trying to delete the directory:",
      err,
    );
  }
}

function updateOptmods(add, hash) {
  if (add) {
    optmods.push(hash);
  } else {
    optmods = optmods.filter((h) => h !== hash);
  }
}

(async function () {
  try {
    setupLanguageSelector();
    setupSettingButton();
    setupRamRange();
    await populateModsContainer(version);
  } catch (err) {
    console.error("An error occurred during initialization:", err);
  }
})();
