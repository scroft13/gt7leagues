<script lang="ts">
  import Toasts from '$lib/components/Toasts.svelte';
  import '../app.css';

  // import { SvelteToast } from '@zerodevx/svelte-toast';

  // const options = {
  //   duration: 4000, // duration of progress bar tween to the `next` value
  //   initial: 1, // initial progress bar value
  //   next: 0, // next progress value
  //   pausable: false, // pause progress bar tween on mouse hover
  //   dismissable: true, // allow dismiss with close button
  //   reversed: false, // insert new toast to bottom of stack
  //   intro: { x: 256 }, // toast intro fly animation settings
  //   theme: {}, // css var overrides
  //   classes: [], // user-defined classes
  // };
</script>

<!-- <SideMenu bind:sideMenuIsOpen /> -->
<!-- <SvelteToast {options} /> -->
<Toasts />

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
