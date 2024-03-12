<script lang="ts">
  import { onMount } from 'svelte';
  // import { browser } from '$app/environment';
  // @ts-ignore
  import Calendar from '@event-calendar/core';
  // @ts-ignore
  import DayGrid from '@event-calendar/day-grid';
  // @ts-ignore
  import TimeGrid from '@event-calendar/time-grid';
  import type { CalendarEvents, League } from '$lib/shared';
  import db, { supabase } from '$lib/db';
  import type { User } from '@supabase/supabase-js';
  import LoginModal from '$lib/components/LoginModal.svelte';
  import CreateLeagueModal from '$lib/components/CreateLeagueModal.svelte';
  import type { PageData } from './$types';
  import SetUsername from '$lib/components/SetUsername.svelte';
  import ForgotPassword from '$lib/components/ForgotPassword.svelte';
  import ChevronUp from '@rgossiaux/svelte-heroicons/outline/ChevronUp';
  import ChevronDown from '@rgossiaux/svelte-heroicons/outline/ChevronDown';
  import { goto } from '$app/navigation';
  import { getCurrentUser, publicEvents, storedUser } from '$lib/stores';

  const plugins = [DayGrid, TimeGrid];
  export let data: PageData;

  let setUsername = false;

  let ec: Calendar;
  let events: CalendarEvents[] = [];
  let user: User | null;
  let clientWidth: number;
  let view: string = 'timeGridWeek';

  let headerToolbar: {} = {
    start: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    end: 'today prev,next',
  };

  let showLeagueAddModal = false;
  let showLoginModal = false;
  let showForgotPassword = false;
  let isLoginMode = false;
  let loading = true;
  let ownedLeagues: League[] = [];
  let joinedLeagues: League[] = [];
  let showMoreBlurb = false;

  let options = {
    view: view,
    headerToolbar: headerToolbar,
    allDaySlot: false,
    eventClick: (e: any) => {
      linkToLeague(e);
    },
    events: events,
  };

  onMount(async () => {
    if ($storedUser) {
      $storedUser.username === null ? (setUsername = true) : (setUsername = false);
    }
    const {
      data: { subscription: authListener },
    } = await supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        user = session.user;
      }
    });

    if ($storedUser) {
      ownedLeagues = (await db.leagues.findOwned($storedUser.user_id)) ?? [];
      joinedLeagues =
        (await db.leagues.findJoined($storedUser.username, $storedUser.user_id)) ?? [];
    }

    events = $publicEvents;

    if (clientWidth <= 750) {
      view = 'timeGridDay';
      headerToolbar = {
        start: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: 'title',
        end: 'today prev,next',
      };
      options = {
        view: view,
        events: events,
        headerToolbar: headerToolbar,
        allDaySlot: false,
        eventClick: (e: any) => {
          linkToLeague(e);
        },
      };
    } else {
      view = 'timeGridWeek';
      headerToolbar = {
        start: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: 'title',
        end: 'today prev,next',
      };
      options = {
        view: view,
        events: events,
        headerToolbar: headerToolbar,
        allDaySlot: false,
        eventClick: (e: any) => {
          linkToLeague(e);
        },
      };
    }

    loading = false;

    return () => {
      authListener.unsubscribe();
    };
  });

  function linkToLeague(e: any) {
    goto('/league/' + e.event.extendedProps.leagueLink);
  }

  async function checkUsernameOnList() {
    if (user) {
      const username = await db.currentUser.currentUsername(user.id);
      if (!username) {
        setUsername = true;
      }
    }
  }

  function launchLoginModal(loginMode: boolean) {
    showLoginModal = true;
    isLoginMode = loginMode;
  }
  storedUser.subscribe(async (user) => {
    if (user) {
      ownedLeagues = (await db.leagues.findOwned(user.user_id)) ?? [];
      joinedLeagues = (await db.leagues.findJoined(user.username, user.user_id)) ?? [];
    }
  });
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
        {
          ownedLeagues;
        }
        {
          joinedLeagues;
        }
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
{#if showLeagueAddModal && user}
  <CreateLeagueModal
    open={showLeagueAddModal}
    on:close={() => (showLeagueAddModal = false)}
    {user}
  />
{/if}
{#if showForgotPassword}
  <ForgotPassword open={showForgotPassword} on:close={() => (showForgotPassword = false)} />
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

<div id="main-div" bind:clientWidth>
  <div class="flex gap-4 flex-col">
    <p class="text-4xl text-center">Welcome to GT7 Leagues</p>
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
    {:else}
      {#if user}
        <div class="mx-4 flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <p class="text-primary text-2xl">Managed Leagues</p>
            {#each ownedLeagues as league}
              <a href={'/league/' + league.leagueLink}> {league.leagueName}</a>
            {/each}
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-primary text-2xl mt-2">Joined Leagues</p>
            {#each joinedLeagues as league}
              <a href={'/league/' + league.leagueLink}> {league.leagueName}</a>
            {/each}
          </div>
          <div class="flex-row gap-12 flex-grow w-full justify-center flex mt-4">
            <button class="btn-primary" on:click={() => (showLeagueAddModal = true)}>
              Create League
            </button>
          </div>
        </div>
      {:else}
        <div
          class={showMoreBlurb
            ? 'mx-4 lg:mx-16 text-left relative body-text flex flex-col gap-2'
            : 'mx-4 lg:mx-16 max-h-14 lg:max-h-[4.5rem] overflow-hidden relative body-text flex flex-col gap-2'}
        >
          <p>
            Welcome to GT7 Leagues, your ultimate destination for organized and competitive racing
            experiences! Dive into the thrilling world of Gran Turismo 7 with our comprehensive
            league management platform. Discover a dynamic calendar featuring an array of exciting
            leagues, each with its own unique schedule and challenges.
          </p>
          <p>
            At GT7 Leagues, you have the power to take control of your racing destiny. Whether
            you're a seasoned pro or a novice driver, our platform empowers you to create or join
            leagues that match your skill level and preferences. Immerse yourself in a community of
            passionate racers who share your enthusiasm for high-speed competition.
          </p>
          <p>
            Explore individual league pages to access detailed information, including schedules,
            leaderboards, and unique league characteristics. GT7 Leagues provides a hub for
            like-minded individuals to connect, compete, and celebrate their love for virtual
            racing.
          </p>
          <p>
            Gear up for the ultimate racing experience – GT7 Leagues is not just a platform; it's a
            community where the pursuit of speed meets the joy of camaraderie. Join us on the track
            and let the thrill of competitive racing unfold!
          </p>
          {#if !showMoreBlurb}
            <span class="absolute top-8 bg-white pl-3 right-0">
              ... &nbsp; &nbsp;&nbsp;&nbsp;
            </span>
          {/if}
        </div>
        <button
          class="w-10 h-10 place-self-end -mt-4 mr-8 lg:mr-20"
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
        <div class="lg:flex-row flex-col items-center justify-center w-full flex gap-2">
          <button class="btn-primary" on:click={() => launchLoginModal(false)}> Sign Up</button>
          <button class="btn-primary lg:ml-12" on:click={() => launchLoginModal(true)}>
            Log In</button
          >
        </div>
      {/if}

      <div class="w-full">
        <div class="mt-8 mx-4 relative">
          <Calendar {plugins} {options} bind:this={ec} />
        </div>
      </div>
    {/if}
  </div>
</div>
