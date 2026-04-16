const translateAndSave = window.translateAndSave || (async (t) => t);
const _0x4a2d6b = _0x9041;
(function (_0x511ca7, _0x20fe00) {
  const _0x413837 = _0x9041,
    _0x4c6a32 = _0x511ca7();
  while (!![]) {
    try {
      const _0xab9678 =
        -parseInt(_0x413837(0x1f9)) / 0x1 +
        parseInt(_0x413837(0x1e4)) / 0x2 +
        parseInt(_0x413837(0x209)) / 0x3 +
        (-parseInt(_0x413837(0x221)) / 0x4) *
          (parseInt(_0x413837(0x201)) / 0x5) +
        (parseInt(_0x413837(0x1fd)) / 0x6) *
          (parseInt(_0x413837(0x1e5)) / 0x7) +
        parseInt(_0x413837(0x1fc)) / 0x8 +
        -parseInt(_0x413837(0x1fb)) / 0x9;
      if (_0xab9678 === _0x20fe00) break;
      else _0x4c6a32["push"](_0x4c6a32["shift"]());
    } catch (_0x46cbb7) {
      _0x4c6a32["push"](_0x4c6a32["shift"]());
    }
  }
})(_0xcffc, 0x72d79);
const JSZip = require(_0x4a2d6b(0x1f2));
function getBaseDirectory() {
  const _0x17b57b = _0x4a2d6b;
  let _0x221044;
  switch (os["platform"]()) {
    case "win32":
      let _0x574265 =
        process[_0x17b57b(0x1e1)][_0x17b57b(0x21d)] ||
        path[_0x17b57b(0x1f0)](
          os["homedir"](),
          _0x17b57b(0x1e0),
          _0x17b57b(0x220),
        );
      !_0x574265[_0x17b57b(0x20f)](path[_0x17b57b(0x233)]) &&
        (_0x574265 += path[_0x17b57b(0x233)]);
      _0x221044 = path[_0x17b57b(0x1f0)](_0x574265, _0x17b57b(0x231));
      break;
    case "darwin":
      _0x221044 = path[_0x17b57b(0x1f0)](
        os[_0x17b57b(0x23b)](),
        "Library",
        _0x17b57b(0x1ef),
        _0x17b57b(0x231),
      );
      break;
    default:
      _0x221044 = path[_0x17b57b(0x1f0)](
        os[_0x17b57b(0x23b)](),
        _0x17b57b(0x22c),
        _0x17b57b(0x231),
      );
      break;
  }
  return path[_0x17b57b(0x1df)](_0x221044);
}
async function getAvailableVersions() {
  const _0x268a49 = _0x4a2d6b,
    _0x47b7ca = await fsp["readdir"](
      path[_0x268a49(0x1df)](
        path["join"](getBaseDirectory(), _0x268a49(0x21a)),
      ),
    );
  return _0x47b7ca[_0x268a49(0x1fa)]((_0x47d8a9) => _0x47d8a9 !== "temp");
}
function getFolder(_0x11cb37) {
  const _0x1682d8 = _0x4a2d6b;
  return path[_0x1682d8(0x1df)](
    path[_0x1682d8(0x1f0)](
      getBaseDirectory(),
      _0x1682d8(0x21a),
      _0x11cb37,
      _0x1682d8(0x238),
    ),
  );
}
async function fileExists(_0x9a5922) {
  const _0x5dc0d7 = _0x4a2d6b;
  try {
    return (
      await fsp[_0x5dc0d7(0x1eb)](
        _0x9a5922,
        fsp[_0x5dc0d7(0x1dc)][_0x5dc0d7(0x1f3)],
      ),
      !![]
    );
  } catch {
    return ![];
  }
}
function getUniqueIdentifier(_0x2173a3, _0x27332d) {
  return _0x2173a3 + "-" + _0x27332d;
}
async function handleFiles(_0x31adcf, _0x589506) {
  const _0xd38d0b = _0x4a2d6b,
    _0x3da0a0 = await getAvailableVersions();
  for (let _0x8a40e9 of _0x31adcf) {
    if (
      path[_0xd38d0b(0x1f1)](_0x8a40e9[_0xd38d0b(0x219)])["toLowerCase"]() !==
      ".zip"
    ) {
      console[_0xd38d0b(0x1e9)](
        _0x8a40e9[_0xd38d0b(0x219)] + "\x20is\x20not\x20a\x20ZIP\x20file.",
      );
      continue;
    }
    const _0x4220ab = await readFileAsArrayBuffer(_0x8a40e9);
    for (let _0x40b956 of _0x3da0a0) {
      const _0x36e0f9 = path[_0xd38d0b(0x1f0)](
        getFolder(_0x40b956),
        _0x8a40e9["name"],
      );
      !(await fileExists(_0x36e0f9))
        ? await fsp["writeFile"](_0x36e0f9, Buffer[_0xd38d0b(0x232)](_0x4220ab))
        : console[_0xd38d0b(0x1e9)](
            _0x8a40e9[_0xd38d0b(0x219)] +
              "\x20already\x20exists\x20in\x20version\x20" +
              _0x40b956 +
              _0xd38d0b(0x1de),
          );
    }
  }
  await displayFiles();
}
async function readFileAsArrayBuffer(_0x2288b3) {
  return new Promise((_0x1ece8e, _0x3bc9c) => {
    const _0x446a9a = _0x9041,
      _0x2708b6 = new FileReader();
    ((_0x2708b6[_0x446a9a(0x22a)] = (_0x1e6d78) =>
      _0x1ece8e(_0x1e6d78[_0x446a9a(0x230)][_0x446a9a(0x204)])),
      (_0x2708b6["onerror"] = (_0x546cd9) => _0x3bc9c(_0x546cd9)),
      _0x2708b6[_0x446a9a(0x21e)](_0x2288b3));
  });
}
async function iterateThroughFolder(_0x4568fd) {
  const _0x7f95a3 = _0x4a2d6b,
    _0x1f38f4 = await fsp["readdir"](_0x4568fd, { withFileTypes: !![] });
  let _0x5da682 = [];
  for (let _0x40fba8 of _0x1f38f4) {
    _0x5da682[_0x7f95a3(0x214)](path["join"](_0x4568fd, _0x40fba8["name"]));
  }
  return _0x5da682;
}
async function getZipContent(_0x57724e) {
  const _0x419d35 = _0x4a2d6b;
  if (path["extname"](_0x57724e)["toLowerCase"]() !== _0x419d35(0x213)) {
    console[_0x419d35(0x1e9)](_0x57724e + _0x419d35(0x236));
    const _0x1b6547 = { description: null, image: null };
    return _0x1b6547;
  }
  const _0x353f72 = { description: null, image: null };
  try {
    const _0x4eeecd = await fsp["readFile"](_0x57724e),
      _0x471b45 = await JSZip[_0x419d35(0x1e7)](_0x4eeecd);
    if (_0x471b45[_0x419d35(0x239)][_0x419d35(0x226)]) {
      const _0x2d8abf = await _0x471b45[_0x419d35(0x234)](_0x419d35(0x226))[
          "async"
        ](_0x419d35(0x21f)),
        _0x111d0f = JSON[_0x419d35(0x212)](_0x2d8abf);
      _0x111d0f[_0x419d35(0x20c)] &&
        _0x111d0f[_0x419d35(0x20c)]["description"] &&
        (_0x353f72[_0x419d35(0x205)] =
          _0x111d0f[_0x419d35(0x20c)][_0x419d35(0x205)]);
    }
    if (_0x471b45[_0x419d35(0x239)][_0x419d35(0x1f5)]) {
      const _0x5d25cd = await _0x471b45[_0x419d35(0x234)](_0x419d35(0x1f5))[
        "async"
      ](_0x419d35(0x1ff));
      _0x353f72["image"] = _0x419d35(0x1e3) + _0x5d25cd;
    }
  } catch (_0x4c54b4) {
    console[_0x419d35(0x225)](_0x419d35(0x1fe) + _0x57724e + ":", _0x4c54b4);
  }
  return _0x353f72;
}
async function displayFiles() {
  const _0x542931 = _0x4a2d6b,
    _0x2aa170 = document[_0x542931(0x217)](_0x542931(0x1f6));
  _0x2aa170[_0x542931(0x22d)] = "";
  const _0x2a72be = getBaseDirectory(),
    _0x328086 = path["join"](
      _0x2a72be,
      _0x542931(0x21a),
      version,
      _0x542931(0x238),
    ),
    _0x138552 = await fileExists(_0x328086);
  if (!_0x138552) {
    document["getElementById"]("dropZone")[_0x542931(0x20e)]["display"] =
      _0x542931(0x218);
    const _0x5c57bb = document[_0x542931(0x23c)]("p");
    ((_0x5c57bb["textContent"] = await translateAndSave(
      "Lance\x20une\x20première\x20fois\x20le\x20jeu\x20pour\x20accéder\x20à\x20cette\x20partie.",
      lang,
    )),
      _0x2aa170["appendChild"](_0x5c57bb));
    return;
  }
  const _0x330df1 = await getAvailableVersions();
  _0x2aa170["innerHTML"] = "";
  const _0xbe75c = new Set();
  for (let _0x10da95 of _0x330df1) {
    const _0x438bb4 = await iterateThroughFolder(getFolder(_0x10da95));
    for (let _0x3a81ab of _0x438bb4) {
      const _0x5ef6c8 = path["parse"](_0x3a81ab),
        { description: _0x2bc97d, image: _0x5d1877 } =
          await getZipContent(_0x3a81ab),
        _0xe86f89 = getUniqueIdentifier(_0x5ef6c8["name"], _0x2bc97d);
      if (_0xbe75c[_0x542931(0x1dd)](_0xe86f89)) continue;
      _0xbe75c["add"](_0xe86f89);
      const _0xf0b7cf = document[_0x542931(0x23c)]("li");
      let _0x4568a0 = _0x5d1877 ? _0x5d1877 : _0x542931(0x22e);
      const _0x2334c1 = document[_0x542931(0x23c)](_0x542931(0x21c));
      ((_0x2334c1[_0x542931(0x200)] = _0x4568a0),
        (_0x2334c1[_0x542931(0x211)] =
          _0x5ef6c8[_0x542931(0x219)] + _0x542931(0x20a)),
        (_0x2334c1["width"] = 0x32),
        (_0x2334c1["style"][_0x542931(0x215)] = _0x542931(0x1e2)));
      const _0x30b788 = document[_0x542931(0x23c)]("div");
      _0x30b788[_0x542931(0x22d)] =
        _0x542931(0x223) +
        _0x5ef6c8[_0x542931(0x219)] +
        _0x542931(0x1e6) +
        (_0x2bc97d || (await translateAndSave(_0x542931(0x1f8), lang))) +
        _0x542931(0x237);
      const _0x40dc30 = document[_0x542931(0x23c)]("div");
      ((_0x40dc30["style"][_0x542931(0x22b)] = "flex"),
        (_0x40dc30[_0x542931(0x20e)][_0x542931(0x207)] = "center"),
        _0x40dc30[_0x542931(0x216)](_0x2334c1),
        _0x40dc30[_0x542931(0x216)](_0x30b788));
      const _0x3e3f51 = document[_0x542931(0x23c)](_0x542931(0x1f4)),
        _0x115718 = document[_0x542931(0x23c)](_0x542931(0x21c));
      ((_0x115718[_0x542931(0x200)] = _0x542931(0x227)),
        (_0x115718["alt"] = "Delete\x20Icon"),
        _0x3e3f51["appendChild"](_0x115718),
        (_0xf0b7cf["style"][_0x542931(0x22b)] = _0x542931(0x20b)),
        (_0xf0b7cf[_0x542931(0x20e)][_0x542931(0x207)] = _0x542931(0x1e8)),
        (_0xf0b7cf[_0x542931(0x20e)][_0x542931(0x203)] = _0x542931(0x206)),
        _0xf0b7cf["appendChild"](_0x40dc30),
        _0xf0b7cf["appendChild"](_0x3e3f51),
        _0x3e3f51[_0x542931(0x21b)](_0x542931(0x208), async () => {
          const _0x1bdf98 = _0x542931;
          await deleteFile(_0x5ef6c8[_0x1bdf98(0x1ec)]);
        }),
        _0xf0b7cf[_0x542931(0x216)](_0x3e3f51),
        _0x2aa170[_0x542931(0x216)](_0xf0b7cf));
    }
  }
}
async function deleteFile(_0x3a81f1) {
  const _0x334b37 = _0x4a2d6b,
    _0x728747 = await getAvailableVersions();
  for (let _0x19f559 of _0x728747) {
    const _0x6ea7bb = path[_0x334b37(0x1f0)](getFolder(_0x19f559), _0x3a81f1);
    try {
      await fsp[_0x334b37(0x229)](_0x6ea7bb);
    } catch (_0x33e08b) {
      _0x33e08b["code"] !== "ENOENT" &&
        console[_0x334b37(0x225)](
          _0x334b37(0x20d) + _0x6ea7bb + _0x334b37(0x235) + _0x19f559 + ":",
          _0x33e08b,
        );
    }
  }
  await displayFiles();
}
function _0xcffc() {
  const _0x357a56 = [
    "pack.mcmeta",
    "../images/Icon_Trash.svg",
    "active",
    "unlink",
    "onload",
    "display",
    ".config",
    "innerHTML",
    "../images/User-3D.png",
    "drop",
    "target",
    ".NationsGlory",
    "from",
    "sep",
    "file",
    "\x20from\x20version\x20",
    "\x20is\x20not\x20a\x20ZIP\x20file.",
    "</p>",
    "resourcepacks",
    "files",
    "classList",
    "homedir",
    "createElement",
    "constants",
    "has",
    ".\x20Skipping...",
    "normalize",
    "AppData",
    "env",
    "10px",
    "data:image/png;base64,",
    "222648OMcPvE",
    "2924621vbUItr",
    "</p><p>",
    "loadAsync",
    "center",
    "warn",
    "dropZone",
    "access",
    "base",
    "dataTransfer",
    "change",
    "Application\x20Support",
    "join",
    "extname",
    "jszip",
    "F_OK",
    "button",
    "pack.png",
    "fileList",
    "remove",
    "Aucune\x20description",
    "252748tQMWqo",
    "filter",
    "7306218bnMvCG",
    "5167152mHlHzR",
    "6Ylskke",
    "Error\x20reading\x20contents\x20from\x20",
    "base64",
    "src",
    "1150480sASLjK",
    "preventDefault",
    "justifyContent",
    "result",
    "description",
    "space-between",
    "alignItems",
    "click",
    "1770054qhcrwp",
    "\x20thumbnail",
    "flex",
    "pack",
    "Error\x20deleting\x20file\x20",
    "style",
    "endsWith",
    "add",
    "alt",
    "parse",
    ".zip",
    "push",
    "marginRight",
    "appendChild",
    "getElementById",
    "none",
    "name",
    "versions",
    "addEventListener",
    "img",
    "APPDATA",
    "readAsArrayBuffer",
    "string",
    "Roaming",
    "4wVlBHP",
    "catch",
    "<p>",
    "dragover",
    "error",
  ];
  _0xcffc = function () {
    return _0x357a56;
  };
  return _0xcffc();
}
function _0x9041(_0x10ec93, _0xca8dfc) {
  const _0xcffc4f = _0xcffc();
  return (
    (_0x9041 = function (_0x904148, _0x570fd2) {
      _0x904148 = _0x904148 - 0x1dc;
      let _0x31c772 = _0xcffc4f[_0x904148];
      return _0x31c772;
    }),
    _0x9041(_0x10ec93, _0xca8dfc)
  );
}
function setupDropzoneListeners(_0x2fd6e3, _0x4618c5) {
  const _0x2ef4b1 = _0x4a2d6b;
  (_0x2fd6e3["addEventListener"](_0x2ef4b1(0x224), (_0x3c4427) => {
    const _0xe11b79 = _0x2ef4b1;
    (_0x3c4427["preventDefault"](),
      _0x2fd6e3[_0xe11b79(0x23a)][_0xe11b79(0x210)]("active"));
  }),
    _0x2fd6e3[_0x2ef4b1(0x21b)]("dragleave", () => {
      const _0x5ca2b9 = _0x2ef4b1;
      _0x2fd6e3[_0x5ca2b9(0x23a)][_0x5ca2b9(0x1f7)](_0x5ca2b9(0x228));
    }),
    _0x2fd6e3["addEventListener"](_0x2ef4b1(0x22f), async (_0x5d3874) => {
      const _0x433064 = _0x2ef4b1;
      (_0x5d3874[_0x433064(0x202)](),
        _0x2fd6e3[_0x433064(0x23a)][_0x433064(0x1f7)]("active"),
        await handleFiles(
          _0x5d3874[_0x433064(0x1ed)][_0x433064(0x239)],
          version,
        ));
    }),
    _0x2fd6e3["addEventListener"](_0x2ef4b1(0x208), () => {
      const _0x1e2b95 = _0x2ef4b1;
      _0x4618c5[_0x1e2b95(0x208)]();
    }),
    _0x4618c5["addEventListener"](_0x2ef4b1(0x1ee), async (_0x5ca954) => {
      const _0x1622f6 = _0x2ef4b1;
      await handleFiles(_0x5ca954[_0x1622f6(0x230)][_0x1622f6(0x239)], version);
    }));
}
(setupDropzoneListeners(
  document[_0x4a2d6b(0x217)](_0x4a2d6b(0x1ea)),
  document[_0x4a2d6b(0x217)]("fileInput"),
),
  displayFiles(version)[_0x4a2d6b(0x222)](console[_0x4a2d6b(0x225)]));
