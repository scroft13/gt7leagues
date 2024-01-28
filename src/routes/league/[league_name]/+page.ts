import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.league_name) {
    return {
      leagueName: params.league_name,
    };
  }
  return error(404, 'Not found');
}
