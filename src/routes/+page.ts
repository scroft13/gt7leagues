import db, { supabase } from '$lib/db.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const session = await supabase.auth.getSession();
  const id = session.data.session?.user.id;
  if (id) {
    const username = await db.currentUser.currentUsername(id);
    const data = await db.currentUser.getUsernameList();
    const usernameList = data?.map((x) => {
      if (x) {
        return x;
      } else return '';
    });

    if (username) {
      return {
        username: username,
      };
    } else {
      return {
        username: null,
        usernameList: usernameList,
      };
    }
  }
}
