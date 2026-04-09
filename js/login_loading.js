/**
 * login_loading.js — Re-auth au démarrage via API custom
 */

const { ipcRenderer } = require("electron");
const Store = require("electron-store");
const { API_URL } = require("../js/config");

const store = new Store(); // ✅ simple et correct

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function reAuth(accessToken) {
  const cuidUser = store.get("cuidUser") || "";

  try {
    const body = { accessToken, cuid: cuidUser };
    const encoded = btoa(JSON.stringify(body));

    const response = await fetch(
      `${API_URL}/v2/reauth?lang=${store.get("lang") || "fr"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      },
    );

    const json = await response.json();

    if (!json || json.error || json.type === "error") {
      console.log("[reauth] Token invalide, retour au login");
      logout();
      return;
    }

    if (json.type === "reauth.success") {
      console.log("[reauth] OK :", json.username);
      // Succès — on laisse la redirection se faire dans onload
    } else {
      logout();
    }
  } catch (err) {
    console.error("[reauth] Erreur réseau:", err);
    // Mode offline : laisser passer
  }
}

function logout() {
  store.delete("authtoken");
  store.delete("username");
  setTimeout(() => {
    ipcRenderer.invoke("login");
  }, 500);
}

window.onload = async function () {
  const authtoken = store.get("authtoken");

  if (authtoken) {
    await reAuth(authtoken);
  } else {
    logout();
    return;
  }

  // Attendre un peu puis charger le launcher
  await delay(800);
  ipcRenderer.invoke("main");
};
