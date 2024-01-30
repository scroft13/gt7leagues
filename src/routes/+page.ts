import db from '$lib/db.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const username = await db.users.currentUsername();
  console.log(username);

  if (username) {
    return {
      username: username,
    };
  } else
    return {
      username: null,
    };
}
