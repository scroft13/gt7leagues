import db, { supabase } from '$lib/db.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const data = await db.currentUser.getUsernameList();
  const usernameList = data?.map((x) => {
    if (x) {
      return x;
    } else return '';
  });

  return {
    usernameList: usernameList,
  };
}
