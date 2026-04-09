/**
 * login.js — Connexion via API custom
 */

const { ipcRenderer } = require("electron");
const { machineIdSync } = require("node-machine-id");
const getmac = require("getmac");
const hddserial = require("hddserial");
const Store = require("electron-store");
const { API_URL } = require("../js/config");

const store = new Store();

let accounts = store.get("accounts");
if (!Array.isArray(accounts)) accounts = [];

let loginButton, email, password, messageBox, errors;
let hddidUser = "";
let lang = store.get("lang") || "fr";

hddserial.first(0, function (err, serial) {
  hddidUser = serial || "";
});

async function getLang() {
  if (store.get("lang") && store.get("lang") !== "undefined") {
    return store.get("lang");
  }
  return "fr";
}

function WindowClose() {
  ipcRenderer.send("WindowClose");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(msg) {
  messageBox.style.display = "flex";
  errors.innerHTML = msg;
}

window.onload = async function () {
  lang = await getLang();

  loginButton = document.getElementById("loginButton");
  email = document.getElementById("email");
  password = document.getElementById("password");
  messageBox = document.getElementById("messageBox");
  errors = document.getElementById("loginErrorMessage");

  loginButton.onclick = async function (event) {
    event.preventDefault();

    if (!email.value) {
      showError("Veuillez renseigner une adresse email");
      return;
    }
    if (!password.value) {
      showError("Veuillez renseigner un mot de passe");
      return;
    }
    if (!validateEmail(email.value)) {
      showError("Le format de votre adresse email est incorrect");
      return;
    }

    messageBox.style.display = "none";
    loginButton.innerHTML = "Connexion...";

    try {
      const cuidUser = machineIdSync();
      let macUser = "";
      try {
        macUser = getmac.default();
      } catch (e) {
        // Fallback si getmac.default() échoue
        try {
          macUser = await getmac();
        } catch (e2) {
          console.warn("[login] Impossible d'obtenir l'adresse MAC");
          macUser = "";
        }
      }

      const body = {
        email: email.value,
        password: password.value,
        cuid: cuidUser,
        mac: macUser,
        hddid: hddidUser,
      };

      const response = await fetch(`${API_URL}/v2/auth?lang=${lang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur API: ${response.status} ${response.statusText}`,
        );
      }
      const json = await response.json();
      console.log("[login] Réponse API:", json);

      if (json.error) {
        console.error("[login] Erreur API:", json.error);
        showError(json.error);
        loginButton.innerHTML = "Connexion";
        return;
      }

      if (json.type === "auth.success" && json.token) {
        await ipcRenderer.invoke("store", "authtoken", json.token);
        await ipcRenderer.invoke("store", "username", json.username);

        const idx = accounts.findIndex((a) => a.username === json.username);
        if (idx !== -1) accounts.splice(idx, 1);
        accounts.push({ username: json.username, token: json.token });
        await ipcRenderer.invoke("store", "accounts", accounts);

        await ipcRenderer.invoke("loginLoading");
      } else if (json.error) {
        showError(json.error);
        loginButton.innerHTML = "Connexion";
      } else {
        console.error("[login] Réponse API invalide:", json);
        showError("Erreur lors de la connexion");
        loginButton.innerHTML = "Connexion";
      }
    } catch (err) {
      console.error("[login] Erreur réseau:", err);
      showError("Impossible de contacter le serveur. Vérifie ta connexion.");
      loginButton.innerHTML = "Connexion";
    }
  };
};
