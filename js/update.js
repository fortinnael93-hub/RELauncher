const _0x3bc3d1 = _0x2aea;
(function (_0x84880d, _0x4a05fd) {
  const _0x191fbc = _0x2aea,
    _0x2db26b = _0x84880d();
  while (!![]) {
    try {
      const _0x4c4d77 =
        (parseInt(_0x191fbc(0x1ef)) / 0x1) *
          (parseInt(_0x191fbc(0x1ee)) / 0x2) +
        parseInt(_0x191fbc(0x1ce)) / 0x3 +
        parseInt(_0x191fbc(0x1d3)) / 0x4 +
        -parseInt(_0x191fbc(0x1e5)) / 0x5 +
        (parseInt(_0x191fbc(0x1f1)) / 0x6) *
          (-parseInt(_0x191fbc(0x1ed)) / 0x7) +
        (-parseInt(_0x191fbc(0x1f4)) / 0x8) *
          (parseInt(_0x191fbc(0x1e9)) / 0x9) +
        (-parseInt(_0x191fbc(0x1e4)) / 0xa) *
          (-parseInt(_0x191fbc(0x1e6)) / 0xb);
      if (_0x4c4d77 === _0x4a05fd) break;
      else _0x2db26b["push"](_0x2db26b["shift"]());
    } catch (_0x24b578) {
      _0x2db26b["push"](_0x2db26b["shift"]());
    }
  }
})(_0x3512, 0x66b8e);
const { ipcRenderer } = require(_0x3bc3d1(0x1d6)),
  Store = require(_0x3bc3d1(0x1f3)),
  { exec } = require(_0x3bc3d1(0x1ca)),
  store = new Store(),
  lang = store[_0x3bc3d1(0x1f0)](_0x3bc3d1(0x1d4));
function _0x2aea(_0x5a33b6, _0x5384bd) {
  const _0x3512d3 = _0x3512();
  return (
    (_0x2aea = function (_0x2aeade, _0x12cf23) {
      _0x2aeade = _0x2aeade - 0x1ca;
      let _0x2383f6 = _0x3512d3[_0x2aeade];
      return _0x2383f6;
    }),
    _0x2aea(_0x5a33b6, _0x5384bd)
  );
}
let isProgressStuck = ![],
  progressTimeout;
(ipcRenderer["on"]("update_available", async () => {
  const _0x489614 = _0x3bc3d1;
  (ipcRenderer[_0x489614(0x1e0)](_0x489614(0x1e3)),
    (document[_0x489614(0x1d0)]("progress-text")[_0x489614(0x1ea)] =
      await translateAndSave(_0x489614(0x1ec), lang)));
}),
  ipcRenderer["on"](_0x3bc3d1(0x1cf), (_0x394b96, _0x58e712) => {
    const _0x4cea7a = _0x3bc3d1;
    ((document[_0x4cea7a(0x1d0)](_0x4cea7a(0x1cd))["textContent"] =
      "(" + _0x58e712 + "%)"),
      (document[_0x4cea7a(0x1cc)](_0x4cea7a(0x1cb))[_0x4cea7a(0x1d8)][
        _0x4cea7a(0x1e2)
      ] = _0x58e712 + "%"),
      _0x58e712 === 0x64
        ? (clearTimeout(progressTimeout),
          (progressTimeout = setTimeout(() => {
            const _0xa23cd = _0x4cea7a;
            ((isProgressStuck = !![]),
              (document["querySelector"](_0xa23cd(0x1db))[_0xa23cd(0x1d8)][
                _0xa23cd(0x1df)
              ] = _0xa23cd(0x1d1)),
              (document[_0xa23cd(0x1d0)](_0xa23cd(0x1e1))[_0xa23cd(0x1d8)][
                _0xa23cd(0x1df)
              ] = _0xa23cd(0x1de)));
          }, 0x2710)))
        : ((isProgressStuck = ![]),
          (document[_0x4cea7a(0x1cc)](_0x4cea7a(0x1db))[_0x4cea7a(0x1d8)][
            _0x4cea7a(0x1df)
          ] = "none"),
          (document[_0x4cea7a(0x1d0)]("restart-button")["style"][
            _0x4cea7a(0x1df)
          ] = _0x4cea7a(0x1d5)),
          clearTimeout(progressTimeout)));
  }),
  ipcRenderer["on"](_0x3bc3d1(0x1eb), async () => {
    const _0x28b9b2 = _0x3bc3d1;
    ((document[_0x28b9b2(0x1d0)](_0x28b9b2(0x1dd))[_0x28b9b2(0x1ea)] =
      await translateAndSave(_0x28b9b2(0x1f2), lang)),
      clearTimeout(progressTimeout));
  }),
  document["getElementById"]("restart-button")[_0x3bc3d1(0x1e8)](
    _0x3bc3d1(0x1d7),
    () => {
      restartAsAdmin();
    },
  ));
function _0x3512() {
  const _0x39cb54 = [
    "child_process",
    ".progress-fill",
    "querySelector",
    "progress-percent",
    "1734204UsGJCt",
    "update_download_progress",
    "getElementById",
    "block",
    "../js/translate",
    "166704vNVCZx",
    "lang",
    "none",
    "electron",
    "click",
    "style",
    "exec",
    "\x22\x20--elevate",
    ".infobox",
    "Erreur\x20lors\x20du\x20redémarrage\x20en\x20tant\x20qu’administrateur:",
    "progress-text",
    "inline-block",
    "display",
    "removeAllListeners",
    "restart-button",
    "width",
    "update_available",
    "2750FKiRCR",
    "2058065gfenVz",
    "48917RhVwBt",
    "exit",
    "addEventListener",
    "830367eZFvZM",
    "textContent",
    "update_downloaded",
    "Téléchargement\x20de\x20la\x20mise\x20à\x20jour...",
    "77Meifca",
    "10414JqNrdv",
    "10wTNCyn",
    "get",
    "428502LUeJud",
    "Installation\x20dans\x205\x20secondes...",
    "electron-store",
    "24DAPOBu",
  ];
  _0x3512 = function () {
    return _0x39cb54;
  };
  return _0x3512();
}
function restartAsAdmin() {
  const _0x1a1b66 = _0x3bc3d1,
    _0x51e375 = require(_0x1a1b66(0x1ca))[_0x1a1b66(0x1d9)],
    _0x39cea3 = "\x22" + process["execPath"] + _0x1a1b66(0x1da);
  _0x51e375(_0x39cea3, (_0x17a0c6) => {
    const _0xa40ae = _0x1a1b66;
    _0x17a0c6
      ? console["error"](_0xa40ae(0x1dc), _0x17a0c6)
      : process[_0xa40ae(0x1e7)](0x1);
  });
}
const { translateAndSave, translatePageElements } = require(_0x3bc3d1(0x1d2));
translatePageElements(lang);
