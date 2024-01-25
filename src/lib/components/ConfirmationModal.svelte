<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher } from 'svelte';

  export let confirmationMessage: string;
  export let open: boolean;
  const dispatch = createEventDispatcher();

  function confirm() {
    dispatch('confirmed');
  }

  function close() {
    open = false;
    setTimeout(() => {
      dispatch('close');
    }, 400);
  }
</script>

<TransitionRoot as="div" show={open} appear={true}>
  <Dialog as="div" class="fixed inset-0 z-40 overflow-y-scroll" on:close={close}>
    <TransitionChild
      appear={true}
      as="div"
      enter="transition-opacity ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-200 delay-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DialogOverlay class="dialog-overlay" />
    </TransitionChild>
    <TransitionChild
      appear={true}
      as="div"
      enter="transition ease-out duration-300 transform delay-100"
      enterFrom="scale-95 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="transition ease-in duration-200 transform"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-95 opacity-0"
      class="w-full"
    >
      <div
        class="absolute left-1/2 -translate-x-1/2 transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-64 max-w-sm px-6"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={close} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        <p class="text-center w-full text-lg font-semibold">
          {confirmationMessage}
        </p>
        <p class="w=full text-center secondary-text mt-2 mb-4">This cannot be undone.</p>
        <div class="flex w-full justify-around mb-6 mt-10 gap-2">
          <button
            class="rounded border-2 border-secondary dark:border-dark-mode-button-color dark:text-dark-mode-button-color text-secondary h-12 w-32 ring-secondary ring-offset-2 focus:ring-2"
            on:click={close}>Cancel</button
          >
          <button class="submit-button h-12 w-32" on:click={confirm}>Confirm</button>
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
