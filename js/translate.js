const { ipcRenderer } = require("electron");
const fs = require("fs").promises;
const path = require("path");

// cache simple mémoire
const memoryCache = new Map();

// appel propre à Electron main process
async function translateText(text, lang) {
  return await ipcRenderer.invoke("translate", text, lang);
}

// check fichier
async function checkExistingTranslation(text, lang) {
  try {
    const filePath = path.join(__dirname, `translation-${lang}.json`);

    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    const found = data.find((e) => e.text === text);
    return found ? found.translation : null;
  } catch {
    return null;
  }
}

// main translate
async function translateAndSave(text, lang) {
  if (!["en", "es", "fr"].includes(lang)) {
    throw new Error(`Language not supported: ${lang}`);
  }

  const cacheKey = `${text}_${lang}`;
  if (memoryCache.has(cacheKey)) return memoryCache.get(cacheKey);

  let result = await checkExistingTranslation(text, lang);

  if (!result) {
    result = await translateText(text, lang);

    const filePath = path.join(__dirname, `translation-${lang}.json`);

    let fileData = [];
    try {
      fileData = JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch {}

    fileData.push({ text, translation: result });

    await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
  }

  memoryCache.set(cacheKey, result);
  return result;
}

// DOM
async function translateAttribute(element, lang) {
  let attr = "textContent";
  let text = "";

  switch (element.tagName.toLowerCase()) {
    case "input":
      attr = "placeholder";
      break;
    case "img":
      attr = "alt";
      break;
  }

  text =
    attr === "textContent"
      ? element.textContent || element.getAttribute("data-translate")
      : element.getAttribute(attr) || element.getAttribute("data-translate");

  if (!text) return;

  try {
    const translated = await translateAndSave(text, lang);

    if (attr === "textContent") {
      element.textContent = translated;
    } else {
      element.setAttribute(attr, translated);
    }
  } catch (err) {
    console.error(err);
  }
}

async function translatePageElements(lang) {
  const elements = document.querySelectorAll("[data-translate]");

  for (const el of elements) {
    await translateAttribute(el, lang);
  }
}

module.exports = {
  translateAndSave,
  translatePageElements,
};
