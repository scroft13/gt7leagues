import { s as supabase } from "../../../chunks/db.js";
async function load({ url }) {
  const fetchUrl = url.searchParams.get("confirmation_url");
  const token_hash = extractTokenFromURL(fetchUrl);
  const type = extractTypeFromURL(fetchUrl);
  const email = url.searchParams.get("email");
  if (token_hash && type && email) {
    await supabase.auth.verifyOtp({ token_hash, type });
  }
  function extractTokenFromURL(url2) {
    const queryString = url2.split("?")[1];
    if (queryString) {
      const queryParams = queryString.split("&");
      const tokenParam = queryParams.find((param) => param.startsWith("token="));
      if (tokenParam) {
        const token = tokenParam.split("=")[1];
        return token;
      }
    }
    return null;
  }
  function extractTypeFromURL(url2) {
    const queryString = url2.split("?")[1];
    if (queryString) {
      const queryParams = queryString.split("&");
      const typeParams = queryParams.find((param) => param.startsWith("type="));
      if (typeParams) {
        const token = typeParams.split("=")[1];
        return token;
      }
    }
    return null;
  }
}
export {
  load
};
