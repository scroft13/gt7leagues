<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: PageData;
  import AddPublicEventModal from '$lib/components/AddPublicEventModal.svelte';
  import db, { supabase } from '$lib/db';
  import { onMount } from 'svelte';
  // import type {League } from '$lib/shared';
  import type { PageData } from './$types';
  import type { League } from '$lib/shared';
  import TableGrid from '$lib/components/tables/TableGrid.svelte';
  import TableHeader from '$lib/components/tables/TableHeader.svelte';
  import MobileTableHeader from '$lib/components/tables/MobileTableHeader.svelte';
  import MobileTableGrid from '$lib/components/tables/MobileTableGrid.svelte';
  import { displayDateNumerical } from '$lib/formatters';
  import type { User, UserResponse } from '@supabase/supabase-js';
  import { addToast } from '$lib/stores';
  import ChevronDoubleDown from '@rgossiaux/svelte-heroicons/outline/ChevronDoubleDown';

  let openEventModal = false;
  let shortenedName = data.shortenedName ?? '';
  let leagueInfo: League = {
    leagueName: '',
    leagueAcronym: '',
    events: [],
    contactMethod: 'Email',
    leagueInfo: '',
    email: '',
    discordServer: '',
    contactName: '',
    hasMembers: false,
    ownerId: '',
    mainLocation: '',
    memberIds: [],
    shortenedName: '',
    series: [],
  };

  let supabaseListener: UserResponse;
  let user: User | null;

  let showMoreBlurb = false;

  onMount(async () => {
    let leagueArray = await db.leagues.find(shortenedName);
    if (leagueArray) leagueInfo = leagueArray[0];
    supabaseListener = await supabase.auth.getUser();
    user = supabaseListener.data.user;
    console.log(leagueInfo);
  });

  async function launchAddEvent() {
    openEventModal = true;
  }

  async function joinLeague() {
    db.leagues.join(shortenedName).then((x) => {
      console.log(x);
      addToast({
        id: Math.floor(Math.random() * 100),
        dismissible: true,
        timeout: 2000,
        type: 'success',
        message: 'You have joined ' + leagueInfo.leagueName + '. Good Racing!',
      });
    });
  }
  console.log(data);
</script>

{#if openEventModal}
  <AddPublicEventModal
    open={openEventModal}
    on:close={() => {
      openEventModal = false;
    }}
    leagueName="shortenedName"
  />
{/if}
<div class="flex flex-col items-center gap-6">
  <p class="text-primary text-4xl text-center">Welcome to {leagueInfo.leagueName}</p>
  <p
    class={showMoreBlurb
      ? 'line-clamp-4 text-left font-semibold relative'
      : ' mx-2 h-[4.5rem] overflow-hidden relative'}
  >
    {leagueInfo.leagueInfo}
    {#if !showMoreBlurb}
      <span class="absolute top-12 bg-white pl-1 right-0"> ... &nbsp; &nbsp;&nbsp;&nbsp; </span>
      <button class="w-5 h-5"><ChevronDoubleDown /></button>
    {/if}
  </p>
  <p class="text-lg font-semibold main-text text-center lg:text-left w-full">League Events</p>
  <TableHeader headerTailwindCode={'listed-offers'}>
    <p>Title</p>
    <p>Address</p>
    <p class="text-center">Price</p>
    <p class="text-center">QTY</p>
    <p class="text-center">Expires</p>
    <p class="text-center">Status</p>
    <p class="text-center">Action</p>
  </TableHeader>
  {#each leagueInfo.events as event, index}
    <TableGrid headerTailwindCode={'listed-offers'} {index}>
      <div class="flex flex-row gap-3 items-center pr-3 -my-5">{event.title}</div>
      <p class={'secondary-text whitespace-nowrap overflow-hidden'}>asdf</p>
    </TableGrid>
  {/each}
  <MobileTableHeader headerTailwindCode={'4'}>
    <p>Date</p>
    <p class="text-center">Time</p>
    <p class="text-center">Series</p>
    <p class="text-center">Vehicle Class</p>
  </MobileTableHeader>
  {#each leagueInfo.events as event, index}
    <MobileTableGrid headerTailwindCode={'4'} {index}>
      <p>{displayDateNumerical(event.startDate)}</p>

      <p class="text-center line-clamp-1">{event.eventInfo}</p>
    </MobileTableGrid>
  {/each}
  {#if user && user.id === leagueInfo.ownerId}
    <div class="w-20">
      <button on:click={() => launchAddEvent()} class="btn-primary">Add Event</button>
    </div>
  {:else if leagueInfo.memberIds.find((x) => x === user?.email ?? 'aaa')}
    Your are a member of this league
  {:else}
    <button on:click={() => joinLeague()} class="btn-primary">Join League</button>
  {/if}
</div>
