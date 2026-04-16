const API_BASE_SKINS = "https://refuge-api.onrender.com/launcher/skins";

// ── API ───────────────────────────────────────────────────
async function skinApi(action, extra = {}) {
  const response = await axios.post(API_BASE_SKINS, {
    action,
    accessToken: authtoken,
    cuid: cuidUser,
    username: username,
    ...extra,
  });
  return response.data;
}

// ── Chargement initial ────────────────────────────────────
window.onload = async function () {
  try {
    const skinsData = await skinApi("getlist");

    if (!skinsData || skinsData === "" || skinsData.length === 0) {
      updateAvatar(null);
      displayNoSkinsMessage();
    } else {
      const selectedSkinId = getSelectedSkinId(skinsData);
      await renderSkinsList(skinsData, selectedSkinId);
    }
  } catch (err) {
    console.error("Error loading skins:", err);
  }
};

// ── Helpers ───────────────────────────────────────────────
function getSelectedSkinId(skins) {
  for (let i = 0; i < skins.length; i++) {
    if (skins[i].selected == 1) return skins[i].skin_id;
  }
  return null;
}

async function displayNoSkinsMessage() {
  const list = document.getElementById("skinsList");
  list.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = await translateAndSave(
    "Aucun skin disponible. Télécharge un skin pour commencer !",
    lang,
  );
  p.className = "no-skins-message";
  list.appendChild(p);
}

// ── Avatar principal (page skins) + sidebar parent ────────
async function updateAvatar(skinFile, skinId) {
  const avatarEl = document.getElementById("skin");

  if (!skinFile) {
    if (avatarEl) {
      const timestamp = new Date().getTime();
      avatarEl.src = `https://skins.nationsglory.fr/body/${store.get("username")}/3d/10?${timestamp}`;
    }
    // Pas de skin sélectionné → on notifie quand même le parent pour reset
    window.parent.postMessage({ action: "refreshAvatar", skinFile: null }, "*");
    return;
  }

  try {
    // Charge le skin, efface overlay, envoie à visage pour rendu full 3D
    const skinResp = await axios.get(skinFile, { responseType: "arraybuffer" });
    const tmpCanvas = document.createElement("canvas");
    const tmpImg2 = await new Promise((res) => {
      const i = new Image();
      i.onload = () => res(i);
      i.src = URL.createObjectURL(
        new Blob([skinResp.data], { type: "image/png" }),
      );
    });
    tmpCanvas.width = tmpImg2.width;
    tmpCanvas.height = tmpImg2.height;
    const tctx = tmpCanvas.getContext("2d");
    tctx.drawImage(tmpImg2, 0, 0);
    tctx.clearRect(40, 8, 8, 8);
    const cleanBlob = await new Promise((res) =>
      tmpCanvas.toBlob(res, "image/png"),
    );
    const arrBuf = await cleanBlob.arrayBuffer();
    const b64 = Buffer.from(arrBuf)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
    if (avatarEl) {
      avatarEl.src = `https://visage.surgeplay.com/full/300/${b64}?wide`;
      avatarEl.style.imageRendering = "auto";
    }
    // Tête pour la sidebar
    const headB64 = b64;
    window.parent.postMessage(
      {
        action: "refreshAvatar",
        skinFile: `https://visage.surgeplay.com/head/128/${headB64}?wide`,
      },
      "*",
    );
    return;

    // (code canvas conservé comme fallback inaccessible)
    const img = new Image();
    img.onload = function () {
      if (avatarEl) {
        const scale = 25;
        const bodyCanvas = document.createElement("canvas");
        bodyCanvas.width = 16 * scale;
        bodyCanvas.height = 32 * scale;
        const ctx = bodyCanvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        // Tête
        ctx.drawImage(img, 8, 8, 8, 8, 4 * scale, 0, 8 * scale, 8 * scale);
        // Corps
        ctx.drawImage(
          img,
          20,
          20,
          8,
          12,
          4 * scale,
          8 * scale,
          8 * scale,
          12 * scale,
        );
        // Bras gauche
        ctx.drawImage(img, 44, 20, 4, 12, 0, 8 * scale, 4 * scale, 12 * scale);
        // Bras droit
        ctx.drawImage(
          img,
          36,
          52,
          4,
          12,
          12 * scale,
          8 * scale,
          4 * scale,
          12 * scale,
        );
        // Jambe gauche
        ctx.drawImage(
          img,
          4,
          20,
          4,
          12,
          4 * scale,
          20 * scale,
          4 * scale,
          12 * scale,
        );
        // Jambe droite
        ctx.drawImage(
          img,
          20,
          52,
          4,
          12,
          8 * scale,
          20 * scale,
          4 * scale,
          12 * scale,
        );

        if (avatarEl._objectUrl) URL.revokeObjectURL(avatarEl._objectUrl);
        bodyCanvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          avatarEl._objectUrl = url;
          avatarEl.src = url;
        });
      }

      // ── Tête (envoyée au parent pour la sidebar) ──
      const headScale = 4;
      const headCanvas = document.createElement("canvas");
      headCanvas.width = 8 * headScale;
      headCanvas.height = 8 * headScale;
      const headCtx = headCanvas.getContext("2d");
      headCtx.imageSmoothingEnabled = false;
      headCtx.drawImage(img, 8, 8, 8, 8, 0, 0, 8 * headScale, 8 * headScale);

      headCanvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Envoie le base64 de la tête au parent (main.html)
          window.parent.postMessage(
            {
              action: "refreshAvatar",
              skinFile: reader.result,
            },
            "*",
          );
        };
        reader.readAsDataURL(blob);
      });
    };
    img.src = skinFile;
  } catch (err) {
    console.error("Erreur rendu skin:", err);
    if (avatarEl) {
      const timestamp = new Date().getTime();
      avatarEl.src = `https://skins.nationsglory.fr/body/${store.get("username")}/3d/10?${timestamp}`;
    }
  }
}

// ── Rendu liste ───────────────────────────────────────────
async function renderSkinsList(skins, selectedSkinId) {
  if (!Array.isArray(skins)) return;
  const list = document.getElementById("skinsList");
  list.innerHTML = "";
  for (const skin of skins) {
    const isSelected = skin.skin_id === selectedSkinId;
    const item = await createSkinListItem(skin, isSelected);
    list.appendChild(item);
  }
  setupCheckboxListeners(skins);
  const selectedSkin = skins.find((s) => s.skin_id === selectedSkinId);
  updateAvatar(
    selectedSkin ? selectedSkin.skin_file : null,
    selectedSkin ? selectedSkin.skin_id : null,
  );
}

async function createSkinListItem(skin, isSelected) {
  const li = document.createElement("li");
  li.className = isSelected ? "skin-list-item active" : "skin-list-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isSelected;
  checkbox.className = "skins-checkbox";
  checkbox.id = "skin-checkbox-" + skin.skin_id;

  const label = document.createElement("label");
  label.className = "skins-label";
  label.setAttribute("for", checkbox.id);

  const img = createImageElement(skin.skin_file, skin.skin_name + " thumbnail");
  img.className = "skin-thumbnail";

  const nameSpan = document.createElement("span");
  nameSpan.textContent = skin.skin_name;
  nameSpan.className = "skin-name";

  let activeTag = null;
  if (isSelected) {
    activeTag = document.createElement("span");
    activeTag.textContent = await translateAndSave("Actif", lang);
    activeTag.className = "active-tag";
  }

  const deleteBtn = createDeleteButton(skin.skin_id);
  deleteBtn.className = "delete-skin-button";

  const leftSide = document.createElement("div");
  leftSide.className = "left-side";
  leftSide.appendChild(checkbox);
  leftSide.appendChild(label);
  leftSide.appendChild(img);
  leftSide.appendChild(nameSpan);
  if (activeTag) leftSide.appendChild(activeTag);

  li.appendChild(leftSide);
  li.appendChild(deleteBtn);

  return li;
}

function createImageElement(src, altText) {
  const img = document.createElement("img");
  img.alt = altText;
  img.width = 50;
  img.className = "skin-thumbnail";
  img.style.imageRendering = "pixelated";

  if (!src) {
    img.src = "../images/User-3D.png";
    return img;
  }

  const tmpImg = new Image();
  tmpImg.crossOrigin = "anonymous";
  tmpImg.onload = function () {
    const sc = document.createElement("canvas");
    sc.width = tmpImg.width;
    sc.height = tmpImg.height;
    const sctx = sc.getContext("2d");
    sctx.drawImage(tmpImg, 0, 0);
    sctx.clearRect(40, 8, 8, 8);
    sc.toBlob(async (blob) => {
      const arrBuf = await blob.arrayBuffer();
      const base64 = Buffer.from(arrBuf)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      img.src = `https://visage.surgeplay.com/head/100/${base64}?wide`;
    }, "image/png");
  };
  tmpImg.onerror = () => {
    img.src = src;
  };
  tmpImg.src = src;

  return img;
}

function createDeleteButton(skinId) {
  const btn = document.createElement("button");
  const img = document.createElement("img");
  img.src = "../images/Icon_Trash.svg";
  img.alt = "Delete Icon";
  btn.appendChild(img);
  btn.className = "delete-button";
  btn.addEventListener("click", async () => {
    try {
      await deleteFile(skinId);
    } catch (err) {
      console.error("Error deleting skin:", err);
    }
  });
  return btn;
}

async function deleteFile(skinId) {
  try {
    await skinApi("deleteskin", { selectedskin: skinId });
    const updatedSkins = await skinApi("getlist");
    if (updatedSkins && updatedSkins !== "" && updatedSkins.length > 0) {
      const selectedId = getSelectedSkinId(updatedSkins);
      await renderSkinsList(updatedSkins, selectedId);
    } else {
      document.getElementById("skinsList").innerHTML = "";
      displayNoSkinsMessage();
      updateAvatar(null);
    }
  } catch (err) {
    console.error("Error during delete:", err);
  }
}

async function handleFiles(files) {
  for (let file of files) {
    if (path.extname(file.name).toLowerCase() !== ".png") {
      console.warn(file.name + " is not a png file.");
      continue;
    }

    const skinName = file.name;
    let base64Data;
    try {
      base64Data = await fileToBase64(file);
    } catch (err) {
      console.error("Error reading file", err);
      continue;
    }

    try {
      const response = await axios.post(API_BASE_SKINS, {
        action: "addSkin",
        accessToken: authtoken,
        cuid: cuidUser,
        username: username,
        skinname: skinName,
        skinfile: base64Data,
      });

      if (response.data === "" || (response.data && !response.data.error)) {
        const updatedSkins = await skinApi("getlist");
        const selectedId = getSelectedSkinId(updatedSkins);
        await renderSkinsList(updatedSkins, selectedId);
      } else {
        const messageBox = document.getElementById("messageBox");
        const errors = document.getElementById("loginErrorMessage");
        if (messageBox && errors) {
          messageBox.style.display = "flex";
          errors.innerHTML =
            response.data.description ||
            response.data.message ||
            response.data.error;
        }
      }
    } catch (err) {
      console.error("Error uploading skin:", err);
    }
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function setupCheckboxListeners(skins) {
  if (!Array.isArray(skins)) return;
  skins.forEach((skin) => {
    const checkbox = document.getElementById("skin-checkbox-" + skin.skin_id);
    if (!checkbox) return;

    checkbox.addEventListener("change", async (e) => {
      skins.forEach((s) => {
        const cb = document.getElementById("skin-checkbox-" + s.skin_id);
        if (cb && s.skin_id !== skin.skin_id) cb.checked = false;
      });

      if (e.target.checked) {
        try {
          await skinApi("selectSkin", { selectedskin: skin.skin_id });
          await renderSkinsList(skins, skin.skin_id);
        } catch (err) {
          console.error("Error selecting skin:", err);
        }
      }
    });
  });
}

// ── Dropzone ──────────────────────────────────────────────
function setupDropzoneListeners(dropZone, fileInput) {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("active");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("active");
  });
  dropZone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropZone.classList.remove("active");
    await handleFiles(e.dataTransfer.files);
  });
  dropZone.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", async (e) => {
    await handleFiles(e.target.files);
  });
}

setupDropzoneListeners(
  document.getElementById("dropZone"),
  document.getElementById("fileInput"),
);
