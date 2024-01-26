<script lang="ts">
  import Toasts from '$lib/components/Toasts.svelte';
  import '../app.css';

  import HamburgerIcon from '$lib/components/HamburgerIcon.svelte';
  import SideMenu from '$lib/components/SideMenu.svelte';
  let sideMenuIsOpen = false;
</script>

<Toasts />
<SideMenu bind:sideMenuIsOpen />

<div class="w-full flex justify-end sticky">
  <button
    on:click={() => {
      sideMenuIsOpen = !sideMenuIsOpen;
    }}
  >
    <HamburgerIcon />
  </button>
</div>
<slot />

<style>
  :root {
    --primary-color: 213 77% 38%;
    --secondary-color: 350 97% 38%;
    --tertiary-color: 60 1% 42%;
    --surface-base: 0 0% 100%;
    --surface-100: 0 0% 96%;
    --surface-200: 0 0% 88%;
    --surface-300: 0 0% 80%;

    --text-base: 0 0% 42%;
    --text-muted: 0 0% 72%;
  }
</style>
