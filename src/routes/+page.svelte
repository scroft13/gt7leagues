<script lang="ts">
  import { onMount } from 'svelte';
  // import { browser } from '$app/environment';
  // @ts-ignore
  import Calendar from '@event-calendar/core';
  // @ts-ignore
  import DayGrid from '@event-calendar/day-grid';
  // @ts-ignore
  import TimeGrid from '@event-calendar/time-grid';
  import type { CalendarEvents, ServerEvent } from '$lib/shared';
  import db, { supabase } from '$lib/db';
  import type { User } from '@supabase/supabase-js';
  import LoginModal from '$lib/components/LoginModal.svelte';
  import CreateLeagueModal from '$lib/components/CreateLeagueModal.svelte';

  const plugins = [DayGrid, TimeGrid];
  let ec: Calendar;
  let events: CalendarEvents[] = [];
  let isPopupVisible = false;
  let user: User | null = null;
  let popupInfo: { type: string; email: string; discord: string; class: string; info: string };
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
    eventClick: (e: CustomEvent) => {
      showPopup(e);
    },
    eventMouseEnter: (e: CustomEvent) => {
      showPopup(e);
    },
    eventMouseLeave: () => {
      hidePopup();
    },
    events: events,
  };
  let showLeagueAddModal = false;
  let showLoginModal = false;
  let isLoginMode = false;
  let userx;
  $: supabase.auth.getUser().then((x) => (userx = x));

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  onMount(async () => {
    // Listen to inserts
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user;
      user = currentUser ?? null;
      console.log(user);
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
      console.log(events);
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
        eventClick: (e: CustomEvent) => {
          showPopup(e);
        },
        eventMouseEnter: (e: CustomEvent) => {
          showPopup(e);
        },
        eventMouseLeave: () => {
          hidePopup();
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
        eventClick: (e: CustomEvent) => {
          showPopup(e);
        },
        eventMouseEnter: (e: CustomEvent) => {
          showPopup(e);
        },
        eventMouseLeave: () => {
          hidePopup();
        },
      };
    }
    return () => {
      authListener?.unsubscribe();
    };
  });

  async function updateEvents(): Promise<CalendarEvents[]> {
    let tempEventList: CalendarEvents[] = [];
    await db.publicEventsList.all().then((eventList) => {
      if (eventList) {
        eventList.forEach((publicEvent: ServerEvent) => {
          console.log(publicEvent);
          const formattedDateString = publicEvent.start_date.toLocaleString('en-US', {
              timeZone: timezone,
            }),
            endDateTime = new Date(publicEvent.start_date);
          endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
          const modifiedDateString = endDateTime.toString();
          if (!publicEvent.does_repeat) {
            tempEventList.push({
              id: publicEvent.id,
              start: new Date(formattedDateString),
              end: new Date(modifiedDateString),
              title: publicEvent.title,
              extendedProps: {
                type: publicEvent.contact_type,
                email: publicEvent.email,
                discord: publicEvent.discord_server,
                class: publicEvent.vehicle_class,
                info: publicEvent.event_info,
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
                  title: publicEvent.title,
                  extendedProps: {
                    type: publicEvent.contact_type,
                    email: publicEvent.email,
                    discord: publicEvent.discord_server,
                    class: publicEvent.vehicle_class,
                    info: publicEvent.event_info,
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
    console.log(payload);
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
        title: payload.new.title,
        extendedProps: {
          type: payload.new.contact_type,
          email: payload.new.email,
          discord: payload.new.discord_server,
          class: payload.new.vehicle_class,
          info: payload.new.event_info,
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
            title: payload.new.title,
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
  function showPopup(e: CustomEvent) {
    isPopupVisible = true;
    // @ts-ignore
    popupInfo = {
      // @ts-ignore
      type: e.event.extendedProps.type,
      // @ts-ignore
      email: e.event.extendedProps.email,
      // @ts-ignore
      discord: e.event.extendedProps.discord,
      // @ts-ignore
      class: e.event.extendedProps.class,
      // @ts-ignore
      info: e.event.extendedProps.info,
    };
  }

  function hidePopup() {
    isPopupVisible = false;
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

  function launchLoginModal(loginMode: boolean) {
    showLoginModal = true;
    isLoginMode = loginMode;
  }
</script>

{#if showLoginModal}
  <LoginModal open={showLoginModal} {isLoginMode} on:close={() => (showLoginModal = false)} />
{/if}
{#if showLeagueAddModal}
  <CreateLeagueModal open={showLeagueAddModal} on:close={() => (showLeagueAddModal = false)} />
{/if}

<div id="main-div" bind:clientWidth>
  <div class="flex gap-4 flex-col items-center">
    <p class="text-primary text-4xl text-center">Welcome to GT7 Leagues</p>

    {#if user}
      <div class="w-full flex flex-col items-center gap-4">
        <p class="text-primary text-2xl text-center">My Leagues</p>
        <div class="flex-row gap-12 flex-grow w-full justify-center flex">
          <button class="btn-primary" on:click={() => (showLeagueAddModal = true)}>
            Create League
          </button>
          <button class="btn-primary" on:click={logout}> Log Out</button>
        </div>
      </div>
    {:else}
      <div class="w-full items-center justify-center flex flex-col gap-6">
        <p class="mx-4 lg:mx-16 body-text">
          Welcome to GT7 Leagues, your ultimate destination for organized and competitive racing
          experiences! Dive into the thrilling world of Gran Turismo 7 with our comprehensive league
          management platform. Discover a dynamic calendar featuring an array of exciting leagues,
          each with its own unique schedule and challenges.
        </p>
        <p class="mx-4 lg:mx-16 body-text">
          At GT7 Leagues, you have the power to take control of your racing destiny. Whether you're
          a seasoned pro or a novice driver, our platform empowers you to create or join leagues
          that match your skill level and preferences. Immerse yourself in a community of passionate
          racers who share your enthusiasm for high-speed competition.
        </p>
        <p class="mx-4 lg:mx-16 body-text">
          Explore individual league pages to access detailed information, including schedules,
          leaderboards, and unique league characteristics. GT7 Leagues provides a hub for
          like-minded individuals to connect, compete, and celebrate their love for virtual racing.
        </p>
        <p class="mx-4 lg:mx-16 body-text">
          Gear up for the ultimate racing experience – GT7 Leagues is not just a platform; it's a
          community where the pursuit of speed meets the joy of camaraderie. Join us on the track
          and let the thrill of competitive racing unfold!
        </p>
      </div>
      <div class="flex-row">
        <button class="btn-primary" on:click={() => launchLoginModal(false)}> Sign Up</button>
        <button class="btn-primary ml-12" on:click={() => launchLoginModal(true)}> Log In</button>
      </div>
    {/if}
    <!-- <div id="ec" class="mx-4 max-h-[80vh] overflow-auto w-[90vw]" />
      <div id="ec2" class="mx-4 max-h-[80vh] overflow-auto w-[90vw]" /> -->
    {#if isPopupVisible}
      <div class="popup">
        <!-- Popup content goes here -->
        <ul>
          <li>
            Contact Info:
            {#if popupInfo.type === 'Discord'}
              <a href={popupInfo.discord} target="_blank"> Discord Link</a>
            {:else}
              <a href={`mailto:${popupInfo.email}`} target="_blank"> Email Link</a>
            {/if}
          </li>
          <li>
            {popupInfo.class}
          </li>
          <li>
            {popupInfo.info}
          </li>
        </ul>
      </div>
    {/if}
  </div>
  <div class="mx-4 mt-8">
    <Calendar {plugins} {options} bind:this={ec} />
  </div>
</div>

<style lang="postcss">
  .popup {
    position: absolute;
    top: 25%;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
  }
</style>
