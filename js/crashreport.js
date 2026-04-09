function _0x4493() {
  const _0x4ab717 = [
    "1482408bxZmKV",
    "error",
    "pastebin",
    "12951666MgtBop",
    "&cuid=",
    "6203116uPfVnm",
    "stringify",
    "data",
    "soluce",
    "Error\x20uploading\x20crashreport\x20:",
    "textContent",
    "1541984hvSFFk",
    "23244704axHrUL",
    "post",
    "block",
    "innerHTML",
    "\x27);\x22>Lien\x20Pastebin</button>",
    "5OIMVBv",
    "<button\x20class=\x22pastebin\x22\x20onclick=\x22getExternalLink(\x27",
    "2416148nRzKbb",
    "getElementById",
    "1769358zBEMiZ",
  ];
  _0x4493 = function () {
    return _0x4ab717;
  };
  return _0x4493();
}
const _0x23509f = _0x54de;
((function (_0x4e6e80, _0x1910d6) {
  const _0x5a463c = _0x54de,
    _0x2c6feb = _0x4e6e80();
  while (!![]) {
    try {
      const _0x3d003f =
        parseInt(_0x5a463c(0xb4)) / 0x1 +
        parseInt(_0x5a463c(0xbc)) / 0x2 +
        parseInt(_0x5a463c(0xbf)) / 0x3 +
        (-parseInt(_0x5a463c(0xae)) / 0x4) * (parseInt(_0x5a463c(0xba)) / 0x5) +
        parseInt(_0x5a463c(0xbe)) / 0x6 +
        parseInt(_0x5a463c(0xac)) / 0x7 +
        -parseInt(_0x5a463c(0xb5)) / 0x8;
      if (_0x3d003f === _0x1910d6) break;
      else _0x2c6feb["push"](_0x2c6feb["shift"]());
    } catch (_0x1f286f) {
      _0x2c6feb["push"](_0x2c6feb["shift"]());
    }
  }
})(_0x4493, 0xe3c5e),
  (crash = ipcRenderer["sendSync"]("get-data", "crashReport")),
  (document[_0x23509f(0xbd)](_0x23509f(0xb7))[_0x23509f(0xb3)] = crash));
function _0x54de(_0x200c99, _0x54f6a6) {
  const _0x44934a = _0x4493();
  return (
    (_0x54de = function (_0x54de7e, _0x8582fa) {
      _0x54de7e = _0x54de7e - 0xaa;
      let _0x4b06a9 = _0x44934a[_0x54de7e];
      return _0x4b06a9;
    }),
    _0x54de(_0x200c99, _0x54f6a6)
  );
}
const generateCrash =
  "https://apiv2.nationsglory.fr/launcher/uploadCrash?lang=" +
  lang +
  _0x23509f(0xad) +
  cuidUser +
  "&token=" +
  authtoken;
async function uploadAndGetSoluce(_0x377ede, _0x41d2d8) {
  const _0x1a8e23 = _0x23509f;
  try {
    ((response = await axios[_0x1a8e23(0xb6)](
      generateCrash,
      JSON[_0x1a8e23(0xaf)]({ crash: _0x41d2d8 }),
    )),
      (document[_0x1a8e23(0xbd)](_0x1a8e23(0xb1))[_0x1a8e23(0xb3)] =
        response[_0x1a8e23(0xb0)]["soluce"]),
      response[_0x1a8e23(0xb0)][_0x1a8e23(0xab)] &&
        ((document["getElementById"](_0x1a8e23(0xab))["style"]["display"] =
          "block"),
        (document[_0x1a8e23(0xbd)](_0x1a8e23(0xab))[_0x1a8e23(0xb8)] =
          _0x1a8e23(0xbb) +
          response[_0x1a8e23(0xb0)]["pastebin"] +
          _0x1a8e23(0xb9))));
  } catch (_0x1dc066) {
    console[_0x1a8e23(0xaa)](_0x1a8e23(0xb2), _0x1dc066);
  }
}
uploadAndGetSoluce(username, crash);
