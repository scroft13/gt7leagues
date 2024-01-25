<script lang="ts">
  import { getFormContext } from '../../utils';
  const { errors } = getFormContext();

  export let name: string;
</script>

{#if $errors[name]}
  <div class="error-message" {...$$props}>
    <p class="text-[#FB2424]" {...$$props}>{$errors[name]}</p>
  </div>
{/if}
