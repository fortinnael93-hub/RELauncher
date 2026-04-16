const _0xfa9a9 = _0x1df5;
function _0x4fa3() {
  const _0x46fd0b = [
    "target",
    "value",
    "classList",
    "buttons",
    "&lang=",
    "209131ykyIZz",
    "15549oXttKo",
    "input",
    "messageBox",
    "style",
    "username",
    "enter",
    "../js/translate",
    "loginCode",
    "inputs",
    "addEventListener",
    "7988672PXOxOx",
    "stringify",
    "sendCode",
    "data",
    "one",
    "687428WWHiVD",
    "55560tKtNcc",
    "invoke",
    "log",
    "password",
    "axios",
    "focus",
    "getmac",
    "code03",
    "default",
    "code04",
    "isArray",
    "https://authserver.nationsglory.fr/send2auth?email=",
    "1314iISaZC",
    "11010joVmlK",
    "display",
    "electron",
    "<button\x20onclick=\x22sendCode();\x22\x20id=\x22sendCode\x22\x20data-translate>Envoyer\x20un\x20code\x20par\x20Mail</button><button\x20onclick=\x22validateCode();\x22\x20data-translate>Valider</button>",
    "keyup",
    "token",
    "then",
    "electron-store",
    "error",
    "add",
    "backspace",
    "node-machine-id",
    "post",
    "WrongAuthcode",
    "code06",
    "code05",
    "loginLoading",
    "accounts",
    "hddserial",
    "create",
    "code02",
    "flex",
    "innerHTML",
    "6OFrMVk",
    "218eddtMW",
    "store",
    "delete",
    "catch",
    "https://authserver.nationsglory.fr/v2/auth?lang=",
    "previousElementSibling",
    "Veuillez\x20indiquer\x20votre\x20code\x20dans\x20le\x20champs\x20ci-dessous",
    "nextElementSibling",
    "loginErrorMessage",
    "5512577BFEWSB",
    "get",
    "getElementById",
  ];
  _0x4fa3 = function () {
    return _0x46fd0b;
  };
  return _0x4fa3();
}
(function (_0x5aee86, _0x21fa0e) {
  const _0x3c2d21 = _0x1df5,
    _0x2263ae = _0x5aee86();
  while (!![]) {
    try {
      const _0x406e45 =
        parseInt(_0x3c2d21(0xbf)) / 0x1 +
        (-parseInt(_0x3c2d21(0xae)) / 0x2) *
          (-parseInt(_0x3c2d21(0xc0)) / 0x3) +
        -parseInt(_0x3c2d21(0xcf)) / 0x4 +
        parseInt(_0x3c2d21(0xd0)) / 0x5 +
        (-parseInt(_0x3c2d21(0xad)) / 0x6) *
          (-parseInt(_0x3c2d21(0xb7)) / 0x7) +
        -parseInt(_0x3c2d21(0xca)) / 0x8 +
        (parseInt(_0x3c2d21(0xdc)) / 0x9) * (parseInt(_0x3c2d21(0xdd)) / 0xa);
      if (_0x406e45 === _0x21fa0e) break;
      else _0x2263ae["push"](_0x2263ae["shift"]());
    } catch (_0x3611f1) {
      _0x2263ae["push"](_0x2263ae["shift"]());
    }
  }
})(_0x4fa3, 0x8973e);
const { ipcRenderer } = require(_0xfa9a9(0xdf)),
  { machineId, machineIdSync } = require(_0xfa9a9(0xe8)),
  getmac = require(_0xfa9a9(0xd6)),
  hddserial = require(_0xfa9a9(0xa8)),
  axios = require(_0xfa9a9(0xd4)),
  instance = axios[_0xfa9a9(0xa9)](),
  Store = require(_0xfa9a9(0xe4)),
  store = new Store();
let lang = store[_0xfa9a9(0xb8)]("lang"),
  codeAuth = null;
const email = store["get"]("email"),
  password = store[_0xfa9a9(0xb8)](_0xfa9a9(0xd3)),
  apiSend2auth = _0xfa9a9(0xdb) + email + _0xfa9a9(0xbe) + lang,
  apiAuth = _0xfa9a9(0xb2) + lang;
let accounts = store["get"](_0xfa9a9(0xa7));
!Array[_0xfa9a9(0xda)](accounts) && (accounts = []);
async function getMachineId() {
  let _0x3a65c5 = await machineId();
}
function _0x1df5(_0x4023cc, _0x29fcbf) {
  const _0x4fa323 = _0x4fa3();
  return (
    (_0x1df5 = function (_0x1df51b, _0x5c6e76) {
      _0x1df51b = _0x1df51b - 0xa2;
      let _0x2f3d4d = _0x4fa323[_0x1df51b];
      return _0x2f3d4d;
    }),
    _0x1df5(_0x4023cc, _0x29fcbf)
  );
}
(hddserial[_0xfa9a9(0xce)](0x1, function (_0x4cd212, _0x5cd71c) {
  hddidUser = _0x5cd71c;
}),
  (window["onload"] = function () {
    const _0x3af165 = _0xfa9a9,
      _0x15a681 = document[_0x3af165(0xb9)](_0x3af165(0xc8));
    (_0x15a681[_0x3af165(0xc9)](_0x3af165(0xc1), function (_0x113b06) {
      const _0x225814 = _0x3af165,
        _0x2fbccf = _0x113b06["target"],
        _0x280bd2 = _0x2fbccf[_0x225814(0xbb)];
      if (isNaN(_0x280bd2)) {
        _0x2fbccf["value"] = "";
        return;
      }
      if (_0x280bd2 != "") {
        const _0x59a4ef = _0x2fbccf[_0x225814(0xb5)];
        (_0x2fbccf[_0x225814(0xbc)][_0x225814(0xe6)]("enter"),
          _0x59a4ef && _0x59a4ef[_0x225814(0xd5)]());
      }
    }),
      _0x15a681[_0x3af165(0xc9)](_0x3af165(0xe1), function (_0x1d3845) {
        const _0x2344d4 = _0x3af165,
          _0x272081 = _0x1d3845[_0x2344d4(0xba)],
          _0x5eae64 = _0x1d3845["key"]["toLowerCase"]();
        if (_0x5eae64 == _0x2344d4(0xe7) || _0x5eae64 == _0x2344d4(0xb0)) {
          (_0x272081[_0x2344d4(0xbc)]["remove"](_0x2344d4(0xc5)),
            (_0x272081[_0x2344d4(0xbb)] = ""));
          const _0x1bd05a = _0x272081[_0x2344d4(0xb3)];
          _0x1bd05a && _0x1bd05a[_0x2344d4(0xd5)]();
          return;
        }
      }),
      (document[_0x3af165(0xb9)](_0x3af165(0xbd))[_0x3af165(0xac)] =
        _0x3af165(0xe0)));
  }));
async function sendCode() {
  const _0x330ac2 = _0xfa9a9;
  instance[_0x330ac2(0xb8)](apiSend2auth)
    [_0x330ac2(0xe3)](async function (_0x61a85b) {
      const _0x3b69b2 = _0x330ac2;
      document[_0x3b69b2(0xb9)](_0x3b69b2(0xcc))["innerHTML"] =
        await translateAndSave("Code\x20envoyé", lang);
    })
    ["catch"]((_0x380985) => {
      console["log"](_0x380985);
    });
}
async function validateCode() {
  const _0x257671 = _0xfa9a9;
  ((codeAuth =
    document["getElementById"]("code01")["value"] +
    document["getElementById"](_0x257671(0xaa))["value"] +
    document[_0x257671(0xb9)](_0x257671(0xd7))[_0x257671(0xbb)] +
    document["getElementById"](_0x257671(0xd9))[_0x257671(0xbb)] +
    document[_0x257671(0xb9)](_0x257671(0xa5))[_0x257671(0xbb)] +
    document[_0x257671(0xb9)](_0x257671(0xa4))[_0x257671(0xbb)]),
    codeAuth
      ? ((body = btoa(
          JSON[_0x257671(0xcb)]({
            email: email,
            password: password,
            authcode: codeAuth,
            cuid: machineIdSync(),
            mac: getmac[_0x257671(0xd8)](),
            hddid: hddidUser,
          }),
        )),
        instance[_0x257671(0xa2)](apiAuth, body)
          [_0x257671(0xe3)](async function (_0x2e9195) {
            const _0x3cb57d = _0x257671;
            _0x2e9195["data"][_0x3cb57d(0xe5)] == _0x3cb57d(0xa3)
              ? ((document[_0x3cb57d(0xb9)](_0x3cb57d(0xc2))[_0x3cb57d(0xc3)][
                  _0x3cb57d(0xde)
                ] = _0x3cb57d(0xab)),
                (document["getElementById"](_0x3cb57d(0xb6))[_0x3cb57d(0xac)] =
                  await translateAndSave(
                    "Votre\x20code\x20est\x20incorrect",
                    lang,
                  )))
              : (store["delete"](_0x3cb57d(0xd3)),
                ipcRenderer[_0x3cb57d(0xd1)](
                  _0x3cb57d(0xaf),
                  "authtoken",
                  _0x2e9195[_0x3cb57d(0xcd)][_0x3cb57d(0xe2)],
                ),
                ipcRenderer[_0x3cb57d(0xd1)](
                  "store",
                  _0x3cb57d(0xc4),
                  _0x2e9195[_0x3cb57d(0xcd)]["username"],
                ),
                accounts["push"]({
                  username: _0x2e9195[_0x3cb57d(0xcd)]["username"],
                  token: _0x2e9195[_0x3cb57d(0xcd)][_0x3cb57d(0xe2)],
                }),
                ipcRenderer[_0x3cb57d(0xd1)](
                  _0x3cb57d(0xaf),
                  _0x3cb57d(0xa7),
                  accounts,
                ),
                ipcRenderer["invoke"](_0x3cb57d(0xa6)));
          })
          [_0x257671(0xb1)]((_0x3d2134) => {
            const _0x5cd4d0 = _0x257671;
            console[_0x5cd4d0(0xd2)](_0x3d2134);
          }))
      : ((document[_0x257671(0xb9)]("messageBox")[_0x257671(0xc3)]["display"] =
          _0x257671(0xab)),
        (document[_0x257671(0xb9)]("loginErrorMessage")[_0x257671(0xac)] =
          await translateAndSave(_0x257671(0xb4), lang))));
}
function openLogin() {
  const _0x1cdb00 = _0xfa9a9;
  ipcRenderer[_0x1cdb00(0xd1)](_0x1cdb00(0xc7));
}
const { translateAndSave, translatePageElements } = require(_0xfa9a9(0xc6));
translatePageElements(lang);
