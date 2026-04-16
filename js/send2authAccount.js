const _0x31a4a4 = _0xdfbb;
function _0xf5fa() {
  const _0x1bc226 = [
    "234COYTwH",
    "classList",
    "delete",
    "../js/translate",
    "https://authserver.nationsglory.fr/v2/auth?lang=",
    "focus",
    "code03",
    "nextElementSibling",
    "147870joezJg",
    "catch",
    "code05",
    "accounts",
    "&lang=",
    "electron",
    "1775242Mrqjqg",
    "electron-store",
    "addEventListener",
    "Votre\x20code\x20est\x20incorrect",
    "8LqZwHU",
    "token",
    "target",
    "key",
    "messageBox",
    "value",
    "closeModal",
    "data",
    "innerHTML",
    "1609565ycQkWh",
    "add",
    "toLowerCase",
    "8897935mhHZMh",
    "839262fKrHSO",
    "invoke",
    "style",
    "9428344jWYADU",
    "loginErrorMessage",
    "getmac",
    "create",
    "code06",
    "error",
    "remove",
    "hddserial",
    "push",
    "<button\x20onclick=\x22sendCode();\x22\x20id=\x22sendCode\x22\x20data-translate>Envoyer\x20un\x20code</button><button\x20onclick=\x22validateCode();\x22\x20data-translate>Valider</button>",
    "then",
    "2dEkply",
    "post",
    "code02",
    "<button\x20onclick=\x22validateCode();\x22\x20style=\x22width:100%;\x22\x20data-translate>Valider</button>",
    "get",
    "code01",
    "Code\x20envoyé",
    "default",
    "keyup",
    "previousElementSibling",
    "authtoken",
    "password",
    "flex",
    "email",
    "store",
    "isArray",
    "log",
    "getElementById",
    "node-machine-id",
    "code04",
    "enter",
    "3814118zWdlyh",
    "6lAQUmZ",
    "username",
    "sendCode",
    "one",
    "axios",
    "Veuillez\x20indiquer\x20votre\x20code\x20dans\x20le\x20champs\x20ci-dessous",
    "buttons",
  ];
  _0xf5fa = function () {
    return _0x1bc226;
  };
  return _0xf5fa();
}
(function (_0x43373e, _0x4afa50) {
  const _0xa16677 = _0xdfbb,
    _0xc319fa = _0x43373e();
  while (!![]) {
    try {
      const _0x5cfc61 =
        (parseInt(_0xa16677(0x102)) / 0x1) *
          (parseInt(_0xa16677(0x114)) / 0x2) +
        (parseInt(_0xa16677(0x106)) / 0x3) *
          (-parseInt(_0xa16677(0xf9)) / 0x4) +
        -parseInt(_0xa16677(0x105)) / 0x5 +
        (-parseInt(_0xa16677(0xe0)) / 0x6) * (parseInt(_0xa16677(0xf5)) / 0x7) +
        parseInt(_0xa16677(0x109)) / 0x8 +
        (parseInt(_0xa16677(0xe7)) / 0x9) * (parseInt(_0xa16677(0xef)) / 0xa) +
        parseInt(_0xa16677(0xdf)) / 0xb;
      if (_0x5cfc61 === _0x4afa50) break;
      else _0xc319fa["push"](_0xc319fa["shift"]());
    } catch (_0x271e24) {
      _0xc319fa["push"](_0xc319fa["shift"]());
    }
  }
})(_0xf5fa, 0xe238f);
const { ipcRenderer } = require(_0x31a4a4(0xf4)),
  { machineId, machineIdSync } = require(_0x31a4a4(0xdc)),
  getmac = require(_0x31a4a4(0x10b)),
  hddserial = require(_0x31a4a4(0x110)),
  axios = require(_0x31a4a4(0xe4)),
  instance = axios[_0x31a4a4(0x10c)](),
  Store = require(_0x31a4a4(0xf6)),
  store = new Store(),
  lang = store[_0x31a4a4(0xce)]("lang");
let codeAuth = null;
const email = store[_0x31a4a4(0xce)](_0x31a4a4(0xd7)),
  password = store[_0x31a4a4(0xce)](_0x31a4a4(0xd5)),
  apiSend2auth =
    "https://authserver.nationsglory.fr/send2auth?email=" +
    email +
    _0x31a4a4(0xf3) +
    lang,
  apiAuth = _0x31a4a4(0xeb) + lang;
let accounts = store[_0x31a4a4(0xce)]("accounts");
!Array[_0x31a4a4(0xd9)](accounts) && (accounts = []);
async function getMachineId() {
  let _0x487d4b = await machineId();
}
(hddserial[_0x31a4a4(0xe3)](0x1, function (_0x2aeed2, _0x242bb3) {
  hddidUser = _0x242bb3;
}),
  (window["onload"] = function () {
    const _0x1ac0ed = _0x31a4a4,
      _0x226ea1 = document[_0x1ac0ed(0xdb)]("inputs");
    (_0x226ea1["addEventListener"]("input", function (_0x1c2a22) {
      const _0x2f4873 = _0x1ac0ed,
        _0x2c8b20 = _0x1c2a22[_0x2f4873(0xfb)],
        _0x1e85b2 = _0x2c8b20[_0x2f4873(0xfe)];
      if (isNaN(_0x1e85b2)) {
        _0x2c8b20[_0x2f4873(0xfe)] = "";
        return;
      }
      if (_0x1e85b2 != "") {
        const _0x1f61b1 = _0x2c8b20[_0x2f4873(0xee)];
        (_0x2c8b20["classList"][_0x2f4873(0x103)](_0x2f4873(0xde)),
          _0x1f61b1 && _0x1f61b1[_0x2f4873(0xec)]());
      }
    }),
      _0x226ea1[_0x1ac0ed(0xf7)](_0x1ac0ed(0xd2), function (_0x29dbdc) {
        const _0x53758c = _0x1ac0ed,
          _0x539755 = _0x29dbdc[_0x53758c(0xfb)],
          _0x4b8a98 = _0x29dbdc[_0x53758c(0xfc)][_0x53758c(0x104)]();
        if (_0x4b8a98 == "backspace" || _0x4b8a98 == "delete") {
          (_0x539755[_0x53758c(0xe8)][_0x53758c(0x10f)](_0x53758c(0xde)),
            (_0x539755[_0x53758c(0xfe)] = ""));
          const _0x331473 = _0x539755[_0x53758c(0xd3)];
          _0x331473 && _0x331473[_0x53758c(0xec)]();
          return;
        }
      }),
      (document[_0x1ac0ed(0xdb)](_0x1ac0ed(0xe6))["innerHTML"] =
        _0x1ac0ed(0x112)));
  }));
function sendCode() {
  const _0x3e0f7f = _0x31a4a4;
  instance[_0x3e0f7f(0xce)](apiSend2auth)
    [_0x3e0f7f(0x113)](async function (_0x7a671e) {
      const _0xa4fcc7 = _0x3e0f7f;
      _0x7a671e[_0xa4fcc7(0x100)][_0xa4fcc7(0x10e)] ==
      "phone.notfound.alreadysent"
        ? (document[_0xa4fcc7(0xdb)](_0xa4fcc7(0xe6))["innerHTML"] =
            await translateAndSave(_0xa4fcc7(0x117), lang))
        : (document[_0xa4fcc7(0xdb)](_0xa4fcc7(0xe2))[_0xa4fcc7(0x101)] =
            await translateAndSave(_0xa4fcc7(0xd0), lang));
    })
    [_0x3e0f7f(0xf0)]((_0x5ef435) => {
      const _0x14bdad = _0x3e0f7f;
      console[_0x14bdad(0xda)](_0x5ef435);
    });
}
function _0xdfbb(_0x9a2a9, _0x379ab9) {
  const _0xf5fa98 = _0xf5fa();
  return (
    (_0xdfbb = function (_0xdfbb24, _0x522d64) {
      _0xdfbb24 = _0xdfbb24 - 0xce;
      let _0x266497 = _0xf5fa98[_0xdfbb24];
      return _0x266497;
    }),
    _0xdfbb(_0x9a2a9, _0x379ab9)
  );
}
async function validateCode() {
  const _0x198614 = _0x31a4a4;
  ((codeAuth =
    document[_0x198614(0xdb)](_0x198614(0xcf))[_0x198614(0xfe)] +
    document[_0x198614(0xdb)](_0x198614(0x116))["value"] +
    document[_0x198614(0xdb)](_0x198614(0xed))["value"] +
    document[_0x198614(0xdb)](_0x198614(0xdd))[_0x198614(0xfe)] +
    document["getElementById"](_0x198614(0xf1))[_0x198614(0xfe)] +
    document[_0x198614(0xdb)](_0x198614(0x10d))[_0x198614(0xfe)]),
    codeAuth
      ? ((body = btoa(
          JSON["stringify"]({
            email: email,
            password: password,
            authcode: codeAuth,
            cuid: machineIdSync(),
            mac: getmac[_0x198614(0xd1)](),
            hddid: hddidUser,
          }),
        )),
        instance[_0x198614(0x115)](apiAuth, body)
          [_0x198614(0x113)](async function (_0x43942d) {
            const _0x1d6207 = _0x198614;
            _0x43942d[_0x1d6207(0x100)][_0x1d6207(0x10e)] == "WrongAuthcode"
              ? ((document[_0x1d6207(0xdb)](_0x1d6207(0xfd))["style"][
                  "display"
                ] = _0x1d6207(0xd6)),
                (document[_0x1d6207(0xdb)](_0x1d6207(0x10a))[_0x1d6207(0x101)] =
                  await translateAndSave(_0x1d6207(0xf8), lang)))
              : (store[_0x1d6207(0xe9)](_0x1d6207(0xd5)),
                ipcRenderer["invoke"](
                  "store",
                  _0x1d6207(0xd4),
                  _0x43942d[_0x1d6207(0x100)][_0x1d6207(0xfa)],
                ),
                ipcRenderer[_0x1d6207(0x107)](
                  _0x1d6207(0xd8),
                  _0x1d6207(0xe1),
                  _0x43942d[_0x1d6207(0x100)][_0x1d6207(0xe1)],
                ),
                accounts[_0x1d6207(0x111)]({
                  username: _0x43942d[_0x1d6207(0x100)][_0x1d6207(0xe1)],
                  token: _0x43942d[_0x1d6207(0x100)][_0x1d6207(0xfa)],
                }),
                ipcRenderer[_0x1d6207(0x107)](
                  _0x1d6207(0xd8),
                  _0x1d6207(0xf2),
                  accounts,
                ),
                ipcRenderer["invoke"](_0x1d6207(0xff)));
          })
          [_0x198614(0xf0)]((_0x3f13a8) => {
            const _0xfb21ec = _0x198614;
            console[_0xfb21ec(0xda)](_0x3f13a8);
          }))
      : ((document["getElementById"]("messageBox")[_0x198614(0x108)][
          "display"
        ] = _0x198614(0xd6)),
        (document[_0x198614(0xdb)](_0x198614(0x10a))[_0x198614(0x101)] =
          await translateAndSave(_0x198614(0xe5), lang))));
}
function openLogin() {
  ipcRenderer["invoke"]("loginCode");
}
const { translateAndSave, translatePageElements } = require(_0x31a4a4(0xea));
translatePageElements(lang);
