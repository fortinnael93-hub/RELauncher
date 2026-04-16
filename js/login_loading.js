const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const API_URL = "https://refuge-api.onrender.com";

window.onload = async function () {
  // store, ipcRenderer, instance, hddserial, cuidUser, mac, lang
  // sont déjà définis par utils.js
  const authtoken = store.get("authtoken") || null;

  if (authtoken) await reAuth(authtoken);

  await delay(500);
  ipcRenderer.invoke("main");
};

async function reAuth(token) {
  await hddserial.one(0, async function (err, hddid) {
    const body = btoa(
      JSON.stringify({
        accessToken: token,
        cuid: cuidUser,
        mac: mac,
        hddid: hddid,
      }),
    );

    try {
      const response = await instance.post(
        `${API_URL}/v2/reauth?lang=${lang}`,
        body,
      );

      if (!response || (response.status >= 500 && response.status <= 599)) {
        logout();
        return;
      }

      const data = response.data;

      if (data.error === "error.emailunverified") {
        alert(data.description);
        return;
      }

      if (data.error === "reauth.success") {
        return;
      }

      logout();
    } catch (err) {
      console.log(err);
      logout();
    }
  });
}
