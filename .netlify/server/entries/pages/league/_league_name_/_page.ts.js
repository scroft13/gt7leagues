import { s as supabase, d as db } from "../../../../chunks/db.js";
async function load({ params }) {
  const supabaseListener = await supabase.auth.getUser();
  const leagueInfo = await db.leagues.find(params.league_name);
  const user = supabaseListener.data.user;
  const username = await db.currentUser.currentUsername(user?.id ?? "");
  if (params.league_name && leagueInfo && user) {
    return {
      leagueLink: params.league_name,
      user,
      leagueInfo: leagueInfo[0],
      username
    };
  } else {
    return {
      redirect: true
    };
  }
}
export {
  load
};
