import { supabase } from '$lib/db.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { data: leagues } = await supabase
    .from('leagues')
    .select('seriesEvents')
    .eq('leagueLink', params.league_name);
  if (params.series) {
    return {
      data: leagues,
      leagueLink: params.league_name,
      seriesName: params.series,
    };
  }
  return error(404, 'Not found');
}
