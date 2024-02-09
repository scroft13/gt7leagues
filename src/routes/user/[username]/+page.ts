import db, { supabase } from '$lib/db.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.username) {
    const { data } = await db.currentUser.getUserPic(params.username);
    const user = await supabase.auth.getUser();
    let currentUserInfo;
    let isCurrentUser = false;
    if (user.data?.user) {
      currentUserInfo = await db.currentUser.getUserInfo(user.data.user.id);
    }
    if (currentUserInfo?.data.username === params.username) {
      isCurrentUser = true;
    }

    return {
      user,
      userImageUrl: data?.imageUrl,
      username: params.username,
      isCurrentUser,
    };
  }

  error(404, 'Not found');
}
