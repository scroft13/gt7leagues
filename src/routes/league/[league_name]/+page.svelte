<script lang="ts">
  import AddPublicEventModal from '$lib/components/AddPublicEventModal.svelte';
  import db from '$lib/db';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import type { League } from '$lib/shared';
  import type { User } from '@supabase/supabase-js';
  import { addToast } from '$lib/stores';
  import ChevronDown from '@rgossiaux/svelte-heroicons/solid/ChevronDown';
  import ChevronUp from '@rgossiaux/svelte-heroicons/solid/ChevronUp';
  import { goto } from '$app/navigation';

  export let data: PageData;
  let openEventModal = false;
  let shortenedName = data.shortenedName ?? '';
  let leagueInfo: League | null = data.leagueInfo ?? null;
  let user: User | null = data.user ?? null;
  let showMoreBlurb = false;
  let blurbTooSmall: boolean;
  let userId: string = data.user?.id ?? '';

  onMount(async () => {
    if (data.redirect) goto('/league/notfound/noLeague');
    if (leagueInfo)
      leagueInfo.leagueInfo.length > 500 ? (blurbTooSmall = false) : (blurbTooSmall = true);
  });

  async function launchAddEvent() {
    openEventModal = true;
  }

  async function joinLeague() {
    db.leagues.join(shortenedName, data.username ?? '').then(() => {
      if (leagueInfo)
        addToast({
          type: 'success',
          message: 'You have joined ' + leagueInfo.leagueName + '. Good Racing!',
          id: Math.floor(Math.random() * 10000),
        });
    });
  }

  async function addMessage() {
    console.log('add message');
  }

  $: console.log(leagueInfo);
</script>

{#if openEventModal}
  <AddPublicEventModal
    open={openEventModal}
    on:close={() => {
      openEventModal = false;
    }}
    leagueName={leagueInfo?.leagueAcronym ?? ''}
    {shortenedName}
    {userId}
  />
{/if}
{#if leagueInfo && user}
  <div class="flex flex-col items-center gap-6 mx-4 lg:mx-16">
    <p class="text-primary text-4xl text-center">Welcome to {leagueInfo.leagueName}</p>
    {#if !blurbTooSmall}
      <p
        class={showMoreBlurb
          ? 'mx-2 text-left relative'
          : 'mx-2 max-h-[4.5rem] overflow-hidden relative'}
      >
        {leagueInfo.leagueInfo}
        {#if !showMoreBlurb}
          <span class="absolute top-12 bg-white pl-1 right-0"> ... &nbsp; &nbsp;&nbsp;&nbsp; </span>
        {/if}
      </p>
      <button
        class="w-10 h-10 place-self-end -mt-6"
        on:click={() => {
          showMoreBlurb = !showMoreBlurb;
        }}
      >
        {#if showMoreBlurb}
          <ChevronUp class="text-blue-500" />
        {:else}
          <ChevronDown class="text-blue-500" />
        {/if}
      </button>
    {:else}
      <p class={'mx-2 text-left relative'}>
        {leagueInfo.leagueInfo}
      </p>
    {/if}
    {#if leagueInfo.members.find((x) => x.username === data.username)}
      <p class="secondary-text italic">Your are a member of this league</p>
    {/if}
    <p class="text-lg font-semibold main-text text-center lg:text-left w-full">League Series</p>
    {#if leagueInfo.seriesEvents.length > 0}
      {#each leagueInfo.seriesEvents as series}
        <a href="/league/{shortenedName}/{series.name}">{series.name}</a>
      {/each}
    {:else}
      <p class="secondary-text">You currently don't have any series scheduled</p>
    {/if}
    <p class="text-lg font-semibold main-text text-center lg:text-left w-full">Single Events</p>
    {#if leagueInfo.singleEvents.length > 0}
      {#each leagueInfo.singleEvents as event}
        {event.title}
      {/each}
    {:else}
      <p class="secondary-text">You currently don't have any single event scheduled</p>
    {/if}

    {#if user.id === leagueInfo.ownerId}
      <button on:click={() => launchAddEvent()} class="btn-primary">Add Event</button>
    {:else if !leagueInfo.members.find((x) => x.username === data.username)}
      <button on:click={() => joinLeague()} class="btn-primary">Join League</button>
    {/if}
    <p class="text-lg font-semibold main-text text-center lg:text-left w-full">League Messages</p>
    {#each leagueInfo.posts as post}
      <p>{post.username}, {post.message}</p>
    {/each}
    {#if user.id === leagueInfo.ownerId}
      <button on:click={() => addMessage()} class="btn-primary">Add Message</button>
    {:else if leagueInfo.members.find((x) => x.username === data.username)}
      <button on:click={() => addMessage()} class="btn-primary">Add Message</button>
    {/if}

    <p class="text-lg font-semibold main-text text-center lg:text-left w-full">Members</p>
    {#each leagueInfo.members as member}
      <a href="/user/{member.username}">{member.username}, {member.role}</a>
    {/each}
  </div>
{:else}
  <div class="w-full">
    <div class="h-20 my-2 mx-4">
      <div class="skeleton-block" />
    </div>
  </div>
  <div class="w-full">
    <div class="h-20 my-1 mx-4">
      <div class="skeleton-block" />
    </div>
  </div>
  <div class="w-full">
    <div class="h-[500px] lg:h-[1200px] my-2 mx-4">
      <div class="skeleton-block" />
    </div>
  </div>
{/if}
