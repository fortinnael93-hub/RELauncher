const _0x58e946 = _0x4e0a;
(function (_0x531193, _0x213b99) {
  const _0x529add = _0x4e0a,
    _0xa9bfd3 = _0x531193();
  while (!![]) {
    try {
      const _0x5d6b2d =
        parseInt(_0x529add(0x13e)) / 0x1 +
        (parseInt(_0x529add(0x11c)) / 0x2) *
          (parseInt(_0x529add(0x14d)) / 0x3) +
        (-parseInt(_0x529add(0x14a)) / 0x4) *
          (-parseInt(_0x529add(0x127)) / 0x5) +
        (-parseInt(_0x529add(0x137)) / 0x6) *
          (-parseInt(_0x529add(0x145)) / 0x7) +
        (-parseInt(_0x529add(0x12d)) / 0x8) *
          (-parseInt(_0x529add(0x124)) / 0x9) +
        (parseInt(_0x529add(0x129)) / 0xa) *
          (-parseInt(_0x529add(0x141)) / 0xb) +
        (-parseInt(_0x529add(0x13a)) / 0xc) *
          (parseInt(_0x529add(0x149)) / 0xd);
      if (_0x5d6b2d === _0x213b99) break;
      else _0xa9bfd3["push"](_0xa9bfd3["shift"]());
    } catch (_0x30992e) {
      _0xa9bfd3["push"](_0xa9bfd3["shift"]());
    }
  }
})(_0x1e90, 0x44b60);
function _0x1e90() {
  const _0x336344 = [
    "description",
    "2AuthenticationRequired",
    "getElementById",
    "responseText",
    "email",
    "131382KxxPQO",
    "onload",
    "Veuillez\x20renseigner\x20une\x20adresse\x20email",
    "47112TejiRP",
    "default",
    "flex",
    "loginErrorMessage",
    "41093cYUpyb",
    "onclick",
    "one",
    "22tMxAfd",
    "get",
    "openModal",
    "none",
    "126IdtEIu",
    "closeModal",
    "then",
    "authtoken",
    "2262uerOvz",
    "12MagIsE",
    "token",
    "electron",
    "3qzbmPe",
    "value",
    "node-machine-id",
    "display",
    "Le\x20format\x20de\x20votre\x20adresse\x20email\x20est\x20incorrect",
    "send",
    "377446WRpRnG",
    "electron-store",
    "push",
    "loginButton",
    "preventDefault",
    "isArray",
    "Veuillez\x20renseigner\x20un\x20mot\x20de\x20passe",
    "store",
    "779211xBQsVK",
    "innerHTML",
    "invoke",
    "565105lTIwKI",
    "style",
    "2156780RHegCz",
    "error",
    "username",
    "Connexion...",
    "40fLIYEP",
    "messageBox",
    "accounts",
    "lang",
    "POST",
  ];
  _0x1e90 = function () {
    return _0x336344;
  };
  return _0x1e90();
}
const { ipcRenderer } = require(_0x58e946(0x14c)),
  { machineId, machineIdSync } = require(_0x58e946(0x14f)),
  getmac = require("getmac"),
  hddserial = require("hddserial"),
  Store = require(_0x58e946(0x11d)),
  store = new Store();
let accounts = store[_0x58e946(0x142)](_0x58e946(0x12f));
!Array[_0x58e946(0x121)](accounts) && (accounts = []);
let loginButton,
  email,
  password,
  errors,
  hddidUser,
  xhr = new XMLHttpRequest();
async function getMachineId() {
  let _0x3495b2 = await machineId();
}
const lang = store[_0x58e946(0x142)](_0x58e946(0x130));
hddserial[_0x58e946(0x140)](0x0, function (_0x521962, _0x2868e9) {
  hddidUser = _0x2868e9;
});
function _0x4e0a(_0xf206e9, _0x3719ef) {
  const _0x1e90e0 = _0x1e90();
  return (
    (_0x4e0a = function (_0x4e0a22, _0x5e82ca) {
      _0x4e0a22 = _0x4e0a22 - 0x11c;
      let _0x5eb992 = _0x1e90e0[_0x4e0a22];
      return _0x5eb992;
    }),
    _0x4e0a(_0xf206e9, _0x3719ef)
  );
}
async function closeModalWindow() {
  const _0x3f9a8e = _0x58e946;
  await ipcRenderer[_0x3f9a8e(0x126)](_0x3f9a8e(0x146));
}
window[_0x58e946(0x138)] = async function () {
  const _0x1768b6 = _0x58e946;
  ((loginButton = document[_0x1768b6(0x134)](_0x1768b6(0x11f))),
    (email = document[_0x1768b6(0x134)](_0x1768b6(0x136))),
    (password = document[_0x1768b6(0x134)]("password")),
    (messageBox = document["getElementById"](_0x1768b6(0x12e))),
    (errors = document[_0x1768b6(0x134)](_0x1768b6(0x13d))),
    (loginButton[_0x1768b6(0x13f)] = async function () {
      const _0x36d4ab = _0x1768b6;
      event[_0x36d4ab(0x120)]();
      if (email[_0x36d4ab(0x14e)]) {
        if (password["value"]) {
          if (await validateEmail(email[_0x36d4ab(0x14e)])) {
            const _0x15bd65 = {
              email: email[_0x36d4ab(0x14e)],
              password: password[_0x36d4ab(0x14e)],
            };
            ((cuidUser = machineIdSync()),
              (macUser = getmac[_0x36d4ab(0x13b)]()),
              (body = {
                email: email[_0x36d4ab(0x14e)],
                password: password[_0x36d4ab(0x14e)],
                cuid: cuidUser,
                mac: macUser,
                hddid: hddidUser,
              }),
              xhr["open"](
                _0x36d4ab(0x131),
                "https://authserver.nationsglory.fr/v2/auth?lang=" + lang,
              ),
              xhr[_0x36d4ab(0x152)](btoa(JSON["stringify"](body))),
              (xhr[_0x36d4ab(0x138)] = async function () {
                const _0x8a4f5 = _0x36d4ab;
                ((jsonResponse = JSON["parse"](xhr[_0x8a4f5(0x135)])),
                  console["log"](jsonResponse));
                if (jsonResponse["type"] == "error")
                  ((messageBox[_0x8a4f5(0x128)][_0x8a4f5(0x150)] =
                    _0x8a4f5(0x13c)),
                    (errors["innerHTML"] = jsonResponse[_0x8a4f5(0x132)]));
                else {
                  if (jsonResponse[_0x8a4f5(0x12a)] == "auth.success")
                    ((document["getElementById"](_0x8a4f5(0x11f))[
                      _0x8a4f5(0x125)
                    ] = _0x8a4f5(0x12c)),
                      ipcRenderer["invoke"](
                        "store",
                        _0x8a4f5(0x148),
                        jsonResponse[_0x8a4f5(0x14b)],
                      ),
                      ipcRenderer[_0x8a4f5(0x126)](
                        _0x8a4f5(0x123),
                        _0x8a4f5(0x12b),
                        jsonResponse[_0x8a4f5(0x12b)],
                      ),
                      accounts[_0x8a4f5(0x11e)]({
                        username: jsonResponse[_0x8a4f5(0x12b)],
                        token: jsonResponse[_0x8a4f5(0x14b)],
                      }),
                      ipcRenderer[_0x8a4f5(0x126)](
                        _0x8a4f5(0x123),
                        "accounts",
                        accounts,
                      ),
                      ipcRenderer[_0x8a4f5(0x126)]("closeModal"));
                  else
                    jsonResponse[_0x8a4f5(0x12a)] == _0x8a4f5(0x133) &&
                      (ipcRenderer["invoke"](
                        _0x8a4f5(0x123),
                        _0x8a4f5(0x136),
                        email["value"],
                      ),
                      ipcRenderer["invoke"](
                        "store",
                        "password",
                        password["value"],
                      ),
                      ipcRenderer["invoke"](
                        _0x8a4f5(0x143),
                        "sendsmsAccount.html",
                      ));
                }
              }),
              (messageBox["style"][_0x36d4ab(0x150)] = _0x36d4ab(0x144)));
          } else
            ((messageBox[_0x36d4ab(0x128)]["display"] = _0x36d4ab(0x13c)),
              (errors[_0x36d4ab(0x125)] = await translateAndSave(
                _0x36d4ab(0x151),
                lang,
              )));
        } else
          ((messageBox[_0x36d4ab(0x128)][_0x36d4ab(0x150)] = _0x36d4ab(0x13c)),
            (errors[_0x36d4ab(0x125)] = await translateAndSave(
              _0x36d4ab(0x122),
              lang,
            )));
      } else
        ((messageBox["style"]["display"] = _0x36d4ab(0x13c)),
          (errors["innerHTML"] = await translateAndSave(
            _0x36d4ab(0x139),
            lang,
          )));
    }));
  function _0x1c7d29() {
    const _0x43668b = _0x1768b6;
    sleep(0x7d0)[_0x43668b(0x147)](() => {
      const _0x5d4f57 = _0x43668b;
      ipcRenderer[_0x5d4f57(0x126)]("login");
    });
  }
};
const { translateAndSave, translatePageElements } = require("../js/translate");
translatePageElements(lang);
