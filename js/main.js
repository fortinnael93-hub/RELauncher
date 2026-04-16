const _0x9ab494 = _0x482c;
(function (_0x3cc10b, _0x1ff5c7) {
  const _0xf4a8a4 = _0x482c,
    _0x17e2e4 = _0x3cc10b();
  while (!![]) {
    try {
      const _0x2a693b =
        (-parseInt(_0xf4a8a4(0x20b)) / 0x1) *
          (parseInt(_0xf4a8a4(0x1e4)) / 0x2) +
        (-parseInt(_0xf4a8a4(0x1ac)) / 0x3) *
          (parseInt(_0xf4a8a4(0x10c)) / 0x4) +
        (parseInt(_0xf4a8a4(0x215)) / 0x5) *
          (-parseInt(_0xf4a8a4(0xeb)) / 0x6) +
        (parseInt(_0xf4a8a4(0x232)) / 0x7) *
          (parseInt(_0xf4a8a4(0x17f)) / 0x8) +
        (-parseInt(_0xf4a8a4(0xf5)) / 0x9) *
          (parseInt(_0xf4a8a4(0x1ab)) / 0xa) +
        parseInt(_0xf4a8a4(0x11e)) / 0xb +
        (-parseInt(_0xf4a8a4(0x23c)) / 0xc) *
          (-parseInt(_0xf4a8a4(0x187)) / 0xd);
      if (_0x2a693b === _0x1ff5c7) break;
      else _0x17e2e4["push"](_0x17e2e4["shift"]());
    } catch (_0xad392a) {
      _0x17e2e4["push"](_0x17e2e4["shift"]());
    }
  }
})(_0x2ba2, 0x329ad);

const { Client } = require(_0x9ab494(0x1dc)),
  AdmZip = require(_0x9ab494(0x183)),
  { spawn } = require("child_process"),
  util = require("util"),
  conn = new Client(),
  pLimit = require(_0x9ab494(0xd3)),
  limit = pLimit(0xa);

let body = [],
  hddidUser;

const concurrencyLimit = 0xa;

function _0x482c(_0x17e079, _0x387559) {
  const _0x2ba2f0 = _0x2ba2();
  return (
    (_0x482c = function (_0x482c8d, _0x397393) {
      _0x482c8d = _0x482c8d - 0xcb;
      let _0x78e276 = _0x2ba2f0[_0x482c8d];
      return _0x78e276;
    }),
    _0x482c(_0x17e079, _0x387559)
  );
}

let activeDownloads = 0x0;
const downloadQueue = [];
let totalFiles = 0x0,
  processedFiles = 0x0;

const originalConsoleLogMain = console[_0x9ab494(0x236)];
console[_0x9ab494(0x236)] = function (..._0x464356) {
  const _0x9834ef = _0x9ab494;
  originalConsoleLogMain[_0x9834ef(0x123)](console, _0x464356);
  displayConsoleInDiv(_0x464356[_0x9834ef(0x132)]("\x20"));
};

function updateAvatar(_0x1ee2f7) {
  const _0x5125c9 = _0x9ab494,
    _0x4e6c00 = document[_0x5125c9(0x1df)](_0x5125c9(0x1f0));
  _0x4e6c00 &&
    _0x1ee2f7 &&
    (_0x4e6c00[_0x5125c9(0x229)] =
      _0x5125c9(0x115) + _0x1ee2f7 + _0x5125c9(0x219));
}

function handleStoreChange(_0x161858, _0x27e4f3) {
  const _0xc5af7d = _0x9ab494;
  switch (_0x161858) {
    case "username":
      username = _0x27e4f3;
      updateAvatar(username);
      break;
    case _0xc5af7d(0x23f):
      authtoken = _0x27e4f3;
      break;
    case _0xc5af7d(0x195):
      lang = _0x27e4f3;
      break;
    case _0xc5af7d(0x196):
      max_ram = _0x27e4f3;
      break;
  }
}

ipcRenderer["on"](_0x9ab494(0x113), async (_0x5baea1, _0x118c40, _0x5a4b68) => {
  handleStoreChange(_0x118c40, _0x5a4b68);
});

document[_0x9ab494(0x164)](_0x9ab494(0x179), function () {
  const _0xd064f4 = _0x9ab494,
    _0x5c900f = store[_0xd064f4(0x20d)]("username");
  if (_0x5c900f) updateAvatar(_0x5c900f);
  hddserial[_0xd064f4(0x217)](0x0, function (_0x1da57e, _0x1fdbc4) {
    const _0x28dfcc = _0xd064f4;
    if (_0x1da57e) {
      console["error"](_0x28dfcc(0x161), _0x1da57e);
    } else {
      hddidUser = _0x1fdbc4;
      hddid = _0x1fdbc4; // sync les deux
    }
  });
});

const ICON_PLAYER_PLAY =
    "<img\x20src=\x22../images/Icon_PlayerPlay.svg\x22\x20alt=\x22\x22\x20onclick=\x22togglePlayPause();\x22/>",
  ICON_PLAYER_PAUSE = _0x9ab494(0xd7);

async function getPaths(_0x33b886, _0x199738) {
  const _0x34d7cb = _0x9ab494;
  console[_0x34d7cb(0x236)](_0x34d7cb(0x15a) + _0x33b886);
  const _0x6de841 = await getFolder(),
    _0x36ed3c = path["join"](
      _0x6de841,
      _0x34d7cb(0x191),
      _0x33b886,
      "cef_cache",
    );
  !fs["existsSync"](_0x36ed3c) &&
    fs[_0x34d7cb(0x1eb)](_0x36ed3c, { recursive: !![] });
  let _0x41025b = path[_0x34d7cb(0x1ec)](
      path[_0x34d7cb(0x132)](_0x6de841, _0x34d7cb(0x191), _0x33b886),
    ),
    _0x225553 = path[_0x34d7cb(0x1ec)](
      path[_0x34d7cb(0x132)](_0x6de841, _0x34d7cb(0x14f)),
    ),
    _0xae3aa6 = path[_0x34d7cb(0x1ec)](
      path[_0x34d7cb(0x132)](_0x41025b, _0x34d7cb(0xd8)),
    ),
    _0x3b932f = "/versions/" + _0x33b886 + _0x34d7cb(0xe4),
    _0x457947 = path[_0x34d7cb(0x1ec)](
      path[_0x34d7cb(0x132)](_0x6de841, "manifest_" + _0x33b886 + ".json"),
    ),
    _0x4dcb4c = path[_0x34d7cb(0x1ec)](
      path["join"](_0x6de841, _0x34d7cb(0x103) + _0x33b886),
    ),
    _0x5b3dd8 = _0x34d7cb(0x1b5) + _0x33b886 + _0x34d7cb(0xd2),
    _0x315d08 = path[_0x34d7cb(0x1ec)](
      path["join"](_0x6de841, "latest_" + _0x33b886 + ".zip"),
    ),
    _0x25cf18 = "/binaries/" + _0x199738 + _0x34d7cb(0x147),
    _0x3bde61 = _0x34d7cb(0x230) + _0x199738 + _0x34d7cb(0xe4),
    _0x9ee724 = path[_0x34d7cb(0x1ec)](
      path["join"](_0x6de841, _0x34d7cb(0x133)),
    ),
    _0x35067a = path[_0x34d7cb(0x1ec)](
      path["join"](_0x6de841, _0x34d7cb(0x14f)),
    ),
    _0x3275d7 = _0x34d7cb(0x230) + _0x199738 + "/repo/latest.zip",
    _0x55a472 = path[_0x34d7cb(0x1ec)](
      path[_0x34d7cb(0x132)](_0x6de841, _0x34d7cb(0x19d)),
    ),
    _0x5d48de = os["platform"]() === _0x34d7cb(0x14c) ? ".exe" : "",
    _0x333354 = path["normalize"](
      path[_0x34d7cb(0x132)](
        _0x6de841,
        _0x34d7cb(0x14f),
        _0x34d7cb(0x171),
        "bin",
        _0x34d7cb(0x171) + _0x5d48de,
      ),
    );
  return {
    folder: _0x41025b,
    binariesPath: _0x225553,
    modsFolderPath: _0xae3aa6,
    remoteJSONPath: _0x3b932f,
    localJSONPath: _0x457947,
    BinariesRemoteBasePath: _0x25cf18,
    localFilesBasePath: _0x4dcb4c,
    remoteArchivePath: _0x5b3dd8,
    localArchivePath: _0x315d08,
    javaPath: _0x333354,
    BinariesRemoteJSONPath: _0x3bde61,
    BinariesLocalJSONPath: _0x9ee724,
    BinariesLocalFilesBasePath: _0x35067a,
    BinariesRemoteArchivePath: _0x3275d7,
    BinariesLocalArchivePath: _0x55a472,
  };
}

ipcRenderer["on"](_0x9ab494(0x156), async (_0x2656ef, _0x18424c, _0x5d72ab) => {
  const _0x54f2da = _0x9ab494;
  if (_0x18424c == _0x54f2da(0x118)) version = _0x5d72ab;
  if (_0x18424c == _0x54f2da(0x124)) {
    playing = ipcRenderer["sendSync"](_0x54f2da(0x126), _0x54f2da(0x124));
    setPlayButtonState(_0x5d72ab);
  }
  if (_0x18424c == "TriggerNGRadio") {
    setPlayButtonState(_0x5d72ab);
    ipcRenderer[_0x54f2da(0x168)](_0x54f2da(0xd0));
    ipcRenderer["send"](_0x54f2da(0x233), _0x5d72ab);
    ipcRenderer[_0x54f2da(0x168)](
      _0x54f2da(0x121),
      "NGRadioPlaying",
      _0x5d72ab,
    );
  }
});

// hddid déclaré en let pour pouvoir être mis à jour
let hddid = undefined,
  startTimestamp = new Date(),
  min_ram = 0x1;

window[_0x9ab494(0xd4)] = async function () {
  const authtoken = store.get("authtoken");
  console.log("TOKEN:", authtoken);

  if (authtoken) {
    try {
      const res = await axios.post(
        "https://refuge-api.onrender.com/v2/reauth",
        {
          accessToken: authtoken,
        },
      );

      console.log("Reauth response:", res.data);

      if (res.data.error) {
        console.log("Reauth échoué");
      } else {
        console.log("Reauth réussi");
      }
    } catch (err) {
      console.log("Erreur reauth:", err);
    }
  }

  ipcRenderer.send("checkUpdate");

  const _0x440f5e = document[_0xd7c3cb(0x1df)](_0xd7c3cb(0x1d9)),
    _0x431dfd = document[_0xd7c3cb(0x1df)](_0xd7c3cb(0x241));

  if (_0x440f5e && _0x431dfd) {
    _0x440f5e[_0xd7c3cb(0x15d)] = _0x13ffbd;
    _0x440f5e[_0xd7c3cb(0xcc)] = (_0x2ad648) =>
      _0x22af52(_0x431dfd, _0x2ad648["relatedTarget"]);
    _0x431dfd[_0xd7c3cb(0x15d)] = _0x13ffbd;
    _0x431dfd[_0xd7c3cb(0xcc)] = (_0x3e10ec) =>
      _0x22af52(_0x440f5e, _0x3e10ec[_0xd7c3cb(0x101)]);
  }

  function _0x13ffbd() {
    const _0xe0166e = _0xd7c3cb;
    clearTimeout(_0x2c1058);
    _0x431dfd[_0xe0166e(0x18b)][_0xe0166e(0x17d)] = "flex";
  }

  function _0x22af52(_0x20ad1a, _0x18d651, _0x2c96e1 = 0x12c) {
    const _0x2e7928 = _0xd7c3cb;
    if (!_0x20ad1a[_0x2e7928(0x157)](_0x18d651)) {
      _0x2c1058 = setTimeout(() => {
        _0x431dfd[_0x2e7928(0x18b)][_0x2e7928(0x17d)] = _0x2e7928(0x12f);
      }, _0x2c96e1);
    }
  }

  getInfo();
};

async function getJavaExecutablePath() {
  const _0x4b4886 = _0x9ab494,
    _0x3d0c23 =
      os[_0x4b4886(0xf7)]() === _0x4b4886(0x14c) ? _0x4b4886(0x1e3) : "";
  return path[_0x4b4886(0x132)](
    await getFolder(),
    _0x4b4886(0x14f),
    "java",
    _0x4b4886(0x151),
    _0x4b4886(0x171) + _0x3d0c23,
  );
}

const javaExecutable = getJavaExecutablePath();

let xms = _0x9ab494(0x209) + min_ram * 0x400 + "M",
  xmx = _0x9ab494(0x1c0) + max_ram * 0x400 + "M",
  minecraftLaunched = ![],
  crashed = ![],
  sorted = ![],
  secondsElapsed = 0x0,
  secondsDuration = 0x0;

function setPlayButtonState(_0x57d468) {
  const _0x3ee448 = _0x9ab494;
  let _0x342b05 = _0x57d468 ? _0x3ee448(0x1f7) : _0x3ee448(0x16e),
    _0x5cb5d3 = _0x3ee448(0x1f4);
  document[_0x3ee448(0x1df)](_0x3ee448(0x138))[_0x3ee448(0x229)] =
    _0x3ee448(0x175) +
    _0x342b05 +
    _0x3ee448(0xe9) +
    _0x5cb5d3 +
    _0x3ee448(0x100);
  let _0x4dcde3 = document[_0x3ee448(0x1df)](_0x3ee448(0x194))[
    "contentDocument"
  ][_0x3ee448(0xfa)](_0x3ee448(0x238));
  if (_0x4dcde3) {
    document["getElementById"](_0x3ee448(0x194))[_0x3ee448(0x198)][
      _0x3ee448(0xfa)
    ]("#radio\x20#play")[_0x3ee448(0x229)] =
      _0x3ee448(0x175) +
      _0x342b05 +
      _0x3ee448(0xe9) +
      _0x5cb5d3 +
      _0x3ee448(0x100);
  }
}

function isIPv6() {
  const _0x3ecebd = _0x9ab494;
  return instance[_0x3ecebd(0x20d)](_0x3ecebd(0x199))
    [_0x3ecebd(0x13c)]((_0x4b8858) => !![])
    [_0x3ecebd(0x1b2)]((_0x1e923d) => ![]);
}

function getInfo() {
  const _0xf66243 = _0x9ab494;
  instance[_0xf66243(0x20d)](API_RADIO)
    [_0xf66243(0x13c)]((_0x47bf92) => {
      const _0xd9f79e = _0xf66243;
      if (
        !_0x47bf92 ||
        !_0x47bf92[_0xd9f79e(0x185)] ||
        !_0x47bf92[_0xd9f79e(0x185)][_0xd9f79e(0xf2)]
      )
        return;
      ipcRenderer[_0xd9f79e(0x168)](
        _0xd9f79e(0x121),
        _0xd9f79e(0x207),
        _0x47bf92[_0xd9f79e(0x185)],
      );
      const _0x12be96 = _0x47bf92[_0xd9f79e(0x185)][_0xd9f79e(0xf2)];
      if (!_0x12be96 || !_0x12be96["song"]) return;
      document[_0xd9f79e(0x1df)](_0xd9f79e(0x108))[_0xd9f79e(0x11f)] =
        _0x12be96["song"]["art"];
      document[_0xd9f79e(0x1df)](_0xd9f79e(0xd9))["textContent"] =
        _0x12be96[_0xd9f79e(0x1c8)][_0xd9f79e(0x102)];
      document[_0xd9f79e(0x1df)](_0xd9f79e(0x1d6))[_0xd9f79e(0x1aa)] =
        _0x12be96[_0xd9f79e(0x1c8)][_0xd9f79e(0x1a1)];
      secondsElapsed = _0x12be96[_0xd9f79e(0x190)];
      secondsDuration = _0x12be96[_0xd9f79e(0x10f)];
    })
    ["catch"](console["log"]);
}

const interval = setInterval(() => {
  const _0x29fe4f = _0x9ab494;
  if (++secondsElapsed >= secondsDuration) getInfo();
  ipcRenderer["send"]("set-data", "NGRadioElapsed", secondsElapsed);
  ipcRenderer[_0x29fe4f(0x168)](
    _0x29fe4f(0x121),
    _0x29fe4f(0x169),
    secondsDuration,
  );
}, 0x3e8);

function convertSeconds(_0xb1293c) {
  const _0x2beea8 = _0x9ab494,
    _0x3857ed = ~~(_0xb1293c / 0x3c),
    _0x27c203 = (_0xb1293c % 0x3c)
      [_0x2beea8(0x165)]()
      [_0x2beea8(0x1f6)](0x2, "0");
  return _0x3857ed + ":" + _0x27c203;
}

function togglePlayPause() {
  const _0xd33923 = _0x9ab494;
  let _0x4baee9 = document["querySelector"]("#play-button\x20img")[
      _0xd33923(0x11f)
    ],
    _0x16954b = _0x4baee9[_0xd33923(0x14e)](_0xd33923(0x114));
  setPlayButtonState(!_0x16954b);
  ipcRenderer[_0xd33923(0x168)](_0xd33923(0x233), !_0x16954b);
  ipcRenderer[_0xd33923(0x168)]("set-data", "NGRadioPlaying", !_0x16954b);
}

function WindowMinimize() {
  const _0x2691b = _0x9ab494;
  ipcRenderer[_0x2691b(0x168)](_0x2691b(0x106));
}

function WindowMaximize() {
  const _0x2f62af = _0x9ab494;
  ipcRenderer["send"](_0x2f62af(0xff));
}

function WindowClose() {
  const _0x4fe5c3 = _0x9ab494;
  ipcRenderer[_0x4fe5c3(0x168)](_0x4fe5c3(0x1ad));
}

function classpath(_0x469155) {
  const _0x56a900 = _0x9ab494;
  if (!_0x469155 || typeof _0x469155 !== _0x56a900(0xcb))
    throw new Error("Invalid\x20folder\x20path");
  const _0x5c5517 = os[_0x56a900(0xf7)]() === "win32" ? ";" : ":";
  let _0x7f0198 = [];
  try {
    const _0x2d12aa = fs[_0x56a900(0x12d)](_0x469155);
    for (const _0x349667 of _0x2d12aa) {
      const _0xe0e921 = path[_0x56a900(0x132)](_0x469155, _0x349667);
      _0x7f0198[_0x56a900(0x189)](_0xe0e921);
    }
  } catch (_0x5cb6ad) {
    throw new Error(_0x56a900(0x125) + _0x5cb6ad[_0x56a900(0xee)]);
  }
  const _0x272126 = path["join"](_0x469155, "..", _0x56a900(0x192));
  _0x7f0198[_0x56a900(0x189)](_0x272126);
  return _0x7f0198[_0x56a900(0x132)](_0x5c5517);
}

function handleCrash(_0x5e04f8) {
  const _0x3f79a1 = _0x9ab494;
  ChangeRoute(_0x3f79a1(0x135));
  ipcRenderer[_0x3f79a1(0x168)]("set-data", _0x3f79a1(0x1ff), _0x5e04f8);
}

function fixPermissionsRecursively(_0x2f3fa8, _0x1f3d2b = 0x1ed) {
  const _0x48c480 = _0x9ab494;
  if (!fs[_0x48c480(0x1f3)](_0x2f3fa8)) {
    console[_0x48c480(0x137)](_0x48c480(0x212) + _0x2f3fa8);
    return;
  }
  const _0x23b37c = fs["readdirSync"](_0x2f3fa8);
  _0x23b37c["forEach"]((_0x137cbe) => {
    const _0x12f6b6 = _0x48c480,
      _0x5306b6 = path["join"](_0x2f3fa8, _0x137cbe),
      _0x3224c8 = fs[_0x12f6b6(0x22e)](_0x5306b6);
    if (_0x3224c8[_0x12f6b6(0x22a)]())
      fixPermissionsRecursively(_0x5306b6, _0x1f3d2b);
    fs["chmodSync"](_0x5306b6, _0x1f3d2b);
  });
}

async function fetchAllowedMod(_0x3677f9) {
  const _0x11aaf5 = _0x9ab494;
  try {
    const _0x34a946 = await axios[_0x11aaf5(0x20d)](_0x3677f9);
    return _0x34a946[_0x11aaf5(0x185)];
  } catch (_0x3d0a30) {
    console[_0x11aaf5(0x137)](_0x11aaf5(0x140), _0x3d0a30);
    minecraftLaunched = false;
    return [];
  }
}

async function getFolder() {
  const _0x238792 = _0x9ab494;
  let _0x141421;
  if (os["platform"]() === "win32") {
    let _0x54a7cc =
      process["env"]["APPDATA"] ||
      path[_0x238792(0x132)](
        os[_0x238792(0xfe)](),
        _0x238792(0x12b),
        _0x238792(0x210),
      );
    if (!_0x54a7cc[_0x238792(0xdb)](path[_0x238792(0x1a6)]))
      _0x54a7cc += path["sep"];
    _0x141421 = path["join"](_0x54a7cc, _0x238792(0x11d));
  } else if (os[_0x238792(0xf7)]() === "darwin") {
    _0x141421 = path[_0x238792(0x132)](
      os["homedir"](),
      "Library",
      _0x238792(0x1fa),
      _0x238792(0x11d),
    );
  } else {
    _0x141421 = path[_0x238792(0x132)](
      os["homedir"](),
      _0x238792(0x23a),
      ".NationsGlory",
    );
  }
  try {
    await fsp[_0x238792(0x15e)](_0x141421);
  } catch (_0xe2c9b4) {
    await fsp["mkdir"](_0x141421, { recursive: !![] });
  }
  return _0x141421;
}

async function getOldFolder() {
  const _0x5e3d00 = _0x9ab494;
  let _0xa45005;
  const _0x547fa1 = os[_0x5e3d00(0xf7)]();
  if (_0x547fa1 === _0x5e3d00(0x14c)) {
    let _0x208a17 =
      process[_0x5e3d00(0x1d4)][_0x5e3d00(0xdf)] ||
      path[_0x5e3d00(0x132)](
        os["homedir"](),
        _0x5e3d00(0x12b),
        _0x5e3d00(0x210),
      );
    _0xa45005 = path["join"](_0x208a17, _0x5e3d00(0x148));
  } else if (_0x547fa1 === _0x5e3d00(0xdd)) {
    _0xa45005 = path[_0x5e3d00(0x132)](
      os[_0x5e3d00(0xfe)](),
      "Library",
      _0x5e3d00(0x1fa),
      "ng",
    );
  } else {
    _0xa45005 = path["join"](os[_0x5e3d00(0xfe)](), _0x5e3d00(0x148));
  }
  return _0xa45005;
}

async function copyFilesIfApplicable(_0x1dafa0) {
  const _0x57a574 = _0x9ab494,
    _0xd09c9c = await getOldFolder(),
    _0x2e522b = await getFolder(),
    _0x2658c0 = [
      "options.txt",
      _0x57a574(0x1cd),
      _0x57a574(0x21c),
      _0x57a574(0xe0),
      _0x57a574(0xf3),
      _0x57a574(0x155),
      "shaderpacks",
      "screenshots",
      _0x57a574(0x13f),
    ];
  try {
    const _0xba9023 = await fsp[_0x57a574(0x134)](_0xd09c9c);
    if (!_0xba9023[_0x57a574(0x22a)]()) {
      console["warn"](_0x57a574(0xce) + _0xd09c9c);
      return;
    }
    const _0x349c32 = path["join"](_0x2e522b, "versions", _0x1dafa0);
    await fsp[_0x57a574(0x1c2)](_0x349c32, { recursive: !![] });
    for (const _0xce0b2c of _0x2658c0) {
      const _0x200a20 = path[_0x57a574(0x132)](_0xd09c9c, _0xce0b2c),
        _0x14d35a = path[_0x57a574(0x132)](_0x349c32, _0xce0b2c);
      try {
        const _0x36c741 = await fsp[_0x57a574(0x134)](_0x200a20);
        if (_0x36c741["isDirectory"]()) {
          await copyDirectory(_0x200a20, _0x14d35a);
        } else if (_0x36c741[_0x57a574(0x23e)]()) {
          try {
            await fsp[_0x57a574(0x15e)](
              _0x14d35a,
              fs[_0x57a574(0x1b9)][_0x57a574(0x234)],
            );
            console[_0x57a574(0x236)](_0x57a574(0x242) + _0x14d35a);
          } catch {
            await fsp[_0x57a574(0x122)](_0x200a20, _0x14d35a);
            console["log"](
              _0x57a574(0x184) + _0x200a20 + _0x57a574(0x1ca) + _0x14d35a,
            );
          }
        } else {
          console[_0x57a574(0x216)](
            "Unknown\x20item\x20type\x20(not\x20file\x20or\x20directory):\x20" +
              _0x200a20,
          );
        }
      } catch (_0x2c4878) {
        console[_0x57a574(0x216)](_0x57a574(0x22f) + _0x200a20);
      }
    }
  } catch (_0x28de44) {
    if (_0x28de44["code"] === _0x57a574(0x244)) {
      console[_0x57a574(0x216)](_0x57a574(0x1e7));
    } else {
      console[_0x57a574(0x137)](_0x57a574(0x1c9), _0x28de44);
    }
  }
}

async function copyDirectory(_0x4f039e, _0x77d34a) {
  const _0x1dc635 = _0x9ab494;
  await fsp[_0x1dc635(0x1c2)](_0x77d34a, { recursive: !![] });
  const _0x343166 = await fsp[_0x1dc635(0x1a9)](_0x4f039e, {
    withFileTypes: !![],
  });
  for (let _0xebe511 of _0x343166) {
    const _0x51a838 = path["join"](_0x4f039e, _0xebe511[_0x1dc635(0xf9)]),
      _0x31bf92 = path[_0x1dc635(0x132)](_0x77d34a, _0xebe511[_0x1dc635(0xf9)]);
    if (_0xebe511[_0x1dc635(0x22a)]()) {
      await copyDirectory(_0x51a838, _0x31bf92);
    } else {
      await fsp[_0x1dc635(0x122)](_0x51a838, _0x31bf92);
      console[_0x1dc635(0x236)](
        _0x1dc635(0x184) + _0x51a838 + _0x1dc635(0x1ca) + _0x31bf92,
      );
    }
  }
}

function _0x2ba2() {
  const _0x3e0e74 = [
    "push",
    "readFile",
    "style",
    "Archive\x20extraite\x20avec\x20succès.",
    ".txt",
    "trim",
    "reauth.success",
    "elapsed",
    "versions",
    "minecraft.jar",
    "all",
    "framecontent",
    "lang",
    "maxram",
    "--username",
    "contentDocument",
    "https://ipv6.nationsglory.fr/getip",
    "Jeu\x20en\x20cours",
    "GLIBC_TUNABLES",
    "Error\x20processing\x20file:\x20",
    "latest_binaries.zip",
    "background-image:url(\x27",
    "debug",
    "BinariesRemoteBasePath",
    "artist",
    "linux",
    "md5",
    "Tous\x20les\x20téléchargements\x20sont\x20terminés.",
    "end",
    "sep",
    "update",
    "hash",
    "readdir",
    "textContent",
    "1063970cnxloh",
    "174wpMVcV",
    "WindowClose",
    "stringify",
    "Version\x20avant\x20appel\x20à\x20getPaths:",
    "post",
    "Directory\x20deleted\x20successfully:\x20",
    "catch",
    "NjUzMjQ=",
    "entries",
    "/versions/",
    "toFixed",
    "Plus\x20de\x2030%\x20des\x20binaires\x20sont\x20modifiés.\x20Re-téléchargement\x20de\x20l\x27archive\x20des\x20binaires.",
    "Rejoindre",
    "constants",
    ".log",
    "--assetsDir",
    "-XX:+UseG1GC",
    "Répertoire\x20créé:\x20",
    "block",
    "Téléchargement\x20de\x20l\x27archive:\x20",
    "-Xmx",
    "https://nationsglory.fr",
    "mkdir",
    "replace",
    "binariesPath",
    "glibc.rtld.optional_static_tls=131072",
    "Minecraft\x20s\x27est\x20arrêté\x20avec\x20le\x20code\x20de\x20sortie\x20:\x20",
    "Début\x20des\x20tâches\x20de\x20téléchargement\x20concurrentes.",
    "song",
    "An\x20unexpected\x20error\x20occurred\x20during\x20the\x20copy\x20process:",
    "\x20to\x20",
    "Tous\x20les\x20dossiers\x20nécessaires\x20ont\x20été\x20vérifiés/créés.",
    "Erreur\x20durant\x20le\x20téléchargement\x20du\x20fichier\x20",
    "optionsof.txt",
    "Appel\x20à\x20setPermissionsRecursively...",
    "en\x20jeu\x20🕹️",
    "Erreur\x20SFTP\x20:",
    "perso_flag_preview",
    "Loaded\x20version:",
    "utf-8",
    "env",
    "Actuellement",
    "song-artist",
    "extractAllTo",
    "#737373",
    "NGRadio",
    "Impossible\x20d\x27extraire\x20l\x27archive.",
    "Erreur\x20durant\x20le\x20nettoyage\x20des\x20fichiers\x20supplémentaires\x20dans\x20",
    "ssh2",
    "floor",
    "progressText",
    "getElementById",
    "folder",
    "-Djava.tweaker3=",
    "Téléchargement\x20du\x20JSON\x20pour\x20les\x20binaires:",
    ".exe",
    "4fLQjls",
    "#@!@#\x20Game\x20crashed!",
    "art",
    "Aucune\x20ancienne\x20installation,\x20pas\x20de\x20migration\x20nécessaire.",
    "NationsGlory",
    "round",
    "Appel\x20à\x20copyFilesIfApplicable...",
    "mkdirSync",
    "normalize",
    "cssText",
    "posix",
    "\x20fichiers.",
    "avatar",
    "keys",
    "natives",
    "existsSync",
    "togglePlayPause",
    "Le\x20dossier\x20spécifié\x20n\x27existe\x20pas\x20:\x20",
    "padStart",
    "../images/Icon_PlayerPause.svg",
    "store",
    "sftp",
    "Application\x20Support",
    "config",
    "#FFFFFF",
    "-XX:MaxGCPauseMillis=50",
    "#@!@#\x20Minecraft\x20crashed!",
    "crashReport",
    "Téléchargement\x20des\x20manifestes...",
    "-Djava.net.preferIPv6Addresses=true",
    "hex",
    "IPv6\x20detected",
    "R_OK",
    "BinariesRemoteJSONPath",
    "Permissions\x20suffisantes\x20pour\x20le\x20dossier\x20:\x20",
    "NGRadioAPI",
    "----\x20Minecraft\x20Crash\x20Report\x20----",
    "-Xms",
    "split",
    "107409YgbWYe",
    "error.emailunverified",
    "get",
    "Binaires\x20à\x20télécharger:\x20",
    "Impossible\x20d\x27appliquer\x20les\x20permissions\x20sur\x20",
    "Roaming",
    "Appel\x20à\x20handleDownloads...",
    "Directory\x20not\x20found:\x20",
    "-Djava.tweaker2=",
    "File\x20locked:\x20",
    "31655pGSGYh",
    "warn",
    "one",
    "-XX:G1HeapRegionSize=32M",
    "/3d/6\x22\x20alt=\x22\x22/>",
    "description",
    "Échec\x20de\x20la\x20récupération\x20des\x20mods\x20autorisés.",
    "nationsgui-client.json",
    "-Dfml.ignoreInvalidMinecraftCertificates=true",
    "https://nationsglory.fr/from/",
    "sur\x20le\x20launcher",
    "File\x20deleted\x20successfully:\x20",
    "Dossier\x20ignoré,\x20aucun\x20nettoyage\x20:\x20",
    "Un\x20ou\x20plusieurs\x20éléments\x20de\x20progression\x20sont\x20manquants\x20dans\x20le\x20DOM.",
    "progressPercent",
    "value",
    "BinariesLocalFilesBasePath",
    "createHash",
    ".\x20Téléchargement\x20en\x20cours...",
    "Moins\x20de\x2030%\x20des\x20binaires\x20sont\x20modifiés.\x20Téléchargement\x20des\x20fichiers\x20manquants\x20ou\x20modifiés.",
    "innerHTML",
    "isDirectory",
    "relative",
    "kill",
    ".\x20Re-téléchargement...",
    "statSync",
    "Item\x20does\x20not\x20exist\x20and\x20will\x20be\x20skipped:\x20",
    "/binaries/",
    "progression",
    "1360702XsKsTk",
    "NGRadio-state-changed",
    "F_OK",
    "some",
    "log",
    "GamePID",
    "#radio\x20#play",
    "filter",
    ".config",
    "--tweakClass",
    "1354440iUVlvb",
    "connect",
    "isFile",
    "authtoken",
    "resources",
    "NGRadioModule",
    "File\x20already\x20exists,\x20skipping:\x20",
    "startsWith",
    "ENOENT",
    "string",
    "onmouseleave",
    "localArchivePath",
    "Old\x20folder\x20exists\x20but\x20is\x20not\x20a\x20directory:\x20",
    "assets",
    "NGRadio-playpause",
    "Impossible\x20de\x20supprimer\x20l\x27archive\x20:\x20",
    "/repo/latest.zip",
    "p-limit",
    "onload",
    "code",
    "remoteArchivePath",
    "<img\x20src=\x22../images/Icon_PlayerPause.svg\x22\x20alt=\x22\x22\x20onclick=\x22togglePlayPause();\x22/>",
    "mods",
    "song-title",
    "Lancement\x20de\x20Minecraft...",
    "endsWith",
    "promises",
    "darwin",
    "modsFolderPath",
    "APPDATA",
    "nationsgui.dat",
    "https://refuge-api.onrender.com/v2/reauth?lang=",
    "Tous\x20les\x20fichiers\x20concurrents\x20ont\x20été\x20téléchargés.",
    "set-discord-presence",
    "/repo/manifest.json",
    "W_OK",
    "stderr",
    "Début\x20du\x20nettoyage\x20des\x20fichiers\x20supplémentaires.",
    "fastGet",
    "\x22\x20alt=\x22\x22\x20onclick=\x22",
    "Permissions\x20insuffisantes\x20pour\x20le\x20dossier\x20:\x20",
    "6tcbHdQ",
    "Dossier\x20déjà\x20existant\x20:\x20",
    "Moins\x20de\x2030%\x20des\x20fichiers\x20sont\x20modifiés.\x20Téléchargement\x20des\x20fichiers\x20manquants\x20ou\x20modifiés.",
    "message",
    "actionButton",
    "size",
    "Fichiers\x20à\x20télécharger:\x20",
    "now_playing",
    "optionsshaders.txt",
    "\x20after\x20all\x20retries\x20due\x20to\x20the\x20file\x20being\x20locked.",
    "9DNqPjx",
    "EBUSY",
    "platform",
    "cef_cache",
    "name",
    "querySelector",
    "Skipping\x20deletion\x20for\x20",
    "\x20is\x20available.",
    "Chemins\x20récupérés:",
    "homedir",
    "WindowMaximize",
    "();\x22/>",
    "relatedTarget",
    "title",
    "versions/",
    "[NGLauncher]\x20Handling\x20game\x20crash",
    "forEach",
    "WindowMinimize",
    "-Djava.lang=",
    "song-image",
    "width",
    "set",
    "-cp",
    "8860HBcrKg",
    "Permissions\x20",
    "indexOf",
    "duration",
    "&lang=",
    "unlink",
    "Version\x20",
    "store-change",
    "Icon_PlayerPause.svg",
    "<span\x20class=\x22is-pulse\x22></span><img\x20src=\x22https://skins.nationsglory.fr/face/",
    "Suppression\x20du\x20fichier\x20interdit\x20:\x20",
    "chmodSync",
    "currentVersion",
    "launchGame",
    "handleDownloads\x20terminé.",
    "Lancer",
    "frameContent\x20non\x20trouvé.",
    ".NationsGlory",
    "3916407qlyDfJ",
    "src",
    "net.minecraft.launchwrapper.Launch",
    "set-data",
    "copyFile",
    "apply",
    "NGRadioPlaying",
    "Impossible\x20de\x20lire\x20le\x20dossier\x20:\x20",
    "get-data",
    "createReadStream",
    "BinariesLocalArchivePath",
    "\x20(Taille:\x20",
    "dirname",
    "AppData",
    "length",
    "readdirSync",
    "[NGLauncher]\x20Game\x20crash\x20detected,\x20querying...",
    "none",
    "Impossible\x20d\x27appliquer\x20les\x20permissions\x20à\x20",
    "BinariesRemoteArchivePath",
    "join",
    "manifest_binaries.json",
    "stat",
    "crashreport",
    "cpw.mods.fml.common.launcher.FMLTweaker",
    "error",
    "play-button",
    "--gameDir",
    "EPERM",
    "BinariesLocalJSONPath",
    "then",
    "stdout",
    "Re-téléchargement\x20archive\x20fichiers:\x20",
    "schematics",
    "Erreur\x20durant\x20la\x20récupération\x20des\x20hash\x20autorisés\x20:",
    "image",
    ",\x20retrying...\x20(",
    "ng-ffffff",
    "Téléchargement\x20du\x20JSON\x20pour\x20les\x20fichiers:",
    "Client\x20::\x20ready",
    "path",
    "/files",
    ".ng",
    "libs",
    "delete",
    "Selected\x20version\x20not\x20available,\x20switching\x20to\x20stable.",
    "win32",
    "Erreur\x20durant\x20le\x20processus\x20de\x20téléchargement:\x20",
    "includes",
    "binaries",
    "Téléchargement\x20du\x20fichier:",
    "bin",
    "invoke",
    "copyFilesIfApplicable\x20terminé.",
    "Fichier\x20manquant\x20détecté:\x20",
    "resourcepacks",
    "data-change",
    "contains",
    "ready",
    "windows",
    "Version\x20received\x20in\x20getPaths:\x20",
    "localJSONPath",
    "pid",
    "onmouseenter",
    "access",
    "https://refuge-api.onrender.com/launcher/home?lang=",
    "Préparation\x20au\x20lancement\x20de\x20Minecraft...",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20du\x20numéro\x20de\x20série\x20du\x20disque\x20:",
    "Manifestes\x20lus\x20et\x20parsés.",
    "extname",
    "addEventListener",
    "toString",
    "remoteJSONPath",
    "https://refuge-api.onrender.com/launcher/getMoreMods?token=",
    "send",
    "NGRadioDuration",
    "localFilesBasePath",
    "parse",
    "Lecture\x20des\x20manifestes\x20téléchargés...",
    "\x20retries\x20left)",
    "../images/Icon_PlayerPlay.svg",
    "sendSync",
    "Vérification\x20en\x20cours",
    "java",
    "Erreur\x20durant\x20les\x20téléchargements\x20concurrents\x20:",
    "Archive\x20supprimée\x20avec\x20succès.",
    "substring",
    "<img\x20src=\x22",
    "setPermissionsRecursively\x20terminé.",
    "map",
    "octets",
    "DOMContentLoaded",
    "Conservation\x20du\x20fichier\x20autorisé\x20:\x20",
    "mac",
    "-XX:G1NewSizePercent=20",
    "display",
    "background",
    "8KECCia",
    "&cuid=",
    "Début\x20du\x20processus\x20de\x20téléchargement...",
    "Vérification\x20des\x20modifications\x20des\x20fichiers...",
    "adm-zip",
    "Copied\x20file\x20",
    "data",
    "host",
    "13wDvPAG",
    "launcher",
  ];
  _0x2ba2 = function () {
    return _0x3e0e74;
  };
  return _0x2ba2();
}

function pidIsRunning(_0x1653f1) {
  const _0x5c70d6 = _0x9ab494;
  try {
    process[_0x5c70d6(0x22c)](_0x1653f1, 0x0);
    return true;
  } catch (_0x91d3b) {
    return false;
  }
}

// ============================================================
// LISTENER MESSAGE - Lancement du jeu
// ============================================================
window[_0x9ab494(0x164)]("message", async (_0x2c4aa1) => {
  const _0x528d9b = _0x9ab494;
  if (_0x2c4aa1["data"]["action"] !== _0x528d9b(0x119)) return;
  if (minecraftLaunched) return;

  minecraftLaunched = true;
  try {
    const _0x2ca25a = await axios.post(
      "https://refuge-api.onrender.com/v2/reauth",
      { accessToken: authtoken },
    );

    console.log("Réponse reauth:", JSON.stringify(_0x2ca25a.data));

    if (!_0x2ca25a || !_0x2ca25a.data) {
      console.log("Réponse vide, abandon.");
      minecraftLaunched = false;
      return;
    }

    // Vérification des versions disponibles (non bloquante)
    try {
      const versionsResp = await instance[_0x528d9b(0x20d)](
        _0x528d9b(0x15f) +
          lang +
          "&cuid=" +
          cuidUser +
          "&authtoken=" +
          authtoken,
      );
      const availableTags =
        versionsResp[_0x528d9b(0x185)][0x5][_0x528d9b(0x191)];
      if (!availableTags[_0x528d9b(0x14e)](version)) {
        version = "stable";
        console.log("Version non disponible, passage en stable.");
        ipcRenderer[_0x528d9b(0x152)]("store", "version", version);
        ipcRenderer[_0x528d9b(0x168)](
          _0x528d9b(0x121),
          _0x528d9b(0x118),
          version,
        );
      } else {
        console.log("Version " + version + " disponible.");
      }
    } catch (e) {
      console.log("Erreur vérification versions:", e.message);
      version = "stable";
      ipcRenderer[_0x528d9b(0x152)]("store", "version", version);
      ipcRenderer[_0x528d9b(0x168)](
        _0x528d9b(0x121),
        _0x528d9b(0x118),
        version,
      );
    }

    // Vérification de la réponse reauth
    const reauthError = _0x2ca25a["data"][_0x528d9b(0x137)];

    if (reauthError === _0x528d9b(0x20c)) {
      // error.emailunverified
      alert(_0x2ca25a["data"][_0x528d9b(0x21a)]);
      minecraftLaunched = false;
      return;
    }

    if (reauthError === _0x528d9b(0x18f)) {
      // reauth.success
      console.log("Reauth réussie ! Démarrage du téléchargement...");
      const _0x4cfe4b = document[_0x528d9b(0x1df)](_0x528d9b(0x194))[
        _0x528d9b(0x198)
      ];
      if (_0x4cfe4b) {
        _0x4cfe4b[_0x528d9b(0x1df)](_0x528d9b(0x231))[_0x528d9b(0x18b)][
          _0x528d9b(0x17d)
        ] = _0x528d9b(0x1be);
        _0x4cfe4b[_0x528d9b(0x1df)]("actionButton")[_0x528d9b(0x18b)][
          _0x528d9b(0x17e)
        ] = _0x528d9b(0x1d8);
        _0x4cfe4b[_0x528d9b(0x1df)]("actionButton")[_0x528d9b(0x229)] =
          await translateAndSave(_0x528d9b(0x170), lang);
      }
      startDownloadAndLaunch(
        version,
        authtoken,
        osArchInfo,
        lang,
        username,
        cuidUser,
        mac,
        hddidUser,
      );
    } else {
      console.log("Réponse inattendue de reauth:", reauthError, "→ logout");
      minecraftLaunched = false;
      logout();
    }
  } catch (err) {
    console.log("ERREUR reauth:", err.message, err.code);
    minecraftLaunched = false;
  }
});

// ============================================================
// SFTP conn (conservé pour compatibilité mais non utilisé)
// ============================================================
conn["on"](_0x9ab494(0x158), async () => {
  const _0x10cd65 = _0x9ab494;
  console[_0x10cd65(0x236)](_0x10cd65(0x145));
  console[_0x10cd65(0x236)](_0x10cd65(0x1af), version);
  try {
    const _0x23b927 = await getPaths(version, osArchInfo);
    console[_0x10cd65(0x236)](_0x10cd65(0xfd), _0x23b927);
    conn[_0x10cd65(0x1f9)](async (_0x246b71, _0x1ab1e3) => {
      const _0xb7fb92 = _0x10cd65;
      if (_0x246b71) {
        console[_0xb7fb92(0x137)](_0xb7fb92(0x1d0), _0x246b71);
        throw _0x246b71;
      }
      try {
        const _0x27705e = await fetchAllowedMod(
          _0xb7fb92(0x167) +
            authtoken +
            _0xb7fb92(0x180) +
            cuidUser +
            _0xb7fb92(0x110) +
            lang,
        );
        if (!_0x27705e) throw new Error(_0xb7fb92(0x21b));
        console[_0xb7fb92(0x236)](
          "Mods\x20autorisés\x20récupérés\x20:",
          _0x27705e,
        );
        await handleDownloads(_0x1ab1e3, _0x23b927, _0x27705e);
        await copyFilesIfApplicable(version);
        fixPermissionsRecursively(_0x23b927["binariesPath"], 0x1ed);
        fixPermissionsRecursively(_0x23b927[_0xb7fb92(0x1e0)], 0x1ed);
        await launchMinecraft(
          _0x23b927,
          version,
          osArchInfo,
          lang,
          username,
          authtoken,
          cuidUser,
          mac,
          hddidUser,
        );
      } catch (_0x423578) {
        console["error"]("Erreur\x20durant\x20le\x20processus\x20:", _0x423578);
        conn[_0xb7fb92(0x1a5)]();
      } finally {
        conn[_0xb7fb92(0x1a5)]();
      }
    });
  } catch (_0x2c0153) {
    console[_0x10cd65(0x137)]("Erreur\x20de\x20connexion\x20:", _0x2c0153);
    conn[_0x10cd65(0x1a5)]();
  }
});

// ============================================================
// launchMinecraft
// ============================================================
async function launchMinecraft(
  _0x3fe4df,
  _0x44022b,
  _0x41a863,
  _0x4c8d27,
  _0x5beaeb,
  _0x5327a9,
  _0x38b5ae,
  _0x465286,
  _0x4b4bd5,
) {
  const _0x3e3b12 = _0x9ab494;
  try {
    console[_0x3e3b12(0x236)](_0x3e3b12(0x160));
    const _0x1e4148 = classpath(
        path[_0x3e3b12(0x132)](_0x3fe4df[_0x3e3b12(0x1e0)], _0x3e3b12(0x149)),
      ),
      _0x47470d = path[_0x3e3b12(0x132)](
        _0x3fe4df[_0x3e3b12(0x1c4)],
        _0x3e3b12(0x1f2),
      ),
      _0x563574 =
        os[_0x3e3b12(0xf7)]() === "win32"
          ? _0x3e3b12(0x159)
          : os[_0x3e3b12(0xf7)]() === _0x3e3b12(0xdd)
            ? _0x3e3b12(0x17b)
            : _0x3e3b12(0x1a2),
      _0x8c2313 = path[_0x3e3b12(0x132)](_0x47470d, _0x563574),
      _0x5ae552 = [_0x47470d, _0x8c2313]["join"](
        os[_0x3e3b12(0xf7)]() === "win32" ? ";" : ":",
      );

    let _0x5394ea = [
      _0x3e3b12(0x209) + min_ram * 0x400 + "M",
      "-Xmx" + max_ram * 0x400 + "M",
      "-XX:+UnlockExperimentalVMOptions",
      _0x3e3b12(0x1bc),
      _0x3e3b12(0x17c),
      "-XX:G1ReservePercent=20",
      _0x3e3b12(0x1fd),
      _0x3e3b12(0x218),
      "-Djava.library.path=" + _0x5ae552,
      _0x3e3b12(0x107) + _0x4c8d27,
      "-Djava.tweaker=" + _0x38b5ae,
      _0x3e3b12(0x213) + _0x4b4bd5,
      _0x3e3b12(0x1e1) + _0x465286,
      _0x3e3b12(0x21d),
      _0x3e3b12(0x10b),
      _0x1e4148,
      _0x3e3b12(0x120),
      _0x3e3b12(0x197),
      _0x5beaeb,
      "--session",
      _0x5327a9,
      _0x3e3b12(0x139),
      _0x3fe4df[_0x3e3b12(0x1e0)],
      "--version",
      _0x44022b,
      _0x3e3b12(0x1bb),
      path["join"](_0x3fe4df[_0x3e3b12(0x1e0)], _0x3e3b12(0xcf)),
      _0x3e3b12(0x23b),
      _0x3e3b12(0x136),
    ];

    const _0x3fb775 = { ...process[_0x3e3b12(0x1d4)] };
    if (os["platform"]() === _0x3e3b12(0x1a2)) {
      _0x3fb775[_0x3e3b12(0x19b)] = _0x3e3b12(0x1c5);
    }

    if (await isIPv6()) {
      console[_0x3e3b12(0x236)](_0x3e3b12(0x203));
      _0x5394ea["push"](_0x3e3b12(0x201));
    } else {
      console[_0x3e3b12(0x236)]("IPv4\x20detected");
    }

    console[_0x3e3b12(0x236)](_0x3e3b12(0xda));
    const _0x2d521f = spawn(await getJavaExecutablePath(), _0x5394ea, {
      detached: true,
      cwd: _0x3fe4df["folder"],
      env: _0x3fb775,
    });

    console[_0x3e3b12(0x236)](
      "Minecraft\x20lancé\x20avec\x20PID:",
      _0x2d521f[_0x3e3b12(0x15c)],
    );

    let _0x1be85e = false,
      _0x2d2f8e = "";

    const _0x36fb75 = (_0x7de658) => {
      const _0x46df01 = _0x3e3b12,
        _0x5ec5c7 = "" + _0x7de658,
        _0x807ddf = _0x5ec5c7[_0x46df01(0x10e)](_0x46df01(0x208));
      if (_0x1be85e) _0x2d2f8e += _0x5ec5c7;
      if (_0x807ddf !== -0x1) {
        console[_0x46df01(0x236)](_0x46df01(0x12e));
        _0x1be85e = true;
        crashed = true;
        _0x2d2f8e += _0x5ec5c7[_0x46df01(0x174)](_0x807ddf);
      }
      if (_0x5ec5c7[_0x46df01(0x10e)](_0x46df01(0x1e5)) !== -0x1) {
        console[_0x46df01(0x236)](_0x46df01(0x104));
        _0x2d2f8e = _0x2d2f8e[_0x46df01(0x20a)]("\x0a")
          [_0x46df01(0x177)]((_0xc08d53) =>
            _0xc08d53[_0x46df01(0x174)](_0xc08d53["lastIndexOf"]("]") + 0x2),
          )
          [_0x46df01(0x132)]("\x0a")
          [_0x46df01(0x18e)]();
        if (sorted)
          _0x2d2f8e = _0x2d2f8e[_0x46df01(0x1c3)](
            _0x46df01(0x1e5),
            _0x46df01(0x1fe),
          );
        _0x1be85e = false;
        handleCrash(_0x2d2f8e);
      }
      console["log"](_0x5ec5c7[_0x46df01(0x18e)]());
    };

    _0x2d521f[_0x3e3b12(0x13d)]["on"]("data", _0x36fb75);
    _0x2d521f[_0x3e3b12(0xe6)]["on"](_0x3e3b12(0x185), _0x36fb75);

    _0x2d521f["on"](_0x3e3b12(0x137), (_0x37344c) => {
      console[_0x3e3b12(0x137)]("Erreur\x20démarrage\x20Minecraft:", _0x37344c);
    });

    _0x2d521f["on"]("exit", async (_0x281e80) => {
      const _0x4372c9 = _0x3e3b12;
      minecraftLaunched = false;
      store[_0x4372c9(0x14a)]("GamePID");
      const frameDoc = document[_0x4372c9(0x1df)](_0x4372c9(0x194))[
        _0x4372c9(0x198)
      ];
      if (frameDoc && frameDoc[_0x4372c9(0x1df)]("actionButton")) {
        frameDoc[_0x4372c9(0x1df)]("actionButton")[_0x4372c9(0x18b)][
          _0x4372c9(0x17e)
        ] = _0x4372c9(0x1fc);
        frameDoc[_0x4372c9(0x1df)](_0x4372c9(0xef))[_0x4372c9(0x229)] =
          await translateAndSave(_0x4372c9(0x11b), _0x4c8d27);
      }
      console[_0x4372c9(0x236)](_0x4372c9(0x1c6) + _0x281e80);
      ipcRenderer[_0x4372c9(0x168)](_0x4372c9(0xe3), {
        state: "sur\x20le\x20launcher",
        details: _0x4372c9(0x1d5),
        startTimestamp: startTimestamp,
        largeImageKey: "thumbnail",
        largeImageText: _0x4372c9(0x1e8),
        smallImageKey: _0x4372c9(0x143),
        smallImageText: _0x5beaeb,
        instance: false,
        buttons: [
          {
            label: _0x4372c9(0x1b8),
            url: "https://nationsglory.fr/from/" + _0x5beaeb,
          },
        ],
      });
    });

    _0x2d521f["stdout"]["on"](_0x3e3b12(0x185), (_0x19e0c4) => {
      console["log"]("Minecraft\x20stdout\x20:\x20" + _0x19e0c4);
    });
    _0x2d521f[_0x3e3b12(0xe6)]["on"](_0x3e3b12(0x185), (_0x30f300) => {
      console[_0x3e3b12(0x236)]("" + _0x30f300);
    });

    store[_0x3e3b12(0x10a)](_0x3e3b12(0x237), _0x2d521f[_0x3e3b12(0x15c)]);
    minecraftLaunched = true;

    ipcRenderer["send"](_0x3e3b12(0xe3), {
      state: _0x3e3b12(0x1cf),
      details: _0x3e3b12(0x1d5),
      startTimestamp: startTimestamp,
      largeImageKey: _0x3e3b12(0x1d1),
      largeImageText: "NationsGlory",
      smallImageKey: _0x3e3b12(0x143),
      smallImageText: _0x5beaeb,
      instance: false,
      buttons: [{ label: _0x3e3b12(0x1b8), url: _0x3e3b12(0x21e) + _0x5beaeb }],
    });

    const _0x2a828b = document[_0x3e3b12(0x1df)](_0x3e3b12(0x194))[
      "contentDocument"
    ];
    if (_0x2a828b) {
      _0x2a828b[_0x3e3b12(0x1df)](_0x3e3b12(0x231))[_0x3e3b12(0x18b)][
        _0x3e3b12(0x17d)
      ] = "block";
      _0x2a828b["getElementById"](_0x3e3b12(0xef))[_0x3e3b12(0x18b)][
        _0x3e3b12(0x17e)
      ] = "#737373";
      _0x2a828b[_0x3e3b12(0x1df)](_0x3e3b12(0xef))["innerHTML"] =
        await translateAndSave(_0x3e3b12(0x19a), _0x4c8d27);
      hideProgressBar();
    }
  } catch (_0x3a0c41) {
    console[_0x3e3b12(0x137)]("Erreur\x20lancement\x20Minecraft:", _0x3a0c41);
    handleCrash(_0x3a0c41);
  }
}

// ============================================================
// Fonctions utilitaires
// ============================================================
async function deleteWithRetry(_0x4b5835, _0x276be8 = 0x5) {
  const _0x264947 = _0x9ab494,
    _0x727de8 = path[_0x264947(0x163)](_0x4b5835);
  if (_0x727de8 === _0x264947(0x1ba) || _0x727de8 === _0x264947(0x18d)) {
    console[_0x264947(0x236)](
      _0x264947(0xfb) + _0x727de8 + "\x20file:\x20" + _0x4b5835,
    );
    return;
  }
  while (_0x276be8 > 0x0) {
    try {
      if (fs[_0x264947(0x22e)](_0x4b5835)[_0x264947(0x22a)]()) {
        await fsp["rm"](_0x4b5835, { recursive: true });
        console["log"](_0x264947(0x1b1) + _0x4b5835);
      } else {
        await fsp["unlink"](_0x4b5835);
        console[_0x264947(0x236)](_0x264947(0x220) + _0x4b5835);
      }
      break;
    } catch (_0x517deb) {
      if (
        _0x517deb["code"] === _0x264947(0xf6) ||
        _0x517deb[_0x264947(0xd5)] === _0x264947(0x13a)
      ) {
        _0x276be8 -= 1;
        console["log"](
          _0x264947(0x214) +
            _0x4b5835 +
            _0x264947(0x142) +
            _0x276be8 +
            _0x264947(0x16d),
        );
        await delay(0x1f4);
      } else {
        console[_0x264947(0x137)](
          "Failed\x20to\x20delete\x20" + _0x4b5835 + ":",
          _0x517deb,
        );
        break;
      }
    }
  }
  if (_0x276be8 === 0x0) {
    console[_0x264947(0x137)](
      "Failed\x20to\x20delete\x20" + _0x4b5835 + _0x264947(0xf4),
    );
    alert(
      "Impossible\x20de\x20supprimer\x20le\x20fichier\x20" +
        _0x4b5835 +
        ",\x20lancement\x20impossible.",
    );
    process["exit"](0x1);
  }
}

function delay(_0x447b9d) {
  return new Promise((_0x10ee0d) => setTimeout(_0x10ee0d, _0x447b9d));
}

async function handleDownloads(_0x416f09, _0x2cfc42, _0x2458fe) {
  const _0x334b6f = _0x9ab494;
  try {
    console[_0x334b6f(0x236)](_0x334b6f(0x181));
    ensureDirectoryExists(_0x2cfc42[_0x334b6f(0x1e0)]);
    ensureDirectoryExists(_0x2cfc42[_0x334b6f(0x1c4)]);
    ensureDirectoryExists(_0x2cfc42[_0x334b6f(0xde)]);
    console[_0x334b6f(0x236)](_0x334b6f(0x1cb));
    console[_0x334b6f(0x236)](_0x334b6f(0x200));

    await Promise[_0x334b6f(0x193)]([
      downloadJSON(
        _0x416f09,
        _0x2cfc42[_0x334b6f(0x166)],
        _0x2cfc42[_0x334b6f(0x15b)],
      ),
      downloadJSON(
        _0x416f09,
        _0x2cfc42[_0x334b6f(0x205)],
        _0x2cfc42[_0x334b6f(0x13b)],
      ),
    ]);

    console["log"]("Manifestes\x20téléchargés.");

    const [_0x296ca0, _0xbd8218] = await Promise[_0x334b6f(0x193)]([
      fs["promises"]
        [_0x334b6f(0x18a)](_0x2cfc42[_0x334b6f(0x15b)], "utf-8")
        [_0x334b6f(0x13c)](JSON[_0x334b6f(0x16b)]),
      fs[_0x334b6f(0xdc)]
        [_0x334b6f(0x18a)](_0x2cfc42["BinariesLocalJSONPath"], _0x334b6f(0x1d3))
        [_0x334b6f(0x13c)](JSON[_0x334b6f(0x16b)]),
    ]);

    console["log"](_0x334b6f(0x162));

    const _0x5f0edd = await shouldRedownloadArchive(
        _0x2cfc42[_0x334b6f(0x16a)],
        _0x296ca0,
      ),
      _0x5b250e = await shouldRedownloadArchive(
        _0x2cfc42["BinariesLocalFilesBasePath"],
        _0xbd8218,
      );

    let _0x271e19 = [],
      _0x374830 = 0x0,
      _0x19e2dd = 0x0;

    if (_0x5f0edd) {
      console["log"](
        "Plus\x20de\x2030%\x20des\x20fichiers\x20modifiés,\x20re-téléchargement\x20archive.",
      );
      _0x271e19[_0x334b6f(0x189)](
        downloadAndExtractArchive(
          _0x416f09,
          _0x2cfc42[_0x334b6f(0xd6)],
          _0x2cfc42[_0x334b6f(0xcd)],
          _0x2cfc42[_0x334b6f(0x16a)],
        ),
      );
    } else {
      const _0x397194 = await getFilesToDownload(
        _0x2cfc42["localFilesBasePath"],
        _0x296ca0,
      );
      _0x374830 += _0x397194[_0x334b6f(0x12c)];
      console[_0x334b6f(0x236)](_0x334b6f(0xf1) + _0x397194[_0x334b6f(0x12c)]);
      _0x271e19[_0x334b6f(0x189)](
        downloadFilesConcurrently(
          _0x416f09,
          _0x397194,
          _0x2cfc42[_0x334b6f(0x16a)],
          _0x334b6f(0x1b5) + version + _0x334b6f(0x147),
          () => {
            _0x19e2dd++;
            updateProgress(
              _0x334b6f(0x231),
              Math["floor"]((_0x19e2dd / _0x374830) * 0x64),
            );
          },
        ),
      );
    }

    if (_0x5b250e) {
      console["log"](_0x334b6f(0x1b7));
      _0x271e19["push"](
        downloadAndExtractArchive(
          _0x416f09,
          _0x2cfc42[_0x334b6f(0x131)],
          _0x2cfc42[_0x334b6f(0x128)],
          _0x2cfc42[_0x334b6f(0x225)],
        ),
      );
    } else {
      const _0x70829e = await getFilesToDownload(
        _0x2cfc42["BinariesLocalFilesBasePath"],
        _0xbd8218,
      );
      _0x374830 += _0x70829e[_0x334b6f(0x12c)];
      console["log"](_0x334b6f(0x20e) + _0x70829e[_0x334b6f(0x12c)]);
      _0x271e19[_0x334b6f(0x189)](
        downloadFilesConcurrently(
          _0x416f09,
          _0x70829e,
          _0x2cfc42[_0x334b6f(0x225)],
          _0x2cfc42[_0x334b6f(0x1a0)],
          () => {
            _0x19e2dd++;
            updateProgress(
              _0x334b6f(0x231),
              Math[_0x334b6f(0x1dd)]((_0x19e2dd / _0x374830) * 0x64),
            );
          },
        ),
      );
    }

    await Promise[_0x334b6f(0x193)](_0x271e19);
    console[_0x334b6f(0x236)](_0x334b6f(0x1a4));

    await cleanupExtraFiles(
      _0x2cfc42[_0x334b6f(0x16a)],
      _0x296ca0,
      _0x2458fe,
      _0x2cfc42,
    );
    await cleanupExtraFiles(
      _0x2cfc42["BinariesLocalFilesBasePath"],
      _0xbd8218,
      [],
      _0x2cfc42,
    );
    console[_0x334b6f(0x236)]("Nettoyage\x20terminé.");
  } catch (_0x18bbbd) {
    console[_0x334b6f(0x137)](_0x334b6f(0x14d) + _0x18bbbd);
    throw _0x18bbbd;
  }
}

async function shouldRedownloadArchive(_0x30bbdd, _0xdbd400) {
  const _0xa4bd06 = _0x9ab494;
  let _0x39bae9 = 0x0;
  for (const [_0x1cace3, _0x38cf42] of Object[_0xa4bd06(0x1b4)](_0xdbd400)) {
    const _0x11f53f = path[_0xa4bd06(0x132)](_0x30bbdd, _0x1cace3);
    if (!fs["existsSync"](_0x11f53f)) {
      _0x39bae9++;
    } else {
      const _0x429688 = await calculateLocalFileHash(_0x11f53f);
      if (_0x429688 !== _0x38cf42) _0x39bae9++;
    }
  }
  const _0x123da5 = Object[_0xa4bd06(0x1f1)](_0xdbd400)["length"];
  return (_0x39bae9 / _0x123da5) * 0x64 > 0x1e;
}

async function getFilesToDownload(_0x305f9b, _0x11a79b) {
  const _0x496196 = _0x9ab494;
  let _0x3514ff = [];
  const _0x1b6898 = os["platform"]();
  for (const [_0x305b6a, _0x985a32] of Object[_0x496196(0x1b4)](_0x11a79b)) {
    const _0x4d35fe = path["join"](_0x305f9b, _0x305b6a),
      _0x13a6e4 = path[_0x496196(0x22b)](
        path[_0x496196(0x132)](_0x305f9b, _0x496196(0x1f2)),
        _0x4d35fe,
      ),
      _0x4a09ff = _0x13a6e4[_0x496196(0x20a)](path["sep"]),
      _0x59f10e = _0x305b6a["includes"](_0x496196(0x1f2)),
      _0x30f9de = getPlatformFolderName(_0x1b6898),
      _0x53fa6e =
        !_0x59f10e ||
        _0x4a09ff[_0x496196(0x12c)] === 0x1 ||
        _0x4a09ff[0x0] === _0x30f9de;
    if (_0x53fa6e) {
      const _0x104f36 = { path: _0x305b6a, hash: _0x985a32 };
      if (!fs["existsSync"](_0x4d35fe)) {
        _0x3514ff[_0x496196(0x189)](_0x104f36);
      } else {
        const _0x15e023 = await calculateLocalFileHash(_0x4d35fe);
        if (_0x15e023 !== _0x985a32) _0x3514ff[_0x496196(0x189)](_0x104f36);
      }
    }
  }
  return _0x3514ff;
}

function getPlatformFolderName(_0x2c02f6) {
  const _0x21fe0e = _0x9ab494;
  if (_0x2c02f6 === _0x21fe0e(0x14c)) return _0x21fe0e(0x159);
  return _0x2c02f6 === _0x21fe0e(0xdd) ? _0x21fe0e(0x17b) : _0x21fe0e(0x1a2);
}

async function downloadFilesConcurrently(
  _0x1251a7,
  _0x2c2af7,
  _0x163bee,
  _0x193f74,
  _0xb02626,
) {
  const _0x49a028 = _0x9ab494;
  try {
    console[_0x49a028(0x236)](
      "Téléchargement\x20concurrent\x20lancé\x20avec\x20" +
        _0x2c2af7[_0x49a028(0x12c)] +
        _0x49a028(0x1ef),
    );
    const _0x3dc28f = _0x2c2af7[_0x49a028(0x177)]((_0x1508d3) =>
      limit(() =>
        downloadFileIfNeeded(_0x1251a7, _0x1508d3, _0x163bee, _0x193f74)[
          _0x49a028(0x13c)
        ](() => {
          if (_0xb02626) _0xb02626();
        }),
      ),
    );
    await Promise["all"](_0x3dc28f);
    console[_0x49a028(0x236)](_0x49a028(0xe2));
  } catch (_0x442a36) {
    console[_0x49a028(0x137)](_0x49a028(0x172), _0x442a36);
    throw _0x442a36;
  }
}

async function cleanupExtraFiles(_0x81e2f8, _0x347ac3, _0x119268, _0x4f3ef9) {
  const _0x25bfb6 = _0x9ab494;
  try {
    const _0x1ddfb8 = getAllFiles(_0x81e2f8),
      _0x2241b0 = Object[_0x25bfb6(0x1f1)](_0x347ac3)[_0x25bfb6(0x177)](
        (_0xd65448) => path[_0x25bfb6(0x132)](_0x81e2f8, _0xd65448),
      ),
      _0x1508c3 = _0x1ddfb8[_0x25bfb6(0x239)](
        (_0x141ca9) => !_0x2241b0[_0x25bfb6(0x14e)](_0x141ca9),
      ),
      _0x40122d = new Map(
        _0x119268["map"]((_0x3879d5) => [
          _0x3879d5[_0x25bfb6(0x1a8)],
          _0x3879d5,
        ]),
      ),
      _0x2229c5 = [
        _0x25bfb6(0x155),
        "shaderpacks",
        _0x25bfb6(0xf8),
        "config",
        _0x25bfb6(0x13f),
        _0x25bfb6(0x19f),
        _0x25bfb6(0x240),
      ];

    await Promise["all"](
      _0x1508c3[_0x25bfb6(0x177)](async (_0x483e2f) => {
        const _0x158e17 = _0x25bfb6,
          _0x522ce5 = path[_0x158e17(0x22b)](_0x81e2f8, _0x483e2f),
          _0x3f1cef = _0x2229c5[_0x158e17(0x235)]((_0x5e2fe2) =>
            _0x522ce5[_0x158e17(0x243)](_0x5e2fe2),
          );
        if (_0x3f1cef) {
          console[_0x158e17(0x236)](_0x158e17(0x221) + _0x483e2f);
          return;
        }
        if (
          _0x483e2f[_0x158e17(0x14e)](
            path["sep"] + _0x158e17(0xd8) + path[_0x158e17(0x1a6)],
          )
        ) {
          try {
            const _0xc012a9 = await calculateLocalFileHash(_0x483e2f),
              _0x33b471 = _0x40122d[_0x158e17(0x20d)](_0xc012a9);
            if (_0x33b471) {
              console[_0x158e17(0x236)](_0x158e17(0x17a) + _0x483e2f);
            } else {
              console[_0x158e17(0x236)](_0x158e17(0x116) + _0x483e2f);
              await deleteWithRetry(_0x483e2f);
            }
          } catch (_0x171643) {
            console["error"](_0x158e17(0x19c) + _0x483e2f, _0x171643);
          }
        }
      }),
    );
  } catch (_0x496660) {
    console[_0x25bfb6(0x137)](
      _0x25bfb6(0x1db) + _0x81e2f8 + "\x20:",
      _0x496660,
    );
    throw _0x496660;
  }
}

function formatBytes(_0x4e3fb0, _0x498947 = 0x2) {
  const _0x299400 = _0x9ab494;
  if (!+_0x4e3fb0) return "0\x20Bytes";
  const _0x2f7576 = 0x400,
    _0x27a6b8 = _0x498947 < 0x0 ? 0x0 : _0x498947,
    _0x539114 = [
      _0x299400(0x178),
      "Ko",
      "Mo",
      "Go",
      "To",
      "Po",
      "Eo",
      "Zo",
      "Yo",
    ],
    _0x554af7 = Math["floor"](
      Math[_0x299400(0x236)](_0x4e3fb0) / Math[_0x299400(0x236)](_0x2f7576),
    );
  return (
    parseFloat(
      (_0x4e3fb0 / Math["pow"](_0x2f7576, _0x554af7))["toFixed"](_0x27a6b8),
    ) +
    "\x20" +
    _0x539114[_0x554af7]
  );
}

function resetProgressCounters() {
  const _0x4e7c61 = _0x9ab494;
  totalFiles = 0x0;
  processedFiles = 0x0;
  updateProgress(_0x4e7c61(0x231), 0x0);
}

function hideProgressBar() {
  const _0x307622 = _0x9ab494,
    _0x5c8d0c = document[_0x307622(0x1df)](_0x307622(0x194))[_0x307622(0x198)];
  if (_0x5c8d0c) {
    const _0x29b4dd = _0x5c8d0c["getElementById"](_0x307622(0x231));
    if (_0x29b4dd) {
      _0x29b4dd[_0x307622(0x18b)]["display"] = _0x307622(0x12f);
    } else {
      console[_0x307622(0x137)](_0x307622(0x222));
    }
  } else {
    console[_0x307622(0x137)](_0x307622(0x11c));
  }
}

function updateProgress(_0x115d0c, _0x47df39) {
  const _0x39cf5e = _0x9ab494,
    _0x39ecbd = document[_0x39cf5e(0x1df)](_0x39cf5e(0x194))[_0x39cf5e(0x198)];
  if (_0x39ecbd) {
    const _0x1c38e4 = _0x39ecbd[_0x39cf5e(0x1df)](_0x115d0c),
      _0x430898 = _0x39ecbd[_0x39cf5e(0x1df)](_0x39cf5e(0x1de)),
      _0x4aada6 = _0x39ecbd[_0x39cf5e(0x1df)](_0x39cf5e(0x223));
    if (_0x1c38e4 && _0x430898 && _0x4aada6) {
      _0x1c38e4[_0x39cf5e(0x18b)][_0x39cf5e(0x17d)] = _0x39cf5e(0x1be);
      _0x430898[_0x39cf5e(0x229)] = _0x47df39[_0x39cf5e(0x1b6)](0x2) + "%";
      _0x4aada6[_0x39cf5e(0x18b)][_0x39cf5e(0x109)] =
        _0x47df39["toFixed"](0x2) + "%";
    } else {
      console[_0x39cf5e(0x137)](_0x39cf5e(0x222));
    }
  } else {
    console[_0x39cf5e(0x137)]("frameContent\x20non\x20trouvé.");
  }
}

function checkPermissions(_0x184a2b) {
  const _0x21f048 = _0x9ab494;
  try {
    fs["accessSync"](
      _0x184a2b,
      fs[_0x21f048(0x1b9)][_0x21f048(0x204)] |
        fs[_0x21f048(0x1b9)][_0x21f048(0xe5)],
    );
    console[_0x21f048(0x236)](_0x21f048(0x206) + _0x184a2b);
  } catch (_0xbb3641) {
    console[_0x21f048(0x137)](_0x21f048(0xea) + _0x184a2b, _0xbb3641);
    throw _0xbb3641;
  }
}

async function downloadFileIfNeeded(
  _0x3f36d3,
  _0x3453ba,
  _0x2a73a1,
  _0xc4fe8b,
) {
  const _0x1f2dea = _0x9ab494;
  try {
    const _0x17be00 = path[_0x1f2dea(0x132)](
        _0x2a73a1,
        _0x3453ba[_0x1f2dea(0x146)],
      ),
      _0x33bced = path[_0x1f2dea(0x1ee)][_0x1f2dea(0x132)](
        _0xc4fe8b,
        _0x3453ba["path"],
      );
    let _0x2fd166 = false,
      _0xea79f3 = null;
    if (!fs[_0x1f2dea(0x1f3)](_0x17be00)) {
      _0x2fd166 = true;
      console[_0x1f2dea(0x236)](
        _0x1f2dea(0x154) + _0x17be00 + _0x1f2dea(0x227),
      );
    } else {
      const _0x553607 = _0x17be00["includes"](
        path[_0x1f2dea(0x132)](_0x2a73a1, _0x1f2dea(0x1fb)),
      );
      if (!_0x553607) {
        const _0x428fea = await calculateLocalFileHash(_0x17be00);
        if (_0x428fea !== _0x3453ba[_0x1f2dea(0x1a8)]) {
          _0x2fd166 = true;
        }
      }
    }
    if (_0x2fd166) {
      const _0x4e952a = path[_0x1f2dea(0x12a)](_0x17be00);
      if (!fs[_0x1f2dea(0x1f3)](_0x4e952a)) {
        fs[_0x1f2dea(0x1eb)](_0x4e952a, { recursive: true });
        console[_0x1f2dea(0x236)](_0x1f2dea(0x1bd) + _0x4e952a);
      }
      await downloadFile(_0x3f36d3, _0x33bced, _0x17be00, _0xea79f3);
    }
    processedFiles++;
    updateProgress(
      _0x1f2dea(0x231),
      Math[_0x1f2dea(0x1e9)]((processedFiles / totalFiles) * 0x64),
    );
  } catch (_0x584bca) {
    console["error"](
      _0x1f2dea(0x1cc) + _0x3453ba[_0x1f2dea(0x146)] + "\x20:",
      _0x584bca,
    );
    throw _0x584bca;
  }
}

function ensureDirectoryExists(_0x1d822d) {
  const _0x327e13 = _0x9ab494;
  if (!fs[_0x327e13(0x1f3)](_0x1d822d)) {
    fs[_0x327e13(0x1eb)](_0x1d822d, { recursive: true });
    console["log"]("Dossier\x20créé\x20:\x20" + _0x1d822d);
  } else {
    console[_0x327e13(0x236)](_0x327e13(0xec) + _0x1d822d);
  }
}

function getAllFiles(_0x3b780c, _0x5d470c) {
  const _0x252506 = _0x9ab494;
  if (!fs[_0x252506(0x1f3)](_0x3b780c)) {
    console[_0x252506(0x137)](_0x252506(0x1f5) + _0x3b780c);
    throw new Error(_0x252506(0x1f5) + _0x3b780c);
  }
  const _0x28a9ea = fs[_0x252506(0x12d)](_0x3b780c);
  _0x5d470c = _0x5d470c || [];
  _0x28a9ea[_0x252506(0x105)](function (_0x7ac0f6) {
    const _0x460c93 = _0x252506,
      _0x20da15 = path["join"](_0x3b780c, _0x7ac0f6);
    if (fs[_0x460c93(0x22e)](_0x20da15)[_0x460c93(0x22a)]()) {
      _0x5d470c = getAllFiles(_0x20da15, _0x5d470c);
    } else {
      _0x5d470c[_0x460c93(0x189)](_0x20da15);
    }
  });
  return _0x5d470c;
}

async function calculateLocalFileHash(_0x448e84) {
  return new Promise((_0x241c74, _0x4e48c8) => {
    const _0x107e29 = _0x482c,
      _0x1a0f25 = crypto[_0x107e29(0x226)](_0x107e29(0x1a3)),
      _0x36184e = fs[_0x107e29(0x127)](_0x448e84);
    _0x36184e["on"](_0x107e29(0x137), _0x4e48c8);
    _0x36184e["on"](_0x107e29(0x185), (_0x1b2536) =>
      _0x1a0f25[_0x107e29(0x1a7)](_0x1b2536),
    );
    _0x36184e["on"](_0x107e29(0x1a5), () =>
      _0x241c74(_0x1a0f25["digest"](_0x107e29(0x202))),
    );
  });
}

async function downloadJSON(_0xe60d25, _0x2cdb04, _0x4cc175) {
  return new Promise((_0x2c63ee, _0x11ce7b) => {
    const _0x32e68c = _0x482c;
    _0xe60d25[_0x32e68c(0xe8)](
      _0x2cdb04,
      _0x4cc175,
      { concurrency: 0x40, chunkSize: 0x8000, step: function () {} },
      (_0x54ed10) => {
        if (_0x54ed10) _0x11ce7b(_0x54ed10);
        else _0x2c63ee();
      },
    );
  });
}

async function downloadAndExtractArchive(
  _0x22b698,
  _0x36f780,
  _0x56305f,
  _0x82899f,
) {
  return new Promise((_0x31fd64, _0x1e5ecf) => {
    const _0x4a2289 = _0x482c;
    _0x22b698[_0x4a2289(0x134)](_0x36f780, async (_0x1d360d, _0x536442) => {
      const _0x11176e = _0x4a2289;
      if (_0x1d360d) {
        console["error"]("Archive\x20corrompue\x20:", _0x1d360d);
        _0x1e5ecf(_0x1d360d);
        return;
      }
      const _0x446c33 = _0x536442["size"];
      let _0x33ce31 = 0x0,
        _0x58555c = _0x536442["mode"];
      console["log"](
        _0x11176e(0x1bf) +
          _0x36f780 +
          _0x11176e(0x129) +
          formatBytes(_0x446c33) +
          ")",
      );
      _0x22b698[_0x11176e(0xe8)](_0x36f780, _0x56305f, {}, (_0xecd7b8) => {
        const _0x40bc0b = _0x11176e;
        if (_0xecd7b8) {
          console[_0x40bc0b(0x137)](
            "Erreur\x20téléchargement\x20archive:",
            _0xecd7b8,
          );
          _0x1e5ecf(_0xecd7b8);
          return;
        }
        try {
          const _0x739fb = new AdmZip(_0x56305f);
          _0x739fb[_0x40bc0b(0x1d7)](_0x82899f, true);
          console[_0x40bc0b(0x236)](_0x40bc0b(0x18c));
          try {
            fs[_0x40bc0b(0x117)](_0x56305f, _0x58555c);
          } catch (_0x99fa79) {
            console[_0x40bc0b(0x137)](
              _0x40bc0b(0x20f) + _0x56305f + ":",
              _0x99fa79,
            );
          }
          fs[_0x40bc0b(0x111)](_0x56305f, (_0x51d775) => {
            if (_0x51d775) {
              console[_0x40bc0b(0x137)](_0x40bc0b(0xd1) + _0x51d775);
              _0x1e5ecf(_0x51d775);
            } else {
              console[_0x40bc0b(0x236)](_0x40bc0b(0x173));
              _0x31fd64();
            }
          });
        } catch (_0x6dcfb4) {
          console[_0x40bc0b(0x137)](_0x40bc0b(0x1da), _0x6dcfb4);
          _0x1e5ecf(_0x6dcfb4);
        }
      });
      const _0x986ced = setInterval(() => {
        fs[_0x11176e(0x134)](_0x56305f, (_0x4407eb, _0x128fb2) => {
          if (_0x4407eb) {
            clearInterval(_0x986ced);
            return;
          }
          const _0x1370ac = _0x128fb2[_0x11176e(0xf0)],
            _0x2c18d1 = ((_0x1370ac / _0x446c33) * 0x64)[_0x11176e(0x1b6)](0x2);
          if (_0x2c18d1 - _0x33ce31 >= 0x1) {
            _0x33ce31 = _0x2c18d1;
            updateProgress(_0x11176e(0x231), parseFloat(_0x2c18d1));
          }
        });
      }, 0x3e8);
    });
  });
}

async function downloadFile(_0x46a39c, _0x14803f, _0x14d1f7, _0x43e5a2) {
  return new Promise((_0x303421, _0x509a3d) => {
    const _0x4420e0 = _0x482c;
    _0x46a39c[_0x4420e0(0xe8)](_0x14803f, _0x14d1f7, (_0x1d57cf) => {
      if (_0x1d57cf) {
        _0x509a3d(_0x1d57cf);
      } else {
        if (_0x43e5a2 !== null) {
          try {
            fs["chmodSync"](_0x14d1f7, _0x43e5a2);
          } catch (_0x2be974) {
            console[_0x4420e0(0x137)](
              _0x4420e0(0x130) + _0x14d1f7 + ":",
              _0x2be974,
            );
          }
        }
        _0x303421();
      }
    });
  });
}

// ============================================================
// startDownloadAndLaunch + createHttpClient (HTTP, pas SFTP)
// ============================================================
async function startDownloadAndLaunch(
  version,
  authtoken,
  osArchInfo,
  lang,
  username,
  cuidUser,
  mac,
  hddidUser,
) {
  console.log("[HTTP] Démarrage du téléchargement via HTTP...");
  const httpClient = createHttpClient(authtoken, version);
  try {
    console.log("STEP 1 OK");
    const paths = await getPaths(version, osArchInfo);
    console.log("STEP 2 OK", paths);
    const allowedMods = await fetchAllowedMod(
      `https://refuge-api.onrender.com/launcher/getMoreMods?token=${authtoken}&cuid=${cuidUser}&lang=${lang}`,
    );
    console.log("STEP 3 OK", allowedMods);
    await handleDownloads(httpClient, paths, allowedMods);
    console.log("STEP 4 OK DOWNLOAD DONE");
    await copyFilesIfApplicable(version);
    console.log("STEP 5 OK COPY DONE");
    fixPermissionsRecursively(paths.binariesPath, 0o755);
    fixPermissionsRecursively(paths.folder, 0o755);
    await launchMinecraft(
      paths,
      version,
      osArchInfo,
      lang,
      username,
      authtoken,
      cuidUser,
      mac,
      hddidUser,
    );
    console.log("STEP 6 OK LAUNCH DONE");
  } catch (err) {
    console.error("[HTTP] Erreur:", err);
    minecraftLaunched = false;
  }
}

function createHttpClient(authtoken, version) {
  const API_BASE = "https://refuge-api.onrender.com";
  return {
    fastGet: function (remotePath, localPath, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      const filePath = remotePath
        .replace(`/versions/${version}/`, "")
        .replace(`/binaries/`, "binaries/");
      const url = `${API_BASE}/versions/${version}/files/${filePath}?token=${authtoken}`;
      console.log(`[HTTP] Téléchargement: ${filePath}`);
      axios({
        method: "GET",
        url: url,
        responseType: "stream",
        maxRedirects: 5,
      })
        .then(function (response) {
          const dir = path.dirname(localPath);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          const writer = fs.createWriteStream(localPath);
          response.data.pipe(writer);
          writer.on("finish", function () {
            callback(null);
          });
          writer.on("error", function (err) {
            callback(err);
          });
        })
        .catch(function (err) {
          console.error(
            `[HTTP] Erreur téléchargement ${remotePath}:`,
            err.message,
          );
          callback(err);
        });
    },
    stat: function (remotePath, callback) {
      const filePath = remotePath
        .replace(`/versions/${version}/`, "")
        .replace(`/binaries/`, "binaries/");
      const url = `${API_BASE}/versions/${version}/files/${filePath}?token=${authtoken}`;
      axios
        .head(url)
        .then(function (response) {
          const size = parseInt(response.headers["content-length"] || "0");
          callback(null, { size: size, mode: 0o644 });
        })
        .catch(function (err) {
          callback(err);
        });
    },
  };
}

// ============================================================
// Avatar sidebar
// ============================================================
async function updateSidebarAvatar() {
  try {
    const response = await axios.post(
      "https://refuge-api.onrender.com/launcher/skins",
      {
        action: "getlist",
        accessToken: authtoken,
        cuid: cuidUser,
        username: username,
      },
    );
    const skins = response.data;
    if (!skins || skins.length === 0) return;
    const selected = skins.find((s) => s.selected == 1);
    if (!selected || !selected.skin_file) return;
    const skinResponse = await axios.get(selected.skin_file, {
      responseType: "arraybuffer",
    });
    const skinBlob = new Blob([skinResponse.data], { type: "image/png" });
    const skinBlobUrl = URL.createObjectURL(skinBlob);
    await new Promise((resolve) => {
      const tmpImg = new Image();
      tmpImg.onload = function () {
        const sc = document.createElement("canvas");
        sc.width = tmpImg.width;
        sc.height = tmpImg.height;
        const sctx = sc.getContext("2d");
        sctx.drawImage(tmpImg, 0, 0);
        sctx.clearRect(40, 8, 8, 8);
        sc.toBlob(async (cleanBlob) => {
          const arrBuf = await cleanBlob.arrayBuffer();
          const base64 = Buffer.from(arrBuf)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
          const renderUrl = `https://visage.surgeplay.com/head/128/${base64}?wide&yaw=-30`;
          const avatarImg = document.querySelector("#avatar img");
          if (avatarImg) avatarImg.src = renderUrl;
          resolve();
        }, "image/png");
      };
      tmpImg.src = skinBlobUrl;
    });
  } catch (err) {
    try {
      const response = await axios.post(
        "https://refuge-api.onrender.com/launcher/skins",
        {
          action: "getlist",
          accessToken: authtoken,
          cuid: cuidUser,
          username: username,
        },
      );
      const skins = response.data;
      if (!skins || skins.length === 0) return;
      const selected = skins.find((s) => s.selected == 1);
      if (!selected || !selected.skin_file) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 8, 8, 8, 8, 0, 0, 32, 32);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const avatarImg = document.querySelector("#avatar img");
          if (avatarImg) avatarImg.src = url;
        });
      };
      img.src = selected.skin_file;
    } catch (e) {
      console.error("Erreur updateSidebarAvatar:", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateSidebarAvatar();
});

window.addEventListener("message", async function (event) {
  if (!event.data || event.data.action !== "refreshAvatar") return;

  const avatarImg = document.querySelector("#avatar img");
  if (!avatarImg) return;

  const skinFile = event.data.skinFile;

  // ✅ Si rien → fallback API
  if (!skinFile) {
    await updateSidebarAvatar();
    return;
  }

  try {
    // ✅ DATA URL
    if (skinFile.startsWith("data:image")) {
      const base64Raw = skinFile.split(",")[1];
      if (!base64Raw) throw new Error("Base64 invalide");

      const base64Safe = base64Raw
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      avatarImg.src = `https://visage.surgeplay.com/head/128/${base64Safe}?wide&yaw=-30`;
    }

    // ✅ URL classique
    else if (skinFile.startsWith("http")) {
      avatarImg.src = skinFile;
    }

    // ❌ autre
    else {
      throw new Error("Format skinFile inconnu");
    }
  } catch (err) {
    console.error("Erreur refresh avatar:", err);
    await updateSidebarAvatar();
  }
});

