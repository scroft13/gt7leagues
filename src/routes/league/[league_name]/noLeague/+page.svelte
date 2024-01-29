<script>
  import { ExclamationCircleIcon } from '@rgossiaux/svelte-heroicons/outline';
</script>

<div class="mx-4 lg:mx-16 xl:mx-40 h-[50vh] flex items-center justify-center">
  <div class="flex flex-col">
    <div class="w-full flex justify-center">
      <div class="w-16 text-primary">
        <ExclamationCircleIcon />
      </div>
    </div>
    <p class="text-primary text-4xl text-center">Hmmmm.....That League is not found.</p>
    <p class="text-center w-full text-xl secondary-text my-2">
      The league you were looking for wasn't found
    </p>

    <div class="flex justify-center gap-4 text-primary mt-2">
      <a href="/">Back Home</a>
    </div>
  </div>
</div>
