import db from '$lib/db.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const data = await db.currentUser.getUsernameList();
  let usernameList;
  if (data) {
    usernameList = data.map((x) => {
      if (x) {
        return x;
      } else return '';
    });
  }
  return {
    usernameList: usernameList,
  };
}
