import { supabase } from '$lib/db.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { data: leagues } = await supabase
    .from('leagues')
    .select('*')
    .eq('leagueLink', params.league_name)
    .single();
  if (params.series) {
    return {
      data: leagues,
      leagueLink: params.league_name,
      seriesName: params.series,
    };
  }
  return error(404, 'Not found');
}
