console.log("now");
async function load({ url }) {
  console.log(url.searchParams.get(""));
  const fetchUrl = url.searchParams.get("confirmation_url");
  const response = await fetch(fetchUrl);
  console.log(response);
  return response;
}
export {
  load
};
