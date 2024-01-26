<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
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

  let ec: Calendar;
  let events: CalendarEvents[] = [];
  let isPopupVisible = false;

  let popupInfo: { type: string; email: string; discord: string; class: string; info: string };

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
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  onMount(async () => {
    // Listen to inserts
    supabase
      .channel('publicEvents')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'publicEvents' },
        handleInserts,
      )
      .subscribe();
    await db.publicEventsList.all().then((eventList) => {
      if (eventList) {
        eventList.forEach((publicEvent: ServerEvent) => {
          const formattedDateString = publicEvent.start_date.toLocaleString('en-US', {
              timeZone: timezone,
            }),
            endDateTime = new Date(publicEvent.start_date);
          endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
          const modifiedDateString = endDateTime.toString();
          if (!publicEvent.does_repeat) {
            events.push({
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
                events.push(x);
              });
            } else null;
          }
        });
      }
    });
    ec = new Calendar({
      target: browser && document.getElementById('ec'),
      props: {
        plugins: [DayGrid, TimeGrid],
        options: {
          view: 'timeGridWeek',
          events: events,
          headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            end: 'today prev,next',
          },
          eventClick: (e: CustomEvent) => {
            showPopup(e);
          },
          eventMouseEnter: (e: CustomEvent) => {
            showPopup(e);
          },
          eventMouseLeave: () => {
            hidePopup();
          },
        },
      },
    });

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user;
      user = currentUser ?? null;
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  // Create a function to handle inserts
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
      // TODO add weekly repeats to listener
    }

    const existingCalendar = document.getElementById('ec');
    if (existingCalendar) {
      existingCalendar.remove();
    }

    ec = new Calendar({
      target: browser && document.getElementById('ec2'),
      props: {
        plugins: [DayGrid, TimeGrid],
        options: {
          view: 'timeGridWeek',
          events: events,
          headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            end: 'today prev,next',
          },
          eventClick: (e: CustomEvent) => {
            showPopup(e);
          },
          eventMouseEnter: (e: CustomEvent) => {
            showPopup(e);
          },
          eventMouseLeave: () => {
            hidePopup();
          },
        },
      },
    });
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

  let user: User | null = null;

  export async function logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  }

  let showLoginModal = false;
  let isLoginMode = false;

  async function launchLoginModal(loginMode: boolean) {
    showLoginModal = true;
    isLoginMode = loginMode;
  }
</script>

{#if showLoginModal}
  <LoginModal open={showLoginModal} {isLoginMode} on:close={() => (showLoginModal = false)} />
{/if}

<div class="flex gap-4 flex-col items-center justify-center">
  <h1 class="font-bold text-xl">Welcome to GT7 Leagues</h1>

  {#if user}
    <div class="flex-row">
      <button class="btn-primary"> Create League </button>
      <button class="btn-primary ml-12" on:click={logout}> Log Out</button>
    </div>
  {:else}
    <div class="flex-row">
      <button class="btn-primary" on:click={() => launchLoginModal(false)}> Sign Up</button>
      <button class="btn-primary ml-12" on:click={() => launchLoginModal(true)}> Log In</button>
    </div>
  {/if}

  <div id="ec" class="mx-4 max-h-[80vh] overflow-auto w-[90vw]" />
  <div id="ec2" class="mx-4 max-h-[80vh] overflow-auto w-[90vw]" />
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
