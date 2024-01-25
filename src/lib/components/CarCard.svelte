<script lang="ts">
  import { numberFormat2, type UserCar } from '$lib/shared';
  import { carWantedListStore } from '$lib/stores';
  import { HeartIcon } from '@rgossiaux/svelte-heroicons/solid';

  export let make: string;
  export let model: string;
  export let price: number = 0;
  export let id: string;

  let wantedCarList: UserCar[] = [];

  $: carWantedListStore.subscribe((x) => (wantedCarList = x));
  $: onList = wantedCarList?.find((x) => x?.id === id) === undefined;

  async function addToUserCars() {
    carWantedListStore.update((currentList) => [{ id, model, make, price }, ...currentList]);
  }
  async function removeFromList() {
    carWantedListStore.update((currentList) => [...currentList.filter((x) => x.id != id)]);
  }
</script>

<div
  class="border flex flex-col items-center justify-center w-full lg:w-96 outline-1 shadow-md  rounded-md"
>
  <p>
    {make}
  </p>
  <p>
    {model}
  </p>
  <p>
    {numberFormat2.format(price).split('.')[0]}
  </p>
  <!-- <img src="/gt7/carImages/{id}.jpeg" alt="car image" class="w-15 " /> -->
  <button on:click={() => (onList ? addToUserCars() : removeFromList())}>
    {#if onList}
      <HeartIcon class="w-5 text-red-300" />
    {:else}
      <HeartIcon class="w-5 text-blue-300" />
    {/if}
  </button>
</div>
