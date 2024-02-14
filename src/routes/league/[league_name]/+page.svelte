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
  import NewMessageModal from '$lib/components/NewMessageModal.svelte';
  import { marked } from 'marked';
  import { displayDateNumerical, displayTime } from '$lib/formatters';

  export let data: PageData;
  let openEventModal = false;
  let openMessageModal = false;
  let leagueLink = data.leagueLink ?? '';
  let leagueInfo: League | null = data.leagueInfo ?? null;
  let user: User | null = data.user ?? null;
  let showMoreBlurb = true;
  let blurbTooSmall: boolean = true;
  let userId: string = data.user?.id ?? '';
  let leagueRole: 'Manager' | 'Racer';
  let leagueInfoDiv: HTMLParagraphElement;

  onMount(async () => {
    if (data.redirect) goto('/league/notfound/noLeague');
    if (leagueInfo && data.user) {
      if (leagueInfoDiv.clientHeight > 150) {
        blurbTooSmall = false;
        showMoreBlurb = false;
      } else {
        blurbTooSmall = true;
      }
      if (data.user.id === leagueInfo.ownerId) {
        leagueRole = 'Manager';
      } else if (leagueInfo.members.find((x) => x.username === data.username)) {
        leagueRole = 'Racer';
      }
    }
  });

  async function launchAddEvent() {
    openEventModal = true;
  }

  async function joinLeague() {
    db.leagues.join(leagueLink, data.username ?? '', 'Racer').then(() => {
      if (leagueInfo)
        addToast({
          type: 'success',
          message: 'You have joined ' + leagueInfo.leagueName + '. Good Racing!',
          id: Math.floor(Math.random() * 10000),
        });
    });
  }

  async function addMessage() {
    openMessageModal = true;
  }
</script>

{#if openEventModal}
  <AddPublicEventModal
    open={openEventModal}
    on:close={() => {
      openEventModal = false;
    }}
    leagueName={leagueInfo?.leagueAcronym ?? ''}
    {leagueLink}
    {userId}
  />
{/if}
{#if openMessageModal && leagueInfo && user && data.username}
  <NewMessageModal
    open={openMessageModal}
    on:close={() => {
      openMessageModal = false;
    }}
    type="League"
    {leagueInfo}
    {user}
    username={data.username}
    {leagueRole}
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
      <p class={'mx-2 text-left relative'} bind:this={leagueInfoDiv}>
        {leagueInfo.leagueInfo}
      </p>
    {/if}
    {#if leagueInfo.members.find((x) => x.username === data.username)}
      <p class="secondary-text italic">Your are a member of this league</p>
    {/if}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">League Series</p>
    {#if leagueInfo.seriesEvents.length > 0}
      {#each leagueInfo.seriesEvents as series}
        <a
          href="/league/{leagueLink}/{series.name}"
          class="flex w-full gap-2 justify-evenly flex-col lg:flex-row border lg:border-0 p-2 lg:p-0 rounded shadow-md  lg:shadow-none"
        >
          <p class="font-bold text-lg">{series.name}</p>
          <div class="flex flex-col gap-[1px]">
            <p class="italic font-medium secondary-text">
              {displayDateNumerical(series.eventDetails.startDate ?? new Date())} - {displayDateNumerical(
                series.eventDetails.endDate ?? new Date(),
              )}
            </p>
            <p class="italic font-medium secondary-text">
              {displayTime(series.eventDetails.startDate ?? new Date())}
            </p>
            <p class="italic font-medium secondary-text">
              Vehicle Class: {series.eventDetails.vehicleClass}
            </p>
          </div>
          <p class="text-lg">
            {series.eventDetails.eventInfo}
          </p>
        </a>
      {/each}
    {:else}
      <p class="secondary-text">There are currently not any series scheduled</p>
    {/if}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">Single Events</p>
    {#if leagueInfo.singleEvents.length > 0}
      {#each leagueInfo.singleEvents as event}
        <div
          class="flex flex-col lg:grid lg:grid-cols-checkout w-full gap-2 justify-evenly border lg:border-0 p-2 lg:p-0 rounded shadow-md lg:shadow-none"
        >
          <p class="font-bold text-lg">
            {event.singleEventTitle}
          </p>
          <div class="flex flex-col gap-[1px]">
            <p class="italic font-medium secondary-text">
              {displayDateNumerical(event.startDate)}
            </p>
            <p class="italic font-medium secondary-text">
              {displayTime(event.startDate)}
            </p>
            <p class="italic font-medium secondary-text">
              {event.vehicleClass}
            </p>
          </div>
          <p class="text-lg">
            {event.eventInfo}
          </p>
        </div>
      {/each}
    {:else}
      <p class="secondary-text">There are currently not any single events scheduled</p>
    {/if}

    {#if user.id === leagueInfo.ownerId}
      <button on:click={() => launchAddEvent()} class="btn-primary">Add Event</button>
    {:else if !leagueInfo.members.find((x) => x.username === data.username)}
      <button on:click={() => joinLeague()} class="btn-primary">Join League</button>
    {/if}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">League Messages</p>
    {#each leagueInfo.posts as post}
      <div class="text-left w-full border p-2 rounded flex gap-6 flex-col lg:flex-row shadow-md">
        <div class="font-bold flex lg:flex-col gap-2 flex-wrap">
          <p>
            {post.username}
          </p>
          <p>
            {displayDateNumerical(post.date)}
          </p>
          <p>
            {displayTime(post.date)}
          </p>
        </div>
        <div class="font-normal inline-table">
          {@html marked(JSON.parse(post.message))}
        </div>
      </div>
    {/each}
    {#if user.id === leagueInfo.ownerId}
      <button on:click={() => addMessage()} class="btn-primary">Add Message</button>
    {:else if leagueInfo.members.find((x) => x.username === data.username)}
      <button on:click={() => addMessage()} class="btn-primary">Add Message</button>
    {/if}

    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">Members</p>
    <div class="flex gap-x-6 gap-y-2 w-full flex-row flex-wrap mb-20">
      {#each leagueInfo.members as member}
        <a href="/user/{member.username}" class="flex gap-x-2 border rounded p-2">
          <p class="text-bold">{member.username}</p>
          <p class={member.role === 'Manager' ? 'text-red-500' : ''}>
            {member.role}
          </p>
        </a>
      {/each}
    </div>
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
