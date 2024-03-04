import db, { supabase } from '$lib/db.js';
import { storedUser } from '$lib/stores.js';
import { error } from '@sveltejs/kit';

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
  }

  error(404, 'Not found');
}
