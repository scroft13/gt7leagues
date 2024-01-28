<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import AddPublicEventModal from '$lib/components/AddPublicEventModal.svelte';

  let openEventModal = false;
  let leagueName = data.leagueName;

  async function launchAddEvent() {
    openEventModal = true;
  }
  console.log(data.leagueName);
</script>

{#if openEventModal}
  <AddPublicEventModal
    open={openEventModal}
    on:close={() => {
      openEventModal = false;
    }}
    {leagueName}
  />
{/if}

<h1>{data.leagueName}</h1>

<div class="w-20">
  <button on:click={() => launchAddEvent()} class="btn-primary">Add Event</button>
</div>
