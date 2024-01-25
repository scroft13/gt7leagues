<script lang="ts">
  import { getFormContext } from '../../utils';
  import { EyeIcon, EyeOffIcon } from '@rgossiaux/svelte-heroicons/outline';
  export let name: string;
  const { form, errors, handleChange } = getFormContext();
  let passwordHidden = true;
</script>

<div class="relative">
  <input
    {name}
    id={name}
    type={passwordHidden ? 'password' : 'text'}
    placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
    autocomplete={name}
    value={$form[name]}
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    class:invalid={$errors[name]}
    {...$$props}
  />
  <button
    class="absolute right-3 top-[22px] secondary-text"
    on:click|preventDefault={() => (passwordHidden = !passwordHidden)}
  >
    {#if !passwordHidden}
      <EyeIcon class="w-5 h-5" />
    {:else}
      <EyeOffIcon class="w-5 h-5" />
    {/if}
  </button>
</div>
