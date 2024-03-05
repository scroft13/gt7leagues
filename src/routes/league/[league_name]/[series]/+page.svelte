<script lang="ts">
  import type { League, LeagueSeries } from '$lib/shared';
  import { storedUser, publicEvents } from '$lib/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  let seriesInfo: LeagueSeries;
  let leagueInfo: League;
  if (data.data) {
    leagueInfo = data.data;
    let multipleSeries: LeagueSeries[] = leagueInfo.seriesEvents;
    seriesInfo = multipleSeries.filter((x) => x.name === data.seriesName)[0];
  }

  $: console.log($publicEvents, $storedUser, seriesInfo);
</script>

<h1>
  {data.seriesName}
</h1>
{#if seriesInfo}
  <p>
    {seriesInfo.eventDetails.eventInfo}
  </p>
  <ul>
    League Members
    <li>
      {#each seriesInfo.members as member}
        {member}
      {/each}
    </li>
    <button>Join Series</button>
  </ul>
{/if}
