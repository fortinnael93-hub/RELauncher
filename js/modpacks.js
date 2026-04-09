/**
 * modpacks.js — Gestion des modpacks et du fond dynamique
 * Ajoute la logique du <select id="modpacks"> :
 *  - Change le fond de #content selon le modpack sélectionné
 *  - Mémorise le choix via ipcRenderer (store)
 *  - Expose getSelectedModpack() pour launcher.js
 */

(function () {
    // ─── Données des modpacks ────────────────────────────────────────────────
    const MODPACKS = [
        {
            value: 'none',
            label: '— Aucun modpack —',
            bg: '',
            description: ''
        },
        {
            value: 'optifine',
            label: 'OptiFine HD',
            bg: '../images/bg_optifine.jpg',
            description: 'Améliore les performances graphiques et ajoute le support des shaders.'
        },
        {
            value: 'fabric',
            label: 'Fabric + Mods',
            bg: '../images/bg_fabric.jpg',
            description: 'Loader léger avec une sélection de mods optimisés pour NationsGlory.'
        },
        {
            value: 'sodium',
            label: 'Sodium Performance',
            bg: '../images/bg_sodium.jpg',
            description: 'Maximise les FPS grâce à Sodium, Lithium et Phosphor.'
        },
        {
            value: 'faithful',
            label: 'Faithful x32',
            bg: '../images/bg_faithful.jpg',
            description: 'Ressources Faithful en x32 pour un rendu HD fidèle au vanilla.'
        },
        {
            value: 'pvp',
            label: 'PvP Pack',
            bg: '../images/bg_pvp.jpg',
            description: 'Pack orienté PvP : hitboxes améliorées, low-fire, sword pack.'
        }
    ];

    // Fond par défaut de l'application (Background.png original)
    const DEFAULT_BG = '../images/Background.png';

    // Clé de stockage
    const STORE_KEY_MODPACK = 'selectedModpack';

    // ─── Utilitaires ────────────────────────────────────────────────────────

    /**
     * Retourne l'objet modpack correspondant à une valeur.
     * @param {string} value
     * @returns {Object}
     */
    function getModpackByValue(value) {
        return MODPACKS.find(m => m.value === value) || MODPACKS[0];
    }

    /**
     * Applique le fond d'écran correspondant au modpack sélectionné.
     * @param {string} bgPath  Chemin vers l'image (vide = fond par défaut)
     */
    function applyBackground(bgPath) {
        const content = document.getElementById('content');
        if (!content) return;

        const target = bgPath && bgPath !== '' ? bgPath : DEFAULT_BG;

        // Animation douce de transition
        content.style.transition = 'background-image 0.4s ease';
        content.style.backgroundImage = `url("${target}")`;
    }

    /**
     * Met à jour le badge affiché sous le select.
     * @param {Object} modpack
     */
    function updateBadge(modpack) {
        const badge = document.getElementById('modpackBadge');
        const label = document.getElementById('modpackLabel');
        if (!badge || !label) return;

        if (modpack.value === 'none') {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
            label.textContent = modpack.label;

            // Tooltip description
            badge.title = modpack.description || modpack.label;
        }
    }

    /**
     * Sauvegarde le modpack choisi dans le store Electron si disponible.
     * @param {string} value
     */
    function saveModpack(value) {
        try {
            if (typeof ipcRenderer !== 'undefined') {
                ipcRenderer.sendSync('set-data', STORE_KEY_MODPACK, value);
            } else {
                // Fallback pour tests hors Electron
                localStorage.setItem(STORE_KEY_MODPACK, value);
            }
        } catch (e) {
            console.warn('[modpacks] Impossible de sauvegarder le modpack :', e);
        }
    }

    /**
     * Charge le modpack précédemment sauvegardé.
     * @returns {string}
     */
    function loadModpack() {
        try {
            if (typeof ipcRenderer !== 'undefined') {
                return ipcRenderer.sendSync('get-data', STORE_KEY_MODPACK) || 'none';
            } else {
                return localStorage.getItem(STORE_KEY_MODPACK) || 'none';
            }
        } catch (e) {
            return 'none';
        }
    }

    // ─── API publique ────────────────────────────────────────────────────────

    /**
     * Retourne la valeur du modpack actuellement sélectionné.
     * Utilisé par launcher.js lors du lancement du jeu.
     * @returns {string}
     */
    window.getSelectedModpack = function () {
        const select = document.getElementById('modpacks');
        return select ? select.value : 'none';
    };

    // ─── Initialisation ─────────────────────────────────────────────────────

    function init() {
        const select = document.getElementById('modpacks');
        if (!select) return;

        // Peupler le select dynamiquement depuis MODPACKS
        // (Les options sont déjà dans le HTML, mais on synchronise au cas où)
        // On s'assure que chaque option a bien le bon data-bg
        MODPACKS.forEach(mp => {
            let opt = select.querySelector(`option[value="${mp.value}"]`);
            if (!opt) {
                opt = document.createElement('option');
                opt.value = mp.value;
                opt.textContent = mp.label;
                select.appendChild(opt);
            }
            opt.setAttribute('data-bg', mp.bg);
            opt.title = mp.description || '';
        });

        // Restaurer le choix précédent
        const saved = loadModpack();
        if (saved && saved !== 'none') {
            select.value = saved;
        }

        // Appliquer le fond et le badge immédiatement
        const initialModpack = getModpackByValue(select.value);
        applyBackground(initialModpack.bg);
        updateBadge(initialModpack);

        // Écouter les changements
        select.addEventListener('change', function () {
            const chosen = getModpackByValue(this.value);
            applyBackground(chosen.bg);
            updateBadge(chosen);
            saveModpack(this.value);

            console.log('[modpacks] Modpack sélectionné :', chosen.label);

            // Notifier le process principal si besoin
            try {
                if (typeof ipcRenderer !== 'undefined') {
                    ipcRenderer.send('modpack-changed', this.value);
                }
            } catch (e) { /* pas bloquant */ }
        });
    }

    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Ré-init si le launcher recharge la vue (Electron SPA)
    if (typeof window !== 'undefined') {
        window.addEventListener('load', function () {
            const select = document.getElementById('modpacks');
            if (select && select.value) {
                const mp = getModpackByValue(select.value);
                applyBackground(mp.bg);
                updateBadge(mp);
            }
        });
    }

})();
