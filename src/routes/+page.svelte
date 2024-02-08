<script lang="ts">
  import { onMount } from 'svelte';
  // import { browser } from '$app/environment';
  // @ts-ignore
  import Calendar from '@event-calendar/core';
  // @ts-ignore
  import DayGrid from '@event-calendar/day-grid';
  // @ts-ignore
  import TimeGrid from '@event-calendar/time-grid';
  import type { CalendarEvents, League, ServerEvent } from '$lib/shared';
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

  const plugins = [DayGrid, TimeGrid];
  export let data: PageData;

  let setUsername = false;

  let ec: Calendar;
  let events: CalendarEvents[] = [];
  let user: User;
  let clientWidth: number;
  let view: string = 'timeGridWeek';

  let headerToolbar: {} = {
    start: 'dayGridMonth,timeGridWeek,timeGridDay',
    center: 'title',
    end: 'today prev,next',
  };
  let options = {
    view: view,
    headerToolbar: headerToolbar,
    allDaySlot: false,
    eventClick: (e: any) => {
      linkToLeague(e);
    },
    events: events,
  };
  let showLeagueAddModal = false;
  let showLoginModal = false;
  let showForgotPassword = false;
  let isLoginMode = false;
  let loading = true;
  let ownedLeagues: League[] = [];
  let joinedLeagues: League[] = [];
  let showMoreBlurb = false;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  onMount(async () => {
    data.username === null ? (setUsername = true) : (setUsername = false);
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        user = session.user;
      }
    });

    supabase
      .channel('publicEvents')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'publicEvents' },
        handleInserts,
      )
      .subscribe();
    events = await updateEvents();
    if (clientWidth <= 750) {
      view = 'timeGridDay';
      headerToolbar = {
        start: '',
        center: ' dayGridMonth,timeGridWeek,timeGridDay title today,prev,next',
        end: '',
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
    if (user) {
      ownedLeagues = (await db.leagues.findOwned(user.id)) ?? [];
      joinedLeagues = (await db.leagues.findJoined(data.username ?? '', user.id)) ?? [];
    }
    loading = false;
    return () => {
      authListener?.unsubscribe();
    };
  });

  async function updateEvents(): Promise<CalendarEvents[]> {
    let tempEventList: CalendarEvents[] = [];
    await db.publicEventsList.all().then((eventList) => {
      if (eventList) {
        console.log(eventList);
        eventList.forEach((publicEvent: ServerEvent) => {
          const formattedDateString = publicEvent.start_date?.toLocaleString('en-US', {
              timeZone: timezone,
            }),
            endDateTime = new Date(publicEvent.start_date);
          endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
          const modifiedDateString = endDateTime.toString();
          if (!publicEvent.is_series) {
            console.log(publicEvent);
            tempEventList.push({
              id: publicEvent.id,
              start: new Date(formattedDateString),
              end: new Date(modifiedDateString),
              title: publicEvent.singleEventName ?? '' + publicEvent.leagueName,
              extendedProps: {
                leagueLink: publicEvent.leagueLink,
              },
              backgroundColor: generateRandomColor(),
            });
          } else {
            if (publicEvent.end_date) {
              let datesArray = generateDatesWithInterval(
                new Date(publicEvent.start_date),
                new Date(publicEvent.end_date),
                7,
              );
              let eventsArray = datesArray.map((publicEventArrayItem, i) => {
                const formattedDateString = publicEventArrayItem.toLocaleString('en-US', {
                    timeZone: timezone,
                  }),
                  endDateTime = new Date(publicEventArrayItem);
                endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
                const modifiedDateString = endDateTime.toString();
                return {
                  id: publicEvent.id + i,
                  start: new Date(formattedDateString),
                  end: new Date(modifiedDateString),
                  title: publicEvent.series + publicEvent.leagueName,
                  extendedProps: {
                    leagueLink: publicEvent.leagueLink,
                  },
                  backgroundColor: generateRandomColor(),
                };
              });
              eventsArray.forEach((x) => {
                tempEventList.push(x);
              });
            } else null;
          }
        });
      }
    });
    return tempEventList;
  }

  const handleInserts = (payload: any) => {
    if (!payload.new.does_repeat) {
      const formattedDateString = payload.new.start_date.toLocaleString('en-US', {
          timeZone: timezone,
        }),
        endDateTime = new Date(payload.new.start_date);
      endDateTime.setHours(endDateTime.getHours() + payload.new.duration_hrs);
      const modifiedDateString = endDateTime.toString();
      events.push({
        id: payload.new.id,
        start: new Date(formattedDateString),
        end: new Date(modifiedDateString),
        title: payload.new.singleEventName ?? '' + payload.new.leagueName,
        extendedProps: {
          leagueLink: payload.leagueLink,
        },
        backgroundColor: generateRandomColor(),
      });
    } else {
      if (payload.new.end_date) {
        let datesArray = generateDatesWithInterval(
          new Date(payload.new.start_date),
          new Date(payload.new.end_date),
          7,
        );
        let eventsArray = datesArray.map((publicEventArrayItem, i) => {
          const formattedDateString = publicEventArrayItem.toLocaleString('en-US', {
              timeZone: timezone,
            }),
            endDateTime = new Date(publicEventArrayItem);
          endDateTime.setHours(endDateTime.getHours() + payload.new.duration_hrs);
          const modifiedDateString = endDateTime.toString();
          return {
            id: payload.new.id + i,
            start: new Date(formattedDateString),
            end: new Date(modifiedDateString),
            title: payload.new.series + payload.new.leagueName,
            extendedProps: {
              type: payload.new.contact_type,
              email: payload.new.email,
              discord: payload.new.discord_server,
              class: payload.new.vehicle_class,
              info: payload.new.event_info,
            },
            backgroundColor: generateRandomColor(),
          };
        });
        eventsArray.forEach((x) => {
          events.push(x);
        });
      } else null;

      ec.updateEvents();
    }

    const existingCalendar = document.getElementById('ec');
    if (existingCalendar) {
      existingCalendar.remove();
    }
  };

  function generateDatesWithInterval(startDate: Date, endDate: Date, intervalDays: number) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + intervalDays);
    }
    return dates;
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  function generateRandomColor() {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Calculate brightness using the formula: 0.299*R + 0.587*G + 0.114*B
    const brightness = 0.299 * red + 0.587 * green + 0.114 * blue;

    // Choose whether to make the color lighter or darker based on brightness
    const isLightColor = brightness > 100;

    // Adjust brightness to ensure good contrast with white text
    const adjustValue = isLightColor ? -50 : 50;

    // Apply the adjustment to each color component
    const adjustedRed = clamp(red + adjustValue, 0, 255);
    const adjustedGreen = clamp(green + adjustValue, 0, 255);
    const adjustedBlue = clamp(blue + adjustValue, 0, 255);

    // Return the RGB string
    return `rgba(${adjustedRed}, ${adjustedGreen}, ${adjustedBlue}, .8)`;
  }

  function linkToLeague(e: any) {
    console.log(e.event.extendedProps);
    goto('/league/' + e.event.extendedProps.leagueLink);
  }

  async function logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  }

  async function checkUsernameOnList() {
    if (user) {
      const username = await db.users.currentUsername(user.id);
      if (!username) {
        setUsername = true;
      }
    }
  }

  function launchLoginModal(loginMode: boolean) {
    showLoginModal = true;
    isLoginMode = loginMode;
  }
</script>

{#if showLoginModal}
  <LoginModal
    open={showLoginModal}
    {isLoginMode}
    on:close={async (data) => {
      showLoginModal = false;
      console.log(data.detail.user);
      user = data.detail.user;
      ownedLeagues = (await db.leagues.findOwned(user.id)) ?? [];
      joinedLeagues = (await db.leagues.findJoined(user.email ?? '', user.id)) ?? [];
      checkUsernameOnList();
    }}
    on:forgotPassword={() => {
      showLoginModal = false;
      showForgotPassword = true;
    }}
  />
{/if}
{#if showLeagueAddModal}
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
  <div class="flex gap-4 flex-col ">
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
            <button class="btn-primary" on:click={logout}> Log Out</button>
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
          class="w-10 h-10 place-self-end -mt-4 mr-8 lg:mr-20 "
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

      <div class="w-full felx-grow">
        <div class="mt-8 mx-4 relative">
          <Calendar {plugins} {options} bind:this={ec} />
        </div>
      </div>
    {/if}
  </div>
</div>
