const translateAndSave = window.translateAndSave || (async (t) => t);
const _0x1e093e = _0x62ce;
(function (_0x50fa3d, _0x2030db) {
  const _0x20446b = _0x62ce,
    _0x484acb = _0x50fa3d();
  while (!![]) {
    try {
      const _0x58e90a =
        (parseInt(_0x20446b(0xcb)) / 0x1) * (-parseInt(_0x20446b(0xcf)) / 0x2) +
        parseInt(_0x20446b(0xaf)) / 0x3 +
        -parseInt(_0x20446b(0xae)) / 0x4 +
        parseInt(_0x20446b(0xa5)) / 0x5 +
        (-parseInt(_0x20446b(0xd8)) / 0x6) * (parseInt(_0x20446b(0xe6)) / 0x7) +
        (-parseInt(_0x20446b(0xd7)) / 0x8) *
          (-parseInt(_0x20446b(0xd4)) / 0x9) +
        parseInt(_0x20446b(0xbe)) / 0xa;
      if (_0x58e90a === _0x2030db) break;
      else _0x484acb["push"](_0x484acb["shift"]());
    } catch (_0x2343af) {
      _0x484acb["push"](_0x484acb["shift"]());
    }
  }
})(_0x55b3, 0xc5877);
function getBaseDirectory() {
  const _0x3c0839 = _0x62ce;
  let _0x130b49;
  switch (os[_0x3c0839(0xb3)]()) {
    case _0x3c0839(0xb9):
      let _0x3f30a3 =
        process[_0x3c0839(0xb1)][_0x3c0839(0xea)] ||
        path[_0x3c0839(0xca)](
          os[_0x3c0839(0xd5)](),
          _0x3c0839(0xe1),
          "Roaming",
        );
      !_0x3f30a3[_0x3c0839(0xb6)](path[_0x3c0839(0xc5)]) &&
        (_0x3f30a3 += path[_0x3c0839(0xc5)]);
      _0x130b49 = path[_0x3c0839(0xca)](_0x3f30a3, _0x3c0839(0xf4));
      break;
    case _0x3c0839(0xf0):
      _0x130b49 = path[_0x3c0839(0xca)](
        os["homedir"](),
        _0x3c0839(0xba),
        "Application\x20Support",
        ".NationsGlory",
      );
      break;
    default:
      _0x130b49 = path[_0x3c0839(0xca)](
        os[_0x3c0839(0xd5)](),
        _0x3c0839(0xcd),
        _0x3c0839(0xf4),
      );
      break;
  }
  return path[_0x3c0839(0xaa)](_0x130b49);
}
const getFolder = (_0x51fb88) =>
    path[_0x1e093e(0xaa)](
      path[_0x1e093e(0xca)](
        getBaseDirectory(),
        _0x1e093e(0xc6),
        _0x51fb88,
        _0x1e093e(0xa6),
      ),
    ),
  getUniqueIdentifier = (_0x4d9c8a, _0x445e36) => _0x4d9c8a + "-" + _0x445e36,
  fileExists = async (_0x17a90b) => {
    const _0x2e990c = _0x1e093e;
    try {
      return (
        await fsp[_0x2e990c(0xbb)](
          _0x17a90b,
          fsp["constants"][_0x2e990c(0xb0)],
        ),
        !![]
      );
    } catch (_0x44a4f6) {
      return ![];
    }
  };
async function iterateThroughFolder(_0x43eb66) {
  const _0x5e9a1e = _0x1e093e,
    _0x28ab9f = await fsp[_0x5e9a1e(0xda)](_0x43eb66),
    _0xc79c81 = [];
  for (let _0xb16a37 of _0x28ab9f) {
    const _0x3b7504 = path[_0x5e9a1e(0xca)](_0x43eb66, _0xb16a37),
      _0x265c2f = await fsp[_0x5e9a1e(0xeb)](_0x3b7504);
    _0xc79c81[_0x5e9a1e(0xdf)](
      ...(_0x265c2f[_0x5e9a1e(0xef)]()
        ? await iterateThroughFolder(_0x3b7504)
        : [_0x3b7504]),
    );
  }
  return _0xc79c81;
}
function _0x62ce(_0xd8948, _0x15a2bd) {
  const _0x55b3d1 = _0x55b3();
  return (
    (_0x62ce = function (_0x62ce21, _0x50b7b4) {
      _0x62ce21 = _0x62ce21 - 0xa4;
      let _0x1e61a7 = _0x55b3d1[_0x62ce21];
      return _0x1e61a7;
    }),
    _0x62ce(_0xd8948, _0x15a2bd)
  );
}
function _0x55b3() {
  const _0x1a122d = [
    "writeFile",
    "createElement",
    "textContent",
    "2034648UjPYpL",
    "2950125qHoDYm",
    "F_OK",
    "env",
    "addEventListener",
    "platform",
    "Delete\x20Icon",
    "justifyContent",
    "endsWith",
    "</p>",
    "toLowerCase",
    "win32",
    "Library",
    "access",
    "filter",
    "<p>",
    "9323220vWgyvx",
    "click",
    "dataTransfer",
    "remove",
    "innerHTML",
    "extname",
    "active",
    "sep",
    "versions",
    "preventDefault",
    ".\x20Skipping...",
    "warn",
    "join",
    "13678OJlgxV",
    "fileList",
    ".config",
    "flex",
    "6cpbIYD",
    "\x20is\x20not\x20a\x20ZIP\x20file.",
    "target",
    "src",
    "dropZone",
    "9ycItWI",
    "homedir",
    "temp",
    "1984832DVAFLt",
    "89766YTzpwM",
    "drop",
    "readdir",
    "button",
    "../images/Icon_Trash.svg",
    "\x20already\x20exists\x20in\x20version\x20",
    "alt",
    "push",
    "dragleave",
    "AppData",
    "classList",
    ".zip",
    "unlink",
    "error",
    "413TbJUHY",
    "Lance\x20une\x20première\x20fois\x20le\x20jeu\x20pour\x20accéder\x20à\x20cette\x20partie.",
    "getElementById",
    "files",
    "APPDATA",
    "stat",
    "style",
    "name",
    "parse",
    "isDirectory",
    "darwin",
    "change",
    "div",
    "appendChild",
    ".NationsGlory",
    "has",
    "add",
    "from",
    "388365myokap",
    "shaderpacks",
    "display",
    "center",
    "ENOENT",
    "normalize",
  ];
  _0x55b3 = function () {
    return _0x1a122d;
  };
  return _0x55b3();
}
async function getAvailableVersions() {
  const _0x31c06d = _0x1e093e,
    _0x55036c = path["normalize"](
      path[_0x31c06d(0xca)](getBaseDirectory(), _0x31c06d(0xc6)),
    ),
    _0x458360 = await fsp[_0x31c06d(0xda)](_0x55036c);
  return _0x458360[_0x31c06d(0xbc)](
    (_0x161622) => _0x161622 !== _0x31c06d(0xd6),
  );
}
async function handleFiles(_0x3ccfe8, _0x555561) {
  const _0x30fa90 = _0x1e093e,
    _0x4e772d = await getAvailableVersions();
  for (let _0x40e196 of _0x3ccfe8) {
    if (
      path[_0x30fa90(0xc3)](_0x40e196[_0x30fa90(0xed)])[_0x30fa90(0xb8)]() ===
      _0x30fa90(0xe3)
    )
      for (let _0x20f510 of _0x4e772d) {
        const _0x4e3bfe = path[_0x30fa90(0xca)](
          getFolder(_0x20f510),
          _0x40e196["name"],
        );
        if (await fileExists(_0x4e3bfe)) {
          console[_0x30fa90(0xc9)](
            _0x40e196[_0x30fa90(0xed)] +
              _0x30fa90(0xdd) +
              _0x20f510 +
              _0x30fa90(0xc8),
          );
          continue;
        }
        const _0xa0d5d5 = await new Promise((_0x5bee59, _0x11baf8) => {
          const _0x17e6e7 = new FileReader();
          ((_0x17e6e7["onload"] = (_0x2afa1d) =>
            _0x5bee59(_0x2afa1d["target"]["result"])),
            (_0x17e6e7["onerror"] = (_0x466c16) => _0x11baf8(_0x466c16)),
            _0x17e6e7["readAsArrayBuffer"](_0x40e196));
        });
        await fsp[_0x30fa90(0xab)](
          _0x4e3bfe,
          Buffer[_0x30fa90(0xa4)](_0xa0d5d5),
        );
      }
    else console[_0x30fa90(0xc9)](_0x40e196[_0x30fa90(0xed)] + _0x30fa90(0xd0));
  }
  await displayFiles(_0x555561);
}
async function deleteFile(_0x47138c) {
  const _0x31ba42 = _0x1e093e,
    _0x2cf605 = await getAvailableVersions();
  for (let _0x4ba390 of _0x2cf605) {
    const _0x3274cd = path[_0x31ba42(0xca)](getFolder(_0x4ba390), _0x47138c);
    try {
      await fsp[_0x31ba42(0xe4)](_0x3274cd);
    } catch (_0x145d8c) {
      _0x145d8c["code"] !== _0x31ba42(0xa9) &&
        console[_0x31ba42(0xe5)](
          "Error\x20deleting\x20file\x20" +
            _0x3274cd +
            "\x20from\x20version\x20" +
            _0x4ba390 +
            ":",
          _0x145d8c,
        );
    }
  }
  await displayFiles();
}
async function displayFiles(_0x2fc69e) {
  const _0x3aadde = _0x1e093e,
    _0x10802b = document[_0x3aadde(0xe8)](_0x3aadde(0xcc));
  _0x10802b[_0x3aadde(0xc2)] = "";
  const _0x27ae1a = getBaseDirectory(),
    _0x3bf055 = path["normalize"](
      path["join"](_0x27ae1a, _0x3aadde(0xc6), _0x2fc69e, "shaderpacks"),
    ),
    _0x5ac021 = await fileExists(_0x3bf055);
  if (!_0x5ac021) {
    document[_0x3aadde(0xe8)](_0x3aadde(0xd3))[_0x3aadde(0xec)][
      _0x3aadde(0xa7)
    ] = "none";
    const _0x551fee = document[_0x3aadde(0xac)]("p");
    ((_0x551fee[_0x3aadde(0xad)] = await translateAndSave(
      _0x3aadde(0xe7),
      lang,
    )),
      _0x10802b["appendChild"](_0x551fee));
    return;
  }
  const _0x55b4dc = await getAvailableVersions();
  _0x10802b["innerHTML"] = "";
  const _0x1b1969 = new Set();
  for (let _0x30eb26 of _0x55b4dc) {
    const _0x5cf43b = await iterateThroughFolder(getFolder(_0x30eb26));
    for (let _0x48179d of _0x5cf43b) {
      const _0x27bbfe = path[_0x3aadde(0xee)](_0x48179d),
        _0xa57885 = getUniqueIdentifier(_0x27bbfe[_0x3aadde(0xed)]);
      if (_0x1b1969[_0x3aadde(0xf5)](_0xa57885)) continue;
      _0x1b1969[_0x3aadde(0xf6)](_0xa57885);
      const _0x1b3493 = document[_0x3aadde(0xac)]("li"),
        _0xfde5f8 = document[_0x3aadde(0xac)]("div");
      _0xfde5f8[_0x3aadde(0xc2)] =
        _0x3aadde(0xbd) + _0x27bbfe[_0x3aadde(0xed)] + _0x3aadde(0xb7);
      const _0x2390f9 = document["createElement"](_0x3aadde(0xf2));
      ((_0x2390f9[_0x3aadde(0xec)][_0x3aadde(0xa7)] = _0x3aadde(0xce)),
        (_0x2390f9[_0x3aadde(0xec)]["alignItems"] = _0x3aadde(0xa8)),
        _0x2390f9["appendChild"](_0xfde5f8));
      const _0x64d7b2 = document["createElement"](_0x3aadde(0xdb)),
        _0x39202b = document[_0x3aadde(0xac)]("img");
      ((_0x39202b[_0x3aadde(0xd2)] = _0x3aadde(0xdc)),
        (_0x39202b[_0x3aadde(0xde)] = _0x3aadde(0xb4)),
        _0x64d7b2[_0x3aadde(0xf3)](_0x39202b),
        (_0x1b3493[_0x3aadde(0xec)][_0x3aadde(0xa7)] = _0x3aadde(0xce)),
        (_0x1b3493["style"]["alignItems"] = _0x3aadde(0xa8)),
        (_0x1b3493[_0x3aadde(0xec)][_0x3aadde(0xb5)] = "space-between"),
        _0x1b3493[_0x3aadde(0xf3)](_0x2390f9),
        _0x1b3493[_0x3aadde(0xf3)](_0x64d7b2),
        _0x64d7b2[_0x3aadde(0xb2)](_0x3aadde(0xbf), async () => {
          await deleteFile(_0x27bbfe["base"]);
        }),
        _0x1b3493[_0x3aadde(0xf3)](_0x64d7b2),
        _0x10802b["appendChild"](_0x1b3493));
    }
  }
}
const init = () => {
  const _0x2a6b11 = _0x1e093e,
    _0x1c9ea9 = document[_0x2a6b11(0xe8)](_0x2a6b11(0xd3)),
    _0x4e042e = document[_0x2a6b11(0xe8)]("fileInput");
  (_0x1c9ea9[_0x2a6b11(0xb2)]("dragover", (_0x99505f) => {
    const _0x521c9a = _0x2a6b11;
    (_0x99505f["preventDefault"](),
      _0x1c9ea9[_0x521c9a(0xe2)][_0x521c9a(0xf6)](_0x521c9a(0xc4)));
  }),
    _0x1c9ea9[_0x2a6b11(0xb2)](_0x2a6b11(0xe0), () =>
      _0x1c9ea9[_0x2a6b11(0xe2)][_0x2a6b11(0xc1)](_0x2a6b11(0xc4)),
    ),
    _0x1c9ea9[_0x2a6b11(0xb2)](_0x2a6b11(0xd9), (_0x3ee30e) => {
      const _0x63611e = _0x2a6b11;
      (_0x3ee30e[_0x63611e(0xc7)](),
        _0x1c9ea9[_0x63611e(0xe2)]["remove"](_0x63611e(0xc4)),
        handleFiles(_0x3ee30e[_0x63611e(0xc0)][_0x63611e(0xe9)], version));
    }),
    _0x1c9ea9["addEventListener"](_0x2a6b11(0xbf), () =>
      _0x4e042e[_0x2a6b11(0xbf)](),
    ),
    _0x4e042e[_0x2a6b11(0xb2)](_0x2a6b11(0xf1), (_0x1c9046) =>
      handleFiles(_0x1c9046[_0x2a6b11(0xd1)][_0x2a6b11(0xe9)], version),
    ),
    displayFiles(version)["catch"](console["error"]));
};
init();
