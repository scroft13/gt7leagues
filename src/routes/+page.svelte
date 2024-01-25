<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  // @ts-ignore
  import Calendar from '@event-calendar/core';
  // @ts-ignore
  import DayGrid from '@event-calendar/day-grid';
  // @ts-ignore
  import TimeGrid from '@event-calendar/time-grid';
  import type { Events, PublicServerEvent } from '$lib/shared';
  import db, { supabase } from '$lib/db';
  import AddPublicEventModal from '$lib/components/AddPublicEventModal.svelte';
  import { colors } from '$lib/consts';

  let ec: Calendar;
  let openEventModal = false;
  let events: Events[] = [
    {
      id: 12,
      start: new Date('2024-1-22 09:00:00'),
      end: new Date('2024-01-22 10:30:00'),
      title: 'Weekly GT3 Weekly GT3 Weekly GT3 Weekly GT3',
      display: 'auto',
      extendedProps: {},
      backgroundColor: '',
    },
    {
      id: 13,
      start: new Date('2024-1-23 10:00:00 GMT-0200'),
      end: new Date('2024-01-23 11:00:00 GMT-0200'),
      title: 'Event Test',
      display: 'auto',
      extendedProps: {},
      backgroundColor: '',
    },
  ];
  let isPopupVisible = false;
  let colorIndex = 0;

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
        events = eventList.map((publicEvent: PublicServerEvent, index) => {
          colorIndex = index;
          const formattedDateString = publicEvent.start_date.toLocaleString('en-US', {
              timeZone: timezone,
            }),
            endDateTime = new Date(publicEvent.start_date);
          endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
          const modifiedDateString = endDateTime.toString();
          return {
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
            backgroundColor: colors[index],
          };
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
  });

  async function launchAddEvent() {
    openEventModal = true;
  }

  // Create a function to handle inserts
  const handleInserts = (payload: any) => {
    console.log(payload);
    colorIndex++;
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
      backgroundColor: colors[colorIndex],
    });
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
</script>

{#if openEventModal}
  <AddPublicEventModal
    open={openEventModal}
    on:close={() => {
      openEventModal = false;
    }}
    leagueName="Test League"
  />
{/if}

<div class="flex gap-4 flex-col items-center justify-center">
  <h1 class="font-bold text-xl">Welcome to GT7 Leagues</h1>
  <div class="flex-row">
    <button class="btn-primary"> Create League </button>
    <button class="btn-primary"> Join League </button>
  </div>
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
  <div class="w-20">
    <button on:click={() => launchAddEvent()} class="btn-primary">Add Event</button>
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
