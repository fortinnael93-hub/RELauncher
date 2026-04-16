const _0x24d916 = _0x23dd;
function _0x23dd(_0x25e875, _0x2886ab) {
  const _0x56ce19 = _0x56ce();
  return (
    (_0x23dd = function (_0x23dd91, _0x24ee5c) {
      _0x23dd91 = _0x23dd91 - 0x169;
      let _0x18ff73 = _0x56ce19[_0x23dd91];
      return _0x18ff73;
    }),
    _0x23dd(_0x25e875, _0x2886ab)
  );
}
function _0x56ce() {
  const _0x354888 = [
    "filter",
    "onclick",
    "AppData",
    "result",
    "deleteFileBtn",
    "stats",
    "567464UUAUFV",
    "value",
    "imageInfo",
    "Error\x20deleting\x20file:",
    "APPDATA",
    "imageModal",
    "readAsDataURL",
    "Roaming",
    "div",
    "F_OK",
    "basename",
    "style",
    "sort",
    "https://refuge-api.onrender.com/launcher/uploadScreen?token=",
    "2540mhaFDP",
    "normalize",
    "newNameInput",
    "8EtrATz",
    "&lang=",
    "getElementById",
    "send",
    "unlink",
    "516upBcpR",
    "fullImage",
    "getElementsByClassName",
    ".jpg",
    "win32",
    "URL",
    "15wNoxHj",
    ".NationsGlory",
    "textContent",
    "createElement",
    "platform",
    "map",
    ".png",
    "close",
    "fr-FR",
    "display",
    "querySelector",
    "none",
    "1463IUcsDT",
    "toLocaleDateString",
    ".close",
    "Library",
    "src",
    "alt",
    "392340pLYOvI",
    ".config",
    "9081XpagYP",
    "target",
    "Error\x20renaming\x20file:",
    "7166610ixjiwW",
    "innerHTML",
    "dirname",
    "appendChild",
    "darwin",
    "location",
    "147800wUdXXK",
    "catch",
    "mtime",
    "img",
    "constants",
    "toLocaleTimeString",
    "temp",
    "join",
    "access",
    "screenshot",
    "\x20-\x20",
    "toUpperCase",
    "block",
    "data",
    "show-dialog",
    "confirmRename",
    "error",
    "readdir",
    "endsWith",
    "editNameBtn",
    "stat",
    "homedir",
    "push",
    "sep",
    "73055OGOAfD",
  ];
  _0x56ce = function () {
    return _0x354888;
  };
  return _0x56ce();
}
(function (_0x2f8524, _0x5a34d6) {
  const _0xfce6a3 = _0x23dd,
    _0x34ff83 = _0x2f8524();
  while (!![]) {
    try {
      const _0x4609d3 =
        -parseInt(_0xfce6a3(0x1a2)) / 0x1 +
        (-parseInt(_0xfce6a3(0x1ad)) / 0x2) *
          (parseInt(_0xfce6a3(0x190)) / 0x3) +
        (parseInt(_0xfce6a3(0x185)) / 0x4) *
          (-parseInt(_0xfce6a3(0x16d)) / 0x5) +
        (-parseInt(_0xfce6a3(0x18a)) / 0x6) *
          (-parseInt(_0xfce6a3(0x19c)) / 0x7) +
        parseInt(_0xfce6a3(0x174)) / 0x8 +
        (-parseInt(_0xfce6a3(0x1a4)) / 0x9) *
          (-parseInt(_0xfce6a3(0x182)) / 0xa) +
        parseInt(_0xfce6a3(0x1a7)) / 0xb;
      if (_0x4609d3 === _0x5a34d6) break;
      else _0x34ff83["push"](_0x34ff83["shift"]());
    } catch (_0x3c8fc0) {
      _0x34ff83["push"](_0x34ff83["shift"]());
    }
  }
})(_0x56ce, 0x32349);
function getBaseDirectory() {
  const _0x11a295 = _0x23dd;
  let _0x4d23f1;
  switch (os[_0x11a295(0x194)]()) {
    case _0x11a295(0x18e):
      let _0x215bf3 =
        process["env"][_0x11a295(0x178)] ||
        path["join"](
          os[_0x11a295(0x16a)](),
          _0x11a295(0x170),
          _0x11a295(0x17b),
        );
      !_0x215bf3["endsWith"](path[_0x11a295(0x16c)]) &&
        (_0x215bf3 += path[_0x11a295(0x16c)]);
      _0x4d23f1 = path["join"](_0x215bf3, _0x11a295(0x191));
      break;
    case _0x11a295(0x1ab):
      _0x4d23f1 = path["join"](
        os[_0x11a295(0x16a)](),
        _0x11a295(0x19f),
        "Application\x20Support",
        _0x11a295(0x191),
      );
      break;
    default:
      _0x4d23f1 = path[_0x11a295(0x1b4)](
        os[_0x11a295(0x16a)](),
        _0x11a295(0x1a3),
        _0x11a295(0x191),
      );
      break;
  }
  return path[_0x11a295(0x183)](_0x4d23f1);
}
async function getAvailableVersions() {
  const _0x450d82 = _0x23dd,
    _0x1e88ff = await fsp["readdir"](
      path[_0x450d82(0x183)](path["join"](getBaseDirectory(), "versions")),
    );
  return _0x1e88ff[_0x450d82(0x16e)](
    (_0x40223b) => _0x40223b !== _0x450d82(0x1b3),
  );
}
function getFolder(_0x3dee7c) {
  const _0xa38e1e = _0x23dd;
  return path[_0xa38e1e(0x183)](
    path[_0xa38e1e(0x1b4)](
      getBaseDirectory(),
      "versions",
      _0x3dee7c,
      "screenshots",
    ),
  );
}
async function fileExists(_0x2bc76c) {
  const _0x5b56a8 = _0x23dd;
  try {
    return (
      await fsp[_0x5b56a8(0x1b5)](
        _0x2bc76c,
        fsp[_0x5b56a8(0x1b1)][_0x5b56a8(0x17d)],
      ),
      !![]
    );
  } catch {
    return ![];
  }
}
async function iterateThroughFolder(_0x1d0c4a) {
  const _0x242215 = _0x23dd,
    _0x39de7d = await fsp["readdir"](_0x1d0c4a);
  let _0x53ce96 = [];
  for (let _0x2a0b0a of _0x39de7d) {
    _0x53ce96[_0x242215(0x16b)](path[_0x242215(0x1b4)](_0x1d0c4a, _0x2a0b0a));
  }
  return _0x53ce96;
}
async function displayScreenshots() {
  const _0x46951c = _0x23dd,
    _0x424c38 = document["getElementById"]("screenshots");
  _0x424c38[_0x46951c(0x1a8)] = "";
  const _0x2d6292 = getBaseDirectory(),
    _0x2cfc02 = await getAvailableVersions();
  for (let _0x3c244a of _0x2cfc02) {
    const _0x565752 = getFolder(_0x3c244a);
    if (!(await fileExists(_0x565752))) continue;
    const _0xa0e7df = await fsp[_0x46951c(0x1be)](_0x565752),
      _0x5cf82b = await Promise["all"](
        _0xa0e7df[_0x46951c(0x195)](async (_0x9d5657) => {
          const _0x3bc432 = _0x46951c;
          if (
            _0x9d5657[_0x3bc432(0x1bf)](_0x3bc432(0x196)) ||
            _0x9d5657[_0x3bc432(0x1bf)](_0x3bc432(0x18d))
          ) {
            const _0x2e1741 = path[_0x3bc432(0x1b4)](_0x565752, _0x9d5657),
              _0x48a258 = await fsp[_0x3bc432(0x169)](_0x2e1741);
            return { file: _0x9d5657, stats: _0x48a258, pathToFile: _0x2e1741 };
          } else return null;
        }),
      ),
      _0x1ee174 = _0x5cf82b[_0x46951c(0x16e)]((_0x2b1cce) => _0x2b1cce)[
        _0x46951c(0x180)
      ](
        (_0x5930d4, _0x2f0ada) =>
          _0x2f0ada[_0x46951c(0x173)][_0x46951c(0x1af)] -
          _0x5930d4[_0x46951c(0x173)][_0x46951c(0x1af)],
      );
    for (let {
      file: _0x5991c1,
      stats: _0x1f8732,
      pathToFile: _0x407416,
    } of _0x1ee174) {
      const _0x33aad8 = _0x1f8732[_0x46951c(0x1af)][_0x46951c(0x19d)](
          _0x46951c(0x198),
        ),
        _0x3482cf = _0x1f8732[_0x46951c(0x1af)][_0x46951c(0x1b2)](
          _0x46951c(0x198),
        ),
        _0x5a5c14 = document[_0x46951c(0x193)](_0x46951c(0x17c));
      _0x5a5c14["className"] = _0x46951c(0x1b6);
      const _0x167ce4 = document[_0x46951c(0x193)](_0x46951c(0x1b0));
      ((_0x167ce4["src"] = _0x407416),
        (_0x167ce4[_0x46951c(0x1a1)] = _0x5991c1),
        (_0x167ce4[_0x46951c(0x16f)] = function () {
          const _0x35d3a8 = _0x46951c,
            _0x303465 = document["getElementById"](_0x35d3a8(0x179)),
            _0x2f66d3 = document[_0x35d3a8(0x187)](_0x35d3a8(0x18b)),
            _0x5787da = document["getElementById"](_0x35d3a8(0x176));
          _0x2f66d3[_0x35d3a8(0x1a0)] = this["src"];
          const _0x59b11b = _0x5991c1["replace"](/\.[^/.]+$/, "");
          ((_0x5787da["textContent"] =
            "[" +
            _0x3c244a[_0x35d3a8(0x1b8)]() +
            "]\x20" +
            _0x59b11b +
            "\x20-\x20" +
            _0x33aad8 +
            "\x20" +
            _0x3482cf),
            (_0x303465[_0x35d3a8(0x17f)][_0x35d3a8(0x199)] = _0x35d3a8(0x1b9)),
            (_0x303465[_0x35d3a8(0x16f)] = function (_0x49d97c) {
              const _0x4fbd23 = _0x35d3a8;
              _0x49d97c[_0x4fbd23(0x1a5)] === _0x303465 &&
                (_0x303465[_0x4fbd23(0x17f)][_0x4fbd23(0x199)] =
                  _0x4fbd23(0x19b));
            }),
            (document[_0x35d3a8(0x187)](_0x35d3a8(0x1c0))[_0x35d3a8(0x16f)] =
              function () {
                const _0x675a7c = _0x35d3a8,
                  _0x2e0c56 = document[_0x675a7c(0x187)]("renameModal"),
                  _0x498d15 = document[_0x675a7c(0x187)](_0x675a7c(0x184)),
                  _0x47db87 = document[_0x675a7c(0x187)](_0x675a7c(0x1bc)),
                  _0x2d737e = path["extname"](_0x5991c1),
                  _0x3616e1 = path[_0x675a7c(0x17e)](_0x5991c1, _0x2d737e);
                ((_0x498d15[_0x675a7c(0x175)] = _0x3616e1),
                  (_0x2e0c56["style"]["display"] = _0x675a7c(0x1b9)),
                  (_0x47db87[_0x675a7c(0x16f)] = async function () {
                    const _0x20cda5 = _0x675a7c,
                      _0x290134 = _0x498d15["value"] + _0x2d737e;
                    if (_0x290134 && _0x290134 !== _0x5991c1) {
                      const _0x5591e9 = path[_0x20cda5(0x1b4)](
                        path[_0x20cda5(0x1a9)](_0x407416),
                        _0x290134,
                      );
                      try {
                        (await fsp["rename"](_0x407416, _0x5591e9),
                          (_0x167ce4[_0x20cda5(0x1a0)] = _0x5591e9),
                          (_0x167ce4[_0x20cda5(0x1a1)] = _0x290134),
                          (_0x5787da[_0x20cda5(0x192)] =
                            "[" +
                            _0x3c244a[_0x20cda5(0x1b8)]() +
                            "]\x20" +
                            _0x498d15[_0x20cda5(0x175)] +
                            _0x20cda5(0x1b7) +
                            _0x33aad8 +
                            "\x20" +
                            _0x3482cf),
                          (_0x2e0c56["style"][_0x20cda5(0x199)] =
                            _0x20cda5(0x19b)));
                      } catch (_0x162259) {
                        console[_0x20cda5(0x1bd)](_0x20cda5(0x1a6), _0x162259);
                      }
                    }
                  }),
                  (_0x2e0c56[_0x675a7c(0x19a)](_0x675a7c(0x19e))[
                    _0x675a7c(0x16f)
                  ] = function () {
                    _0x2e0c56["style"]["display"] = "none";
                  }));
              }),
            (document["getElementById"](_0x35d3a8(0x172))[_0x35d3a8(0x16f)] =
              async function () {
                const _0x2c8464 = _0x35d3a8;
                try {
                  (await fsp[_0x2c8464(0x189)](_0x407416),
                    _0x424c38["removeChild"](_0x5a5c14),
                    (_0x303465[_0x2c8464(0x17f)][_0x2c8464(0x199)] =
                      _0x2c8464(0x19b)));
                } catch (_0x48c0d0) {
                  console[_0x2c8464(0x1bd)](_0x2c8464(0x177), _0x48c0d0);
                }
              }));
          const _0x1b0298 = document[_0x35d3a8(0x187)]("uploadBtn");
          _0x1b0298[_0x35d3a8(0x16f)] = async function () {
            const _0x108b1f = _0x35d3a8;
            try {
              const _0x1cfe60 = await fsp["readFile"](_0x407416),
                _0xc5e18b = new FileReader();
              (_0xc5e18b[_0x108b1f(0x17a)](new Blob([_0x1cfe60])),
                (_0xc5e18b["onloadend"] = async function () {
                  const _0x54fad9 = _0x108b1f,
                    _0x1f22e1 = _0xc5e18b[_0x54fad9(0x171)],
                    _0x4a335e = await axios["post"](
                      _0x54fad9(0x181) +
                        authtoken +
                        "&cuid=" +
                        cuidUser +
                        _0x54fad9(0x186) +
                        lang,
                      { screenshot: _0x1f22e1 },
                    );
                  if (_0x4a335e[_0x54fad9(0x1ba)][_0x54fad9(0x1bd)])
                    alert(_0x4a335e[_0x54fad9(0x1ba)][_0x54fad9(0x1bd)]);
                  else {
                    const _0x23ad99 =
                      _0x4a335e[_0x54fad9(0x1ba)][_0x54fad9(0x1ac)];
                    ipcRenderer[_0x54fad9(0x188)](_0x54fad9(0x1bb), {
                      url: _0x23ad99,
                      message: _0x54fad9(0x18f),
                    });
                  }
                }));
            } catch (_0x10cb90) {
              console["error"]("Error\x20uploading\x20file:", _0x10cb90);
            }
          };
        }),
        _0x5a5c14[_0x46951c(0x1aa)](_0x167ce4),
        _0x424c38["appendChild"](_0x5a5c14));
    }
  }
  const _0x38b380 = document[_0x46951c(0x18c)](_0x46951c(0x197))[0x0];
  _0x38b380[_0x46951c(0x16f)] = function () {
    const _0x30ca17 = _0x46951c,
      _0x3abf80 = document[_0x30ca17(0x187)](_0x30ca17(0x179));
    _0x3abf80[_0x30ca17(0x17f)][_0x30ca17(0x199)] = _0x30ca17(0x19b);
  };
}
displayScreenshots()[_0x24d916(0x1ae)](console[_0x24d916(0x1bd)]);
