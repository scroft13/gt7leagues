<script lang="ts">
  import type { League, LeagueSeries } from '$lib/shared';
  import type { PageData } from './$types';

  export let data: PageData;

  let seriesInfo: LeagueSeries;
  let leagueInfo: League;
  if (data.data) {
    leagueInfo = data.data;
    let allSeries: LeagueSeries[] = leagueInfo.seriesEvents;
    seriesInfo = allSeries.filter((x) => x.name === data.seriesName)[0];
  }

  $: console.log(data.data);
</script>

<div class="mx-4 lg:mx-16 mt-4">
  <div class="flex flex-col items-center lg:items-start justify-center">
    <p class="text-primary text-xl">
      {leagueInfo.leagueName}
    </p>
    <p class="secondary-text">presents</p>
    <p class="text-primary text-2xl">
      {data.seriesName}
    </p>
  </div>
  {#if seriesInfo}
    <p class="secondary-text mt-6">
      {seriesInfo.eventDetails.eventInfo}
    </p>
    <!-- <ul>
      League Members
      <li>
        {#each seriesInfo.members as member}
          {member}
        {/each}
      </li>
      <button>Join Series</button>
    </ul> -->
  {/if}

  <p class="text-primary text-2xl">Past race results, series standing, and more coming soon!</p>
</div>
