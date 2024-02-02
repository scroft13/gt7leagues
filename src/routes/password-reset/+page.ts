/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  const isExpired = expiredCheck(url.href);

  function expiredCheck(url: string): boolean {
    const queryStringAlpha = url.split('access_token=')[1];
    const queryString = queryStringAlpha?.split('expires_at=')[1];

    const expiresAtBegin = +queryString?.split('&expires')[0];

    if (new Date(expiresAtBegin * 1000) <= new Date()) {
      return false;
    } else {
      return true;
    }
  }

  return {
    validToken: isExpired,
  };
}
