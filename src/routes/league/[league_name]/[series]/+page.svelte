<script lang="ts">
  import type { League, LeagueSeries } from '$lib/shared';
  import type { PageData } from './$types';

  export let data: PageData;

  let seriesInfo: LeagueSeries;
  let leagueInfo: League;
  if (data.data) {
    leagueInfo = data.data;
    let multipleSeries: LeagueSeries[] = leagueInfo.seriesEvents;
    seriesInfo = multipleSeries.filter((x) => x.name === data.seriesName)[0];
    console.log(seriesInfo, seriesInfo.eventDetails);
  }
</script>

<h1>
  {data.seriesName}
</h1>
<p>
  {seriesInfo.eventDetails.eventInfo}
</p>
