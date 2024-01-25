<script type="ts">
  import {
    TransitionRoot,
    Dialog,
    TransitionChild,
    DialogOverlay,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/solid';

  export let sideMenuIsOpen: boolean = false;
</script>

<TransitionRoot as="div" show={sideMenuIsOpen}>
  <Dialog as="div" class="fixed inset-0 z-40" on:close={() => (sideMenuIsOpen = false)}>
    <TransitionChild
      as="div"
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
    </TransitionChild>

    <TransitionChild
      as="div"
      class="max-w-xs md:max-w-md  w-full bg-surface-200 drop-shadow-2xl  flex flex-col overflow-y-auto absolute right-0 h-full z-40"
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-x-full"
      enterTo="-translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div class="flex justify-end absolute top-0 right-0">
        <button
          type="button"
          class="p-2 rounded-md inline-flex items-center justify-center"
          on:click={() => (sideMenuIsOpen = false)}
        >
          <span class="sr-only">Close Menu</span>
          <XIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-4 mx-4 flex flex-col">
        <a href="/gt7/leagues">Leagues</a>
        <a href="/gt7/cars">My Cars</a>
        <a href="/gt7/cars/hagerty">Hagerty Dealership</a>
        <a href="/gt7/cars/ucd">Used Car Dealership</a>
        <a href="/gt7/cars/brandCentral">Brand Central</a>
        <a href="/gt7/cars/allCars">All Cars</a>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
