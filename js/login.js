const { ipcRenderer } = require("electron");
const { machineIdSync } = require("node-machine-id");
const getmac = require("getmac");
const hddserial = require("hddserial");
const Store = require("electron-store");
const store = new Store();
const getSystemLocale = require("system-locale");
const { translateAndSave, translatePageElements } = require("../js/translate");

const API_URL = "https://refuge-api.onrender.com";

let accounts = store.get("accounts");
if (!Array.isArray(accounts)) accounts = [];

let loginButton, email, password, errors, messageBox, hddidUser;
let lang = store.get("lang") || "fr";

hddserial.one(0, function (err, serial) {
  hddidUser = serial;
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getLang() {
  await getSystemLocale().then(async (locale) => {
    if (!store.get("lang") || store.get("lang") === "undefined") {
      if (locale.includes("fr")) {
        translatePageElements("fr");
        await ipcRenderer.invoke("store", "lang", "fr");
        lang = "fr";
      } else if (locale.includes("es")) {
        translatePageElements("es");
        await ipcRenderer.invoke("store", "lang", "es");
        lang = "es";
      } else {
        translatePageElements("en");
        await ipcRenderer.invoke("store", "lang", "en");
        lang = "en";
      }
    } else {
      lang = store.get("lang");
      translatePageElements(lang);
    }
  });
}

function WindowClose() {
  ipcRenderer.send("WindowClose");
}

window.onload = async function () {
  await getLang();

  loginButton = document.getElementById("loginButton");
  email = document.getElementById("email");
  password = document.getElementById("password");
  messageBox = document.getElementById("messageBox");
  errors = document.getElementById("loginErrorMessage");

  // Bloque le submit du formulaire
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  loginButton.onclick = async function (event) {
    event.preventDefault();

    if (!email.value) {
      messageBox.style.display = "flex";
      errors.innerHTML = await translateAndSave(
        "Veuillez renseigner une adresse email",
        lang,
      );
      return;
    }
    if (!password.value) {
      messageBox.style.display = "flex";
      errors.innerHTML = await translateAndSave(
        "Veuillez renseigner un mot de passe",
        lang,
      );
      return;
    }
    if (!validateEmail(email.value)) {
      messageBox.style.display = "flex";
      errors.innerHTML = await translateAndSave(
        "Le format de votre adresse email est incorrect",
        lang,
      );
      return;
    }

    const cuidUser = machineIdSync();
    const macUser = getmac.default();
    const body = {
      email: email.value,
      password: password.value,
      cuid: cuidUser,
      mac: macUser,
      hddid: hddidUser,
    };

    messageBox.style.display = "none";
    loginButton.innerHTML = "Connexion...";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/v2/auth?lang=${lang}`);

    xhr.onload = function () {
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(xhr.responseText);
      } catch (e) {
        messageBox.style.display = "flex";
        errors.innerHTML = "Erreur serveur (réponse invalide)";
        loginButton.innerHTML = "Connexion";
        return;
      }

      console.log("Réponse API:", jsonResponse);

      // Succès
      if (jsonResponse.type === "auth.success" || jsonResponse.error === null) {
        ipcRenderer.invoke("store", "authtoken", jsonResponse.token);
        ipcRenderer.invoke("store", "username", jsonResponse.username);

        const idx = accounts.findIndex(
          (a) => a.username === jsonResponse.username,
        );
        if (idx !== -1) accounts.splice(idx, 1);
        accounts.push({
          username: jsonResponse.username,
          token: jsonResponse.token,
        });
        ipcRenderer.invoke("store", "accounts", accounts);
        ipcRenderer.invoke("loginLoading");
        return;
      }

      // Double auth
      if (jsonResponse.error === "2AuthenticationRequired") {
        ipcRenderer.invoke("store", "email", email.value);
        ipcRenderer.invoke("store", "password", password.value);
        ipcRenderer.invoke("doubleAuth");
        return;
      }

      // Erreur
      messageBox.style.display = "flex";
      errors.innerHTML =
        jsonResponse.error || jsonResponse.description || "Erreur inconnue";
      loginButton.innerHTML = "Connexion";
    };

    xhr.onerror = function () {
      messageBox.style.display = "flex";
      errors.innerHTML = "Impossible de contacter le serveur";
      loginButton.innerHTML = "Connexion";
    };

    xhr.send(btoa(JSON.stringify(body)));
  };
};
