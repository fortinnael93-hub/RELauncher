// ─────────────────────────────────────────────────────────────────────────────
// twitch.js
//
// Layout :
//   [1] RE      → embed Twitch pleine largeur, toujours affiché
//   ── séparateur ──
//   [2] Affiliés → embeds Twitch, seulement en live, taille auto selon le nombre
//   ── séparateur ──
//   [3] Autres  → embeds Twitch, seulement si @Le_Refuge_Emeraudien dans le titre
// ─────────────────────────────────────────────────────────────────────────────

const RE_CHANNEL = "Le_Refuge_Emeraudien";
const TAG_KEYWORD = "@Le_Refuge_Emeraudien";
const API_BASE = "https://refuge-api.onrender.com";

const AFFILIATES = [
  { name: "Rexi", twitch: "Rexi_de_la_mort" },
  { name: "Zehn", twitch: "justzenh" },
  // Ajoute ici : { name: "Nom", twitch: "login_twitch" }
];

// ── API Twitch via proxy ──────────────────────────────────────────────────────

async function getTwitchToken() {
  try {
    const res = await getCachedDataOrFetch(
      `${API_BASE}/launcher/twitch_token`,
      true,
    );
    return res?.access_token || null;
  } catch (e) {
    console.error("Token Twitch:", e);
    return null;
  }
}

async function fetchTwitchStreams(logins, token) {
  if (!logins.length || !token) return new Map();
  try {
    const params = logins
      .map((l) => `user_login=${encodeURIComponent(l)}`)
      .join("&");
    const res = await axios.get(
      `${API_BASE}/launcher/twitch_streams?${params}`,
    );
    const map = new Map();
    logins.forEach((l) => map.set(l.toLowerCase(), null));
    (res.data?.data || []).forEach((s) =>
      map.set(s.user_login.toLowerCase(), s),
    );
    return map;
  } catch (e) {
    console.error("Streams Twitch:", e);
    return new Map();
  }
}

async function fetchTaggedStreams(tag, token) {
  if (!token) return [];
  try {
    const res = await axios.get(
      `${API_BASE}/launcher/twitch_search?query=${encodeURIComponent(tag)}`,
    );
    return (res.data?.data || []).filter(
      (s) => s.is_live && s.title?.toLowerCase().includes(tag.toLowerCase()),
    );
  } catch (e) {
    console.error("Tagged streams:", e);
    return [];
  }
}

// ── Construit un embed Twitch ────────────────────────────────────────────────
// height : hauteur CSS en string (ex: "100%", "300px")

function buildEmbed(channel, label, title, isLive = false) {
  return `
    <div class="embed-wrapper">
      <iframe
        src="https://player.twitch.tv/?channel=${channel}&parent=localhost&autoplay=false"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
      ></iframe>
    </div>
    <div class="stream-meta">
      <span class="stream-username">
        ${label}
        ${isLive ? `<span class="badge-live">En direct</span>` : `<span class="badge-offline">Hors ligne</span>`}
      </span>
      ${title ? `<span class="stream-title">${title}</span>` : ""}
    </div>
  `;
}

function buildOfflineCard(channel, label) {
  return `
    <div class="embed-wrapper offline-placeholder">
      <div class="offline-inner">
        <span class="offline-name">${label}</span>
        <span class="offline-status">Hors ligne</span>
        <button class="offline-btn" onclick="getExternalLink('https://www.twitch.tv/${channel}')">
          Voir la chaîne
        </button>
      </div>
    </div>
    <div class="stream-meta">
      <span class="stream-username">${label} <span class="badge-offline">Hors ligne</span></span>
    </div>
  `;
}

// ── Grille adaptive selon le nombre de streams ───────────────────────────────
// 1 → centré pleine largeur  |  2 → 50/50  |  3 → 33/33/33  |  4+ → 2 colonnes

function buildGrid(items, className = "") {
  const count = items.length;
  const grid = document.createElement("div");
  grid.className = `stream-grid ${className}`.trim();

  if (count === 1) {
    grid.style.display = "flex";
    grid.style.justifyContent = "center";
  } else if (count === 2) {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "1fr 1fr";
    grid.style.gap = "1rem";
  } else if (count === 3) {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "1fr 1fr 1fr";
    grid.style.gap = "1rem";
  } else {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "1fr 1fr";
    grid.style.gap = "1rem";
  }

  items.forEach((el) => grid.appendChild(el));
  return grid;
}

// ── Section avec titre ───────────────────────────────────────────────────────

function buildSectionTitle(icon, text) {
  const h = document.createElement("h4");
  h.className = "stream-section-title";
  h.innerHTML = `<span class="section-icon">${icon}</span> ${text}`;
  return h;
}

function buildSeparator() {
  const hr = document.createElement("hr");
  hr.className = "section-separator";
  return hr;
}

// ── Modal partenaires ─────────────────────────────────────────────────────────

function openAffiliatesModal(affiliates, streamMap) {
  const existing = document.getElementById("affiliates-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "affiliates-modal";
  modal.className = "affiliates-modal-overlay";
  modal.innerHTML = `
    <div class="affiliates-modal-box">
      <div class="affiliates-modal-header">
        <h3>Partenaires du Refuge</h3>
        <button id="close-affiliates-modal" class="affiliates-modal-close">✕</button>
      </div>
      <div class="affiliates-modal-list">
        ${affiliates
          .map((a) => {
            const live = streamMap.get(a.twitch.toLowerCase());
            return `
            <div class="affiliates-modal-item">
              <div>
                <div class="affiliates-modal-name">${a.name}</div>
                <div class="affiliates-modal-twitch">@${a.twitch}</div>
              </div>
              <div class="affiliates-modal-item-right">
                ${live ? `<span class="badge-live">En direct</span>` : `<span class="badge-offline">Hors ligne</span>`}
                <button class="affiliates-modal-btn"
                  onclick="getExternalLink('https://www.twitch.tv/${a.twitch}')">
                  Voir la chaîne
                </button>
              </div>
            </div>`;
          })
          .join("")}
      </div>
    </div>`;

  document.body.appendChild(modal);
  document
    .getElementById("close-affiliates-modal")
    .addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ── Point d'entrée ────────────────────────────────────────────────────────────

window.onload = async function () {
  const container = document.getElementById("other-streams");
  const noStreamEl = document.getElementById("no-stream");
  document.getElementById("main-stream").style.display = "none";

  container.classList.remove("grid");
  container.style.cssText =
    "display:flex;flex-direction:column;width:100%;gap:0;";

  const token = await getTwitchToken();

  const affiliateLogins = AFFILIATES.map((a) => a.twitch);
  const [reMap, affiliateMap, taggedRaw] = await Promise.all([
    fetchTwitchStreams([RE_CHANNEL], token),
    fetchTwitchStreams(affiliateLogins, token),
    fetchTaggedStreams(TAG_KEYWORD, token),
  ]);

  const reStream = reMap.get(RE_CHANNEL.toLowerCase());
  const liveAffiliates = AFFILIATES.filter((a) =>
    affiliateMap.get(a.twitch.toLowerCase()),
  );

  const affiliateLoginsSet = new Set(
    affiliateLogins.map((l) => l.toLowerCase()),
  );
  const taggedStreams = taggedRaw.filter(
    (s) =>
      s.user_login.toLowerCase() !== RE_CHANNEL.toLowerCase() &&
      !affiliateLoginsSet.has(s.user_login.toLowerCase()),
  );

  noStreamEl.style.display = "none";

  // ── [1] Section RE ────────────────────────────────────────────────────────
  const reSection = document.createElement("div");
  reSection.id = "re-section";
  reSection.className = "stream-section";

  reSection.appendChild(buildSectionTitle("📺", "Chaîne officielle"));

  const reCard = document.createElement("div");
  reCard.className = "stream-card re-card";
  reCard.innerHTML = buildEmbed(
    RE_CHANNEL,
    RE_CHANNEL,
    reStream?.title || "",
    !!reStream,
  );
  reSection.appendChild(reCard);

  container.appendChild(reSection);
  container.appendChild(buildSeparator());

  // Fond flou
  if (reStream?.thumbnail_url) {
    const bg = document.getElementById("background");
    const url = reStream.thumbnail_url
      .replace("{width}", "1280")
      .replace("{height}", "720");
    if (bg)
      bg.style.cssText = `position:absolute;background-image:url('${url}');z-index:-1;background-size:cover;width:98%;height:98%;filter:blur(5rem);transition:all .4s ease-in-out;border-radius:0 10px 10px 0;`;
  }

  // ── [2] Section Affiliés ──────────────────────────────────────────────────
  const affSection = document.createElement("div");
  affSection.id = "affiliates-section";
  affSection.className = "stream-section";

  affSection.appendChild(buildSectionTitle("⭐", "Affiliés"));

  if (liveAffiliates.length > 0) {
    const cards = liveAffiliates.map((affiliate) => {
      const stream = affiliateMap.get(affiliate.twitch.toLowerCase());
      const card = document.createElement("div");
      card.className = "stream-card";
      card.innerHTML = buildEmbed(
        affiliate.twitch,
        affiliate.name,
        stream?.title,
        true,
      );
      return card;
    });
    affSection.appendChild(buildGrid(cards));
  } else {
    const msg = document.createElement("p");
    msg.className = "no-live-message";
    msg.textContent = "Aucun affilié en live pour le moment.";
    affSection.appendChild(msg);
  }

  // Bouton liste partenaires
  const seeAllBtn = document.createElement("button");
  seeAllBtn.className = "see-all-affiliates-btn";
  seeAllBtn.textContent = "Voir la liste des partenaires";
  seeAllBtn.addEventListener("click", () =>
    openAffiliatesModal(AFFILIATES, affiliateMap),
  );
  affSection.appendChild(seeAllBtn);

  container.appendChild(affSection);
  container.appendChild(buildSeparator());

  // ── [3] Section Autres ────────────────────────────────────────────────────
  const othSection = document.createElement("div");
  othSection.id = "others-section";
  othSection.className = "stream-section";

  othSection.appendChild(
    buildSectionTitle("💬", `Communauté — ${TAG_KEYWORD}`),
  );

  if (taggedStreams.length > 0) {
    const cards = taggedStreams.map((stream) => {
      const card = document.createElement("div");
      card.className = "stream-card";
      card.innerHTML = buildEmbed(
        stream.user_login,
        stream.user_name || stream.user_login,
        stream.title,
        true,
      );
      return card;
    });
    othSection.appendChild(buildGrid(cards));
  } else {
    const msg = document.createElement("p");
    msg.className = "no-live-message";
    msg.textContent = `Aucun stream avec ${TAG_KEYWORD} dans le titre pour le moment.`;
    othSection.appendChild(msg);
  }

  container.appendChild(othSection);
};
