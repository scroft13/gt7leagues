import db, { supabase } from '$lib/db.js';
import type { League } from '$lib/shared.js';
import type { User } from '@supabase/supabase-js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const supabaseListener = await supabase.auth.getUser();
  const leagueInfo: League[] | void = await db.leagues.find(params.league_name);
  const user: User | null = supabaseListener.data.user;
  const username: string = await db.users.currentUsername(user?.id ?? '');

  if (params.league_name && leagueInfo && user) {
    return {
      leagueLink: params.league_name,
      user: user,
      leagueInfo: leagueInfo[0],
      username: username,
    };
  } else {
    return {
      redirect: true,
    };
  }
}
