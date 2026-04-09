/**
 * utils.js — Fonctions utilitaires globales du launcher
 */

if (typeof ipcRenderer === "undefined")
  var ipcRenderer = require("electron").ipcRenderer;
if (typeof Store === "undefined") var Store = require("electron-store");
if (typeof store === "undefined") var store = new Store();

// ── Navigation entre pages ─────────────────────────────────
function ChangeRoute(route) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((p) => (p.style.display = "none"));

  const target = document.getElementById(route);
  if (target) {
    target.style.display = "block";
  } else {
    console.warn(`[ChangeRoute] Page introuvable : ${route}`);
  }
}

// ── Ouvrir un lien externe dans le navigateur ──────────────
function getExternalLink(url) {
  if (!url) return;
  ipcRenderer.send("open-external-link", url);
}

// ── Formater une taille en octets ──────────────────────────
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
}

// ── Afficher une notification / toast ──────────────────────
function showNotification(message, type = "info", duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      display: flex; flex-direction: column; gap: 8px;
      z-index: 9999;
    `;
    document.body.appendChild(container);
  }

  const colors = { info: "#3b82f6", success: "#22c55e", warning: "#f59e0b", error: "#ef4444" };

  const toast = document.createElement("div");
  toast.style.cssText = `
    background: ${colors[type] || colors.info};
    color: #fff; padding: 10px 16px; border-radius: 6px;
    font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    opacity: 0; transition: opacity 0.3s ease; max-width: 300px;
  `;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => (toast.style.opacity = "1"), 10);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Afficher les logs dans un div dédié ───────────────────
function displayConsoleInDiv(message) {
  const consoleDiv = document.getElementById("console");
  if (!consoleDiv) return;
  const line = document.createElement("p");
  line.innerText = message;
  consoleDiv.appendChild(line);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

// ── Mise à jour de la barre de progression ────────────────
function updateProgress(id, percent) {
  const bar = document.getElementById(id);
  if (!bar) return;
  bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  bar.setAttribute("aria-valuenow", percent);

  const label = document.getElementById(id + "-label");
  if (label) label.innerText = `${Math.round(percent)}%`;
}

// ── Exports globaux ────────────────────────────────────────
window.ChangeRoute = ChangeRoute;
window.getExternalLink = getExternalLink;
window.formatBytes = formatBytes;
window.showNotification = showNotification;
window.displayConsoleInDiv = displayConsoleInDiv;
window.updateProgress = updateProgress;
