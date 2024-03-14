<script lang="ts">
  import AddPublicEventModal from '$lib/components/AddPublicEventModal.svelte';
  import db from '$lib/db';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import type { League } from '$lib/shared';
  import { addToast, getCurrentUser, storedUser } from '$lib/stores';
  import ChevronDown from '@rgossiaux/svelte-heroicons/solid/ChevronDown';
  import ChevronUp from '@rgossiaux/svelte-heroicons/solid/ChevronUp';
  import NewMessageModal from '$lib/components/leagueMessageModal.svelte';
  import { marked } from 'marked';
  import { displayDateNumerical, displayTime } from '$lib/formatters';
  import LoginModal from '$lib/components/LoginModal.svelte';
  import type { User } from '@supabase/supabase-js';
  import ForgotPassword from '$lib/components/ForgotPassword.svelte';
  import SetUsername from '$lib/components/SetUsername.svelte';

  export let data: PageData;
  let openEventModal = false;
  let openMessageModal = false;
  let leagueLink = data.leagueLink ?? '';
  let leagueInfo: League | null = data.leagueInfo ?? null;
  let showMoreBlurb = true;
  let showPastSingleEvents = false;
  let blurbTooSmall = true;
  let leagueRole: 'Manager' | 'Racer';
  let leagueInfoDiv: HTMLParagraphElement;
  let loading = true;
  let showLoginModal = false;
  let isLoginMode = false;
  let showForgotPassword = false;
  let setUsername = false;
  let user: User | null;

  onMount(async () => {
    if (leagueInfo && $storedUser) {
      if (leagueInfoDiv?.clientHeight > 150) {
        blurbTooSmall = false;
        showMoreBlurb = false;
      } else {
        blurbTooSmall = true;
      }
      if ($storedUser?.user_id === leagueInfo.ownerId) {
        leagueRole = 'Manager';
      } else if (leagueInfo.members.find((x) => x.username === $storedUser?.username)) {
        leagueRole = 'Racer';
      }
    }
    loading = false;
  });

  async function launchAddEvent() {
    openEventModal = true;
  }

  async function joinLeague() {
    db.leagues.join(leagueLink, $storedUser?.username ?? '', 'Racer').then(() => {
      if (leagueInfo)
        addToast({
          type: 'success',
          message: 'You have joined ' + leagueInfo.leagueName + '. Good Racing!',
          id: Math.floor(Math.random() * 10000),
        });
    });
  }

  function launchLoginModal(loginMode: boolean) {
    showLoginModal = true;
    isLoginMode = loginMode;
  }

  async function checkUsernameOnList() {
    if (user) {
      const username = await db.currentUser.currentUsername(user.id);
      if (!username) {
        setUsername = true;
      }
    }
  }

  async function addMessage() {
    openMessageModal = true;
  }
</script>

{#if showLoginModal}
  <LoginModal
    open={showLoginModal}
    {isLoginMode}
    on:close={async (data) => {
      if (data.detail.user) {
        const currentUser = await getCurrentUser();

        storedUser.update(() => {
          return currentUser;
        });
        showLoginModal = false;
        user = data.detail.user;

        checkUsernameOnList();
      } else {
        showLoginModal = false;
        return;
      }
    }}
    on:forgotPassword={() => {
      showLoginModal = false;
      showForgotPassword = true;
    }}
  />
{/if}
{#if showForgotPassword}
  <ForgotPassword open={showForgotPassword} on:close={() => (showForgotPassword = false)} />
{/if}

{#if openEventModal}
  <AddPublicEventModal
    open={openEventModal}
    on:close={() => {
      openEventModal = false;
    }}
    leagueName={leagueInfo?.leagueAcronym ?? ''}
    {leagueLink}
    userId={$storedUser?.user_id ?? ''}
  />
{/if}
{#if openMessageModal && leagueInfo && $storedUser}
  <NewMessageModal
    open={openMessageModal}
    on:close={() => {
      openMessageModal = false;
    }}
    type="League"
    {leagueInfo}
    username={$storedUser.username}
    {leagueRole}
  />
{/if}
{#if user && setUsername}
  <SetUsername
    open={setUsername}
    on:close={() => {
      setUsername = false;
      checkUsernameOnList();
    }}
    usernameList={data.usernameList}
  />
{/if}
{#if loading}
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
{:else if leagueInfo}
  <div class="flex flex-col items-center mx-4 lg:mx-16">
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
    {#if leagueInfo.members.find((x) => x.username === $storedUser?.username)}
      <p class="secondary-text italic mt-4">Your are a member of this league</p>
    {/if}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-4">
      League Series
    </p>
    {#if leagueInfo.seriesEvents.length > 0}
      {#each leagueInfo.seriesEvents as series}
        <a
          href="/league/{leagueLink}/{series.name}"
          class="flex w-full gap-2 justify-evenly flex-col lg:flex-row border p-2 rounded mt-2"
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
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-8">
      Single Events
    </p>
    <p class="text-lg font-semibold secondary-text text-center lg:text-left w-full mt-2">Current</p>

    {#if leagueInfo.singleEvents.length > 0}
      {#each leagueInfo.singleEvents as event}
        {#if event.startDate >= new Date()}
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
        {/if}
      {/each}

      <p class="text-lg font-semibold secondary-text text-center lg:text-left w-full mt-2">Past</p>
      <button
        class="w-10 h-10 place-self-end -mt-8 lg:mr-20"
        on:click={() => {
          showPastSingleEvents = !showPastSingleEvents;
        }}
      >
        {#if showPastSingleEvents}
          <ChevronUp class="text-blue-500" />
        {:else}
          <ChevronDown class="text-blue-500" />
        {/if}
      </button>
      {#if showPastSingleEvents}
        {#each leagueInfo.singleEvents as event}
          {#if new Date(event.startDate) < new Date()}
            <div
              class="flex flex-col lg:grid lg:grid-cols-checkout w-full gap-2 justify-evenly border lg:border-0 p-2 lg:p-0 rounded shadow-md lg:shadow-none mb-3"
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
          {/if}
        {/each}
      {/if}
    {:else}
      <p class="secondary-text">There are currently not any single events scheduled</p>
    {/if}
    {#if $storedUser}
      {#if $storedUser.user_id === leagueInfo.ownerId}
        <button on:click={() => launchAddEvent()} class="btn-primary mt-4">Add Event</button>
      {:else if !leagueInfo.members.find((x) => x.username === $storedUser?.username)}
        <button on:click={() => joinLeague()} class="btn-primary">Join League</button>
      {/if}
      <p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-8 mb-2">
        League Messages
      </p>
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
      {#if $storedUser.user_id === leagueInfo.ownerId}
        <button on:click={() => addMessage()} class="btn-primary mt-6">Add Message</button>
      {:else if leagueInfo.members.find((x) => x.username === $storedUser?.username)}
        <button on:click={() => addMessage()} class="btn-primary mt-6">Add Message</button>
      {/if}
      <p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-6 mb-2">
        Members
      </p>
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
    {:else}
      <p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-12 mb-2">
        Interested in learning more? Join today!
      </p>
      <div class="lg:flex-row flex-col items-center justify-center w-full flex gap-2 mt-6">
        <button class="btn-primary" on:click={() => launchLoginModal(false)}> Sign Up</button>
        <button class="btn-primary lg:ml-12" on:click={() => launchLoginModal(true)}>
          Log In</button
        >
      </div>
    {/if}
  </div>
{/if}
