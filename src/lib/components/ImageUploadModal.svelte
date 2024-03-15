<script lang="ts">
  import db, { supabase } from '$lib/db';
  import { addToast } from '$lib/stores';
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher } from 'svelte';

  let file: File;

  export let open: boolean;
  export let userId: string;
  let loading = false;
  const dispatch = createEventDispatcher();
  function close() {
    open = false;

    setTimeout(() => {
      dispatch('close');
    }, 400);
  }

  const handleFileChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    // @ts-ignore
    file = event.target?.files[0];
  };

  const uploadImage = async () => {
    if (!file) return;
    loading = true;
    const { data, error } = await supabase.storage
      .from('userImages')
      .upload(`user_${Date.now()}_${file.name}`, file);

    if (error) {
      addToast({
        id: Math.floor(Math.random() * 1000),
        message: error.message,
        type: 'error',
      });
      console.error('Error uploading image:', error.message);
    } else {
      let fileUrl = data.path;
      db.currentUser.setUserPic(fileUrl, userId);
      loading = false;
      addToast({
        id: Math.floor(Math.random() * 1000),
        message: 'Your image was uploaded successfully!',
        type: 'success',
      });
      close();
    }
  };
  $: console.log(file);
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
      enter="transition ease-out duration-200 transform delay-100"
      enterFrom="scale-95 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="transition ease-in duration-200 transform"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-95 opacity-0"
      class="w-full"
    >
      <div
        class="mx-4 lg:mx-16 xl:mx-40 transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-12 lg:mt-[6rem]"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={close} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        <div class="mx-4 lg:mx-16">
          <h4 class="text-xl">Image Upload</h4>
          <div class="hr-div mb-6" />

          <input type="file" accept="image/*" on:change={handleFileChange} class="mb-4" />
          <button
            on:click={uploadImage}
            class="btn-primary"
            disabled={loading || file === undefined}>Upload Image</button
          >
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
