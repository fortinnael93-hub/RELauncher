window.onload = async function () {
  const accountsList = document.getElementById("accountsList");

  accounts.sort((a, b) => {
    if (a.username === username) return -1;
    if (b.username === username) return 1;
    return 0;
  });

  for (let account of accounts) {
    const isActive = account.username === username;
    const item = await createAccountListItem(account, isActive);
    accountsList.appendChild(item);
  }
};

async function initializeAccountsList(currentUsername) {
  accountsList.innerHTML = "";
  accounts.sort((a, b) => {
    if (a.username === currentUsername) return -1;
    if (b.username === currentUsername) return 1;
    return a.username.localeCompare(b.username);
  });

  for (const account of accounts) {
    const isActive = account.username === currentUsername;
    const item = await createAccountListItem(account, isActive);
    accountsList.appendChild(item);
  }
}

async function createAccountListItem(account, isActive) {
  const li = document.createElement("li");
  li.className = isActive ? "account-list-item active" : "account-list-item";
  li.style.display = "flex";
  li.style.justifyContent = "left";
  li.style.alignItems = "center";
  li.style.padding = "10px";

  const img = createImageElement(
    account.username,
    account.username + " avatar",
  );
  img.className = "account-thumbnail";

  const nameSpan = document.createElement("span");
  nameSpan.textContent = account.username;
  nameSpan.className = "account-name";

  const leftSide = document.createElement("div");
  leftSide.className = "left-side";
  leftSide.style.display = "flex";
  leftSide.style.alignItems = "center";
  leftSide.appendChild(img);
  leftSide.appendChild(nameSpan);
  li.appendChild(leftSide);

  if (isActive) {
    const tag = document.createElement("span");
    tag.textContent = await translateAndSave("En cours d'utilisation", lang);
    tag.className = "current-usage-tag";
    li.appendChild(tag);
  } else {
    const deleteBtn = await createDeleteButton(account.username);
    deleteBtn.className = "deconnexion-button";

    const useBtn = await createUseButton(account, isActive);
    useBtn.className = "use-account-button";

    const btnContainer = document.createElement("div");
    btnContainer.className = "button-container";
    btnContainer.style.display = "flex";
    btnContainer.style.alignItems = "center";
    btnContainer.style.justifyContent = "space-between";
    btnContainer.appendChild(useBtn);
    btnContainer.appendChild(deleteBtn);
    li.appendChild(btnContainer);
  }

  return li;
}

function createImageElement(username, altText) {
  const img = document.createElement("img");
  img.alt = altText;
  // Image par défaut pendant le chargement
  img.src = `https://skins.nationsglory.fr/face/${username}/3d/10`;

  // Charge le skin custom sélectionné, orienté vers la droite
  loadCustomSkinHead(username).then((url) => {
    if (url) img.src = url;
  });

  return img;
}

async function loadCustomSkinHead(username) {
  try {
    const response = await axios.post(
      "https://refuge-api.onrender.com/launcher/skins",
      {
        action: "getlist",
        accessToken: authtoken,
        cuid: cuidUser,
        username: username,
      },
    );

    const skins = response.data;
    if (!skins || skins.length === 0) return null;

    const selected = skins.find((s) => s.selected == 1);
    if (!selected || !selected.skin_file) return null;

    const skinResponse = await axios.get(selected.skin_file, {
      responseType: "arraybuffer",
    });

    const skinBlob = new Blob([skinResponse.data], { type: "image/png" });
    const skinBlobUrl = URL.createObjectURL(skinBlob);

    return new Promise((resolve) => {
      const tmpImg = new Image();
      tmpImg.onload = function () {
        const sc = document.createElement("canvas");
        sc.width = tmpImg.width;
        sc.height = tmpImg.height;
        const sctx = sc.getContext("2d");
        sctx.drawImage(tmpImg, 0, 0);
        // Efface l'overlay de la tête
        sctx.clearRect(40, 8, 8, 8);
        sc.toBlob(async (cleanBlob) => {
          const arrBuf = await cleanBlob.arrayBuffer();
          const base64 = Buffer.from(arrBuf)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
          URL.revokeObjectURL(skinBlobUrl);
          resolve(
            `https://visage.surgeplay.com/head/128/${base64}?wide&yaw=-30`,
          );
        }, "image/png");
      };
      tmpImg.onerror = () => {
        URL.revokeObjectURL(skinBlobUrl);
        resolve(null);
      };
      tmpImg.src = skinBlobUrl;
    });
  } catch (err) {
    console.error("Erreur chargement skin compte:", err);
    return null;
  }
}

async function createDeleteButton(username) {
  const btn = document.createElement("button");
  const img = document.createElement("img");
  img.src = "../images/Icon_Trash.svg";
  img.alt = "Delete Icon";
  btn.appendChild(img);
  btn.className = "delete-button";
  btn.addEventListener("click", async () => {
    try {
      await deleteAccount(username);
    } catch (err) {
      console.error("Error deleting skin:", err);
    }
  });
  return btn;
}

async function createUseButton(account, isActive) {
  const btn = document.createElement("button");
  btn.className = isActive ? "delete-account-button" : "use-button";
  btn.textContent = isActive
    ? await translateAndSave("Deconnexion", lang)
    : await translateAndSave("Connexion", lang);

  btn.addEventListener("click", async () => {
    try {
      if (isActive) {
        await deconnectAccount(account.username);
        updateAccountsListUI(null);
      } else {
        await useAccount(account.username);
        updateAccountsListUI(account.username);
      }
    } catch (err) {
      console.error("Error changing account status:", err);
    }
  });
  return btn;
}

async function deleteAccount(targetUsername) {
  const idx = accounts.findIndex((a) => a.username === targetUsername);
  if (idx !== -1) {
    accounts.splice(idx, 1);
    const items = document.querySelectorAll("#accountsList .account-list-item");
    items.forEach((item) => {
      const nameEl = item.querySelector(".account-name");
      if (nameEl && nameEl.textContent === targetUsername) {
        accountsList.removeChild(item);
      }
    });
    await ipcRenderer.invoke("store", "accounts", accounts);
  } else {
    console.error("Account not found for deletion");
  }
}

async function useAccount(targetUsername) {
  const account = accounts.find((a) => a.username === targetUsername);
  if (account) {
    await ipcRenderer.invoke("store", "username", account.username);
    await ipcRenderer.invoke("store", "authtoken", account.token);
  } else {
    console.error("Account not found");
  }
}

async function updateAccountsListUI(currentUsername) {
  const list = document.getElementById("accountsList");
  list.innerHTML = "";

  const items = document.querySelectorAll("#accountsList .account-list-item");
  for (const item of items) {
    const nameEl = item.querySelector(".account-name");
    const itemName = nameEl ? nameEl.textContent : null;

    if (itemName === currentUsername) {
      item.classList.add("active");
      const btnContainer = item.querySelector(".button-container");
      if (btnContainer) btnContainer.style.display = "none";
      const tag =
        item.querySelector(".current-usage-tag") ||
        document.createElement("span");
      tag.textContent = await translateAndSave("En cours d'utilisation", "fr");
      tag.className = "current-usage-tag";
      if (!item.contains(tag)) item.appendChild(tag);
    } else {
      item.classList.remove("active");
      let btnContainer = item.querySelector(".button-container");
      if (!btnContainer) {
        btnContainer = document.createElement("div");
        btnContainer.className = "button-container";
        btnContainer.style.display = "flex";
        btnContainer.style.alignItems = "center";
        btnContainer.style.justifyContent = "space-between";
        item.appendChild(btnContainer);
      }
      await updateButtonContainer(btnContainer, itemName, currentUsername);
      const tag = item.querySelector(".current-usage-tag");
      if (tag) tag.remove();
    }
  }

  await initializeAccountsList(currentUsername);
}

async function updateButtonContainer(container, itemUsername, currentUsername) {
  while (container.firstChild) container.removeChild(container.firstChild);
  const useBtn = await createUseButton(
    { username: itemUsername },
    itemUsername === currentUsername,
  );
  container.appendChild(useBtn);
  if (itemUsername !== currentUsername) {
    const deleteBtn = await createDeleteButton(itemUsername);
    container.appendChild(deleteBtn);
  }
}

function addAccount() {
  ipcRenderer.invoke("openModal", "addAccount.html");
}
