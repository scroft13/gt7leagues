<script lang="ts">
  import { page } from '$app/stores';
  import { ExclamationCircleIcon } from '@rgossiaux/svelte-heroicons/outline';

  let urlError = $page.status === 404;
  let jsError = $page.status === 500;
  let openSupportModal = false;

  $: if (openSupportModal) {
    window.open(
      'mailto:admin@gt7leagues.com?subject="GT7 Leagues Error"&body=' +
        'Status: ' +
        $page.status +
        ' Error: ' +
        $page.error?.message +
        ' Path: ' +
        $page.url.pathname,
    );
  }
</script>

<div class="mx-4 lg:mx-16 xl:mx-40 h-[50vh] flex items-center justify-center">
  <div class="flex flex-col">
    {#if jsError}
      <div class="w-full flex justify-center">
        <div class="w-16 text-primary">
          <ExclamationCircleIcon />
        </div>
      </div>
      <p class="text-primary text-4xl text-center">Error 500 - Internal Error</p>
      <p class="text-center w-full text-xl secondary-text my-2">There was an error on the page</p>
    {:else if urlError}
      <div class="w-full flex justify-center">
        <div class="w-16 text-primary">
          <ExclamationCircleIcon />
        </div>
      </div>
      <p class="text-primary text-4xl text-center">Error 404 - Page not found</p>
      <p class="text-center w-full text-xl secondary-text my-2">
        The page you were looking for wasn't found
      </p>
    {/if}
    <div class="flex justify-center gap-4 text-primary mt-2">
      <a href="/">Back Home</a>
      <button on:click={() => (openSupportModal = true)}> Contact Help</button>
    </div>
  </div>
</div>
