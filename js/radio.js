const _0x466342 = _0x3908;
(function (_0x289b88, _0x32f993) {
  const _0x1fbbfd = _0x3908,
    _0x51057a = _0x289b88();
  while (!![]) {
    try {
      const _0x17167a =
        -parseInt(_0x1fbbfd(0x17c)) / 0x1 +
        (-parseInt(_0x1fbbfd(0x1ab)) / 0x2) *
          (parseInt(_0x1fbbfd(0x194)) / 0x3) +
        -parseInt(_0x1fbbfd(0x196)) / 0x4 +
        -parseInt(_0x1fbbfd(0x19d)) / 0x5 +
        parseInt(_0x1fbbfd(0x1a6)) / 0x6 +
        -parseInt(_0x1fbbfd(0x184)) / 0x7 +
        (parseInt(_0x1fbbfd(0x1a3)) / 0x8) * (parseInt(_0x1fbbfd(0x19e)) / 0x9);
      if (_0x17167a === _0x32f993) break;
      else _0x51057a["push"](_0x51057a["shift"]());
    } catch (_0xa1a8f5) {
      _0x51057a["push"](_0x51057a["shift"]());
    }
  }
})(_0x57af, 0x2b90e);
const apiRadio = _0x466342(0x17b);
window[_0x466342(0x17d)] = initializePlayer;
function initializePlayer() {
  const _0x4e8282 = _0x466342;
  ipcRenderer["on"]("data-change", (_0x5eaf5f, _0x268e20, _0x39d93a) => {
    const _0x40f5ce = _0x3908;
    _0x268e20 == _0x40f5ce(0x18a) && (isPlaying = _0x39d93a);
  });
  const _0x58ad2c = document[_0x4e8282(0x18b)](_0x4e8282(0x19c)),
    _0x2133be = ipcRenderer[_0x4e8282(0x182)]("get-data", _0x4e8282(0x18a)),
    _0x3e7da8 = ipcRenderer[_0x4e8282(0x182)]("get-data", _0x4e8282(0x185));
  (setPlayButtonState(_0x2133be),
    (_0x58ad2c[_0x4e8282(0x1a1)] = _0x3e7da8 * 0x64),
    _0x58ad2c[_0x4e8282(0x1a5)]("change", handleVolumeChange),
    (data = ipcRenderer[_0x4e8282(0x182)]("get-data", "NGRadioAPI")));
  if (!data || !data.now_playing) return;
  const _0x12e75f = data[_0x4e8282(0x18c)];
  ((document[_0x4e8282(0x18b)](_0x4e8282(0x186))[_0x4e8282(0x187)][
    _0x4e8282(0x1aa)
  ] =
    _0x4e8282(0x17f) +
    _0x12e75f[_0x4e8282(0x191)][_0x4e8282(0x1ac)] +
    _0x4e8282(0x17a)),
    (document["getElementById"](_0x4e8282(0x19f))[_0x4e8282(0x195)] =
      "<img\x20src=\x22" +
      _0x12e75f[_0x4e8282(0x191)]["art"] +
      _0x4e8282(0x1a4)),
    (document[_0x4e8282(0x18b)](_0x4e8282(0x19b))[_0x4e8282(0x195)] =
      _0x12e75f["song"]["title"]),
    (document[_0x4e8282(0x18b)](_0x4e8282(0x19a))[_0x4e8282(0x195)] =
      _0x12e75f[_0x4e8282(0x191)][_0x4e8282(0x19a)]),
    (document[_0x4e8282(0x18b)](_0x4e8282(0x192))[_0x4e8282(0x195)] =
      convertSeconds(
        ipcRenderer[_0x4e8282(0x182)](_0x4e8282(0x188), "NGRadioElapsed"),
      )),
    data["live"][_0x4e8282(0x199)] == !![]
      ? (document[_0x4e8282(0x18b)]("duration")[_0x4e8282(0x195)] =
          _0x4e8282(0x190))
      : (document[_0x4e8282(0x18b)](_0x4e8282(0x189))[_0x4e8282(0x195)] =
          convertSeconds(
            ipcRenderer[_0x4e8282(0x182)]("get-data", "NGRadioDuration"),
          )));
}
function _0x57af() {
  const _0x3818d6 = [
    "#play\x20img",
    "background-image:url(\x27",
    "<img\x20src=\x22",
    "();\x22/>",
    "sendSync",
    "NGRadio-volume",
    "1990814YDvTzt",
    "NGRadioVolume",
    "background",
    "style",
    "get-data",
    "duration",
    "NGRadioPlaying",
    "getElementById",
    "now_playing",
    "togglePlayPause",
    "includes",
    "currentTarget",
    "LIVE",
    "song",
    "elapsed",
    "src",
    "102819wFNVOS",
    "innerHTML",
    "1261848opBrpn",
    "../images/Icon_PlayerPlay.svg",
    "play",
    "is_live",
    "artist",
    "title",
    "volumeSlider",
    "1110275njeqoA",
    "565641rbzoqC",
    "image",
    "\x22\x20alt=\x22\x22\x20onclick=\x22",
    "value",
    "set-data",
    "144DugtyM",
    "\x22\x20alt=\x22\x22/>",
    "addEventListener",
    "881850NSSSxN",
    "send",
    "toString",
    "NGRadioDuration",
    "cssText",
    "8vrDzah",
    "art",
    "../images/Icon_PlayerPause.svg",
    "Icon_PlayerPause.svg",
    "\x27);background-size:contain;width:100%;height:100%;filter:blur(5rem);animation:\x20background-blur\x20120s\x20ease\x20infinite;transition:\x20all\x20.4s\x20ease-in-out;border-radius:\x200\x2010px\x2010px\x200;",
    "https://refuge-api.onrender.com/radio/api",
    "140800pFfjUe",
    "onload",
  ];
  _0x57af = function () {
    return _0x3818d6;
  };
  return _0x57af();
}
function handleVolumeChange(_0x2985aa) {
  const _0x4a8a32 = _0x466342,
    _0x577595 = _0x2985aa[_0x4a8a32(0x18f)][_0x4a8a32(0x1a1)] / 0x64;
  ipcRenderer[_0x4a8a32(0x1a7)](_0x4a8a32(0x183), _0x577595);
}
function setPlayButtonState(_0x536e6c) {
  const _0x2f3e54 = _0x466342;
  let _0x579520 = _0x536e6c ? _0x2f3e54(0x178) : _0x2f3e54(0x197),
    _0x514372 = _0x2f3e54(0x18d);
  document[_0x2f3e54(0x18b)](_0x2f3e54(0x198))[_0x2f3e54(0x195)] =
    _0x2f3e54(0x180) +
    _0x579520 +
    _0x2f3e54(0x1a0) +
    _0x514372 +
    _0x2f3e54(0x181);
}
setInterval(async () => {
  const _0x1d8b25 = _0x466342,
    _0x330981 = document[_0x1d8b25(0x18b)](_0x1d8b25(0x192)),
    _0x5dd025 = parseInt(
      await ipcRenderer["sendSync"]("get-data", "NGRadioElapsed"),
    ),
    _0xebf43 = parseInt(
      await ipcRenderer["sendSync"]("get-data", _0x1d8b25(0x1a9)),
    );
  _0x330981["innerHTML"] = convertSeconds(_0x5dd025);
}, 0x3e8);
function convertSeconds(_0x441583) {
  const _0x1b099f = _0x466342,
    _0x56aa57 = ~~(_0x441583 / 0x3c),
    _0x2f16c1 = (_0x441583 % 0x3c)[_0x1b099f(0x1a8)]()["padStart"](0x2, "0");
  return _0x56aa57 + ":" + _0x2f16c1;
}
function _0x3908(_0x50091d, _0x3af245) {
  const _0x57afab = _0x57af();
  return (
    (_0x3908 = function (_0x3908bc, _0x289c9b) {
      _0x3908bc = _0x3908bc - 0x178;
      let _0x41c8aa = _0x57afab[_0x3908bc];
      return _0x41c8aa;
    }),
    _0x3908(_0x50091d, _0x3af245)
  );
}
function togglePlayPause() {
  const _0x577791 = _0x466342,
    _0x2db2fb = document["querySelector"](_0x577791(0x17e))[_0x577791(0x193)],
    _0x35f35d = _0x2db2fb[_0x577791(0x18e)](_0x577791(0x179));
  (setPlayButtonState(!_0x35f35d),
    ipcRenderer[_0x577791(0x1a7)]("NGRadio-state-changed", !_0x35f35d),
    ipcRenderer[_0x577791(0x1a7)](
      _0x577791(0x1a2),
      "NGRadioPlaying",
      !_0x35f35d,
    ));
}
