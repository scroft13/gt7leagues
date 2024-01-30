import { s as supabase } from "../../../../../chunks/db.js";
import { e as error } from "../../../../../chunks/index.js";
async function load({ params }) {
  const { data: leagues } = await supabase.from("leagues").select("seriesEvents").eq("shortenedName", params.league_name);
  if (params.series) {
    return {
      data: leagues,
      shortenedName: params.league_name,
      seriesName: params.series
    };
  }
  return error(404, "Not found");
}
export {
  load
};
