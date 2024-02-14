async function load({ url }) {
  const isExpired = expiredCheck(url.href);
  function expiredCheck(url2) {
    const queryStringAlpha = url2.split("access_token=")[1];
    const queryString = queryStringAlpha?.split("expires_at=")[1];
    const expiresAtBegin = +queryString?.split("&expires")[0];
    if (new Date(expiresAtBegin * 1e3) <= /* @__PURE__ */ new Date()) {
      return false;
    } else {
      return true;
    }
  }
  return {
    validToken: isExpired
  };
}
export {
  load
};
