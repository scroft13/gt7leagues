import { writable } from 'svelte/store';
import db from './db';
import type { UserCar } from './shared';

export let carWantedListStore = writable<UserCar[]>();
let localStorageWantedCarList;

export type ToastType = {
  id: number;
  type: 'error' | 'success' | 'info';
  message: string;
  dismissible: boolean;
  timeout: number;
};

if (typeof localStorage !== 'undefined') {
  const localStorageCheck = localStorage.wantedCarList;
  if (localStorageCheck) {
    localStorageWantedCarList = localStorage.getItem('wantedCarList');
  } else {
    async () => {
      let data = await db.createUser.all();
      if (!data) {
        data = await db.createUser.create();
      } else {
        carWantedListStore.update(() => data?.[0].wantedCarList);
      }
    };
  }
}

if (localStorageWantedCarList != 'undefined' && localStorageWantedCarList != null) {
  const storedCarWantedList: UserCar[] = JSON.parse(localStorageWantedCarList) ?? [];
  carWantedListStore = writable(storedCarWantedList);
}

if (typeof localStorage !== 'undefined') {
  carWantedListStore.subscribe(async (value) => {
    localStorage.wantedCarList = JSON.stringify(value);
    db.wantedCarList.update(value);
  });
}

export const toasts = writable<ToastType[]>([]);

export const addToast = (toast: ToastType) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    id,
    type: 'info',
    dismissible: true,
    timeout: 3000,
  };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t: ToastType) => t.id !== id));
};
