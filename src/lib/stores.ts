import { writable } from 'svelte/store';
import type { CalendarEvents, ServerEvent, UserInfo } from './shared';
import db, { supabase } from './db';
import { generateDatesWithInterval, generateRandomColor } from './utils';

export type ToastType = {
  id: number;
  type: 'error' | 'success' | 'info';
  message: string;
};

export const toasts = writable<ToastType[]>([]);

export const addToast = (toast: ToastType) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const defaultId = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    defaultId,
    type: 'info',
    dismissible: true,
    timeout: 5000,
  };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.

  setTimeout(() => dismissToast(toast.id), 5000);
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t: ToastType) => t.id !== id));
};
// Create a writable store with a set function
const publicEventsStore: CalendarEvents[] = await updateEvents();
export const publicEvents = writable(publicEventsStore);
// Function to update the store with new items

// Initial value for the store

async function updateEvents(): Promise<CalendarEvents[]> {
  const tempEventList: CalendarEvents[] = [];
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  await db.publicEventsList.all().then((eventList) => {
    if (eventList) {
      eventList.forEach((publicEvent: ServerEvent) => {
        const formattedDateString = publicEvent.start_date?.toLocaleString('en-US', {
            timeZone: timezone,
          }),
          endDateTime = new Date(publicEvent.start_date);
        endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
        const modifiedDateString = endDateTime.toString();
        if (!publicEvent.is_series) {
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
            const datesArray = generateDatesWithInterval(
              new Date(publicEvent.start_date),
              new Date(publicEvent.end_date),
              7,
            );
            const eventsArray = datesArray.map((publicEventArrayItem, i) => {
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
                title: publicEvent.series + ' - ' + publicEvent.leagueName,
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

const userStore: UserInfo | null = await getCurrentUser();

export async function getCurrentUser(): Promise<UserInfo | null> {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    const user = await supabase.auth.getUser();
    const data = await supabase
      .from('userInfo')
      .select('*')
      .eq('user_id', user.data.user?.id)
      .single();
    if (data.data) {
      return data.data;
    } else {
      return null;
    }
  } else return null;
}

export const storedUser = writable(userStore);
