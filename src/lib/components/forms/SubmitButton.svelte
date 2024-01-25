<script lang="ts">
  import { getFormContext } from '../../utils';
  import Loading from '../Loading.svelte';
  const { isSubmitting, handleSubmit } = getFormContext();
  export let buttonName: string;
  export let loading = true;
</script>

<button
  disabled={$isSubmitting}
  {...$$props}
  on:click={(e) => {
    handleSubmit(e);
  }}
>
  {#if !$isSubmitting || !loading}
    {buttonName}
  {:else}
    <div class="w-full flex items-center justify-center">
      <div class="w-full text-gray-600 flex flex-row justify-center items-center">
        <p>Processing...</p>
        <div class="w-8 h-8 ml-5">
          <Loading />
        </div>
      </div>
    </div>
  {/if}
</button>
