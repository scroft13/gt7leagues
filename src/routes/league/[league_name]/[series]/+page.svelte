<script lang="ts">
  import type { League, LeagueSeries } from '$lib/shared';
  import type { PageData } from './$types';

  export let data: PageData;

  let seriesInfo: LeagueSeries;
  let leagueInfo: League;
  if (data.data) {
    leagueInfo = data.data[0];
    let multipleSeries: LeagueSeries[] = leagueInfo.seriesEvents;
    seriesInfo = multipleSeries.filter((x) => x.name === data.seriesName)[0];
  }
</script>

{data.seriesName}
{data}
{seriesInfo}
