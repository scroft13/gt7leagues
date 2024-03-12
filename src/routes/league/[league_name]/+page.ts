import db from '$lib/db.js';
import type { League } from '$lib/shared.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const leagueInfo: League[] | void = await db.leagues.find(params.league_name);
  const data = await db.currentUser.getUsernameList();
  let usernameList;
  if (data) {
    usernameList = data.map((x) => {
      if (x) {
        return x;
      } else return '';
    });
  }

  if (params.league_name && leagueInfo) {
    return {
      leagueLink: params.league_name,
      leagueInfo: leagueInfo[0],
      usernameList,
    };
  } else {
    return {
      redirect: true,
      usernameList,
    };
  }
}
