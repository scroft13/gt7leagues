import { supabase } from '$lib/db.js';
import { storedUser } from '$lib/stores.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.username) {
    let isCurrentUser = false;
    let storedUserUsername = '';
    storedUser.subscribe((user) => {
      if (user) {
        storedUserUsername = user.username;
      }
    });
    if (storedUserUsername === params.username) {
      isCurrentUser = true;
    }
    const userInfo = await supabase
      .from('userInfo')
      .select('*')
      .eq('username', params.username)
      .single();

    return {
      userInfo: userInfo.data,
      isCurrentUser,
    };
  } else return;
}
