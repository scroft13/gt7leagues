<script lang="ts">
  import { getFormContext, pick } from '../../utils';
  import {
    AtSymbolIcon,
    GlobeAltIcon,
    PhoneIcon,
    UserIcon,
  } from '@rgossiaux/svelte-heroicons/outline';
  export let name: string;
  export let type: 'text' | 'number' | 'checkbox';
  export let placeholder: string | undefined = undefined;
  export let iconType: 'person' | 'email' | 'globe' | 'phone' | undefined;
  const { form, errors, handleChange, validateField } = getFormContext();

  export let dependsOn: string[] | undefined = undefined;
  let lastDependsOnValue: Record<string, string>;
  $: if (dependsOn && pick($form ?? {}, ...dependsOn) !== lastDependsOnValue) {
    validateField(name);
    lastDependsOnValue = pick($form ?? {}, ...dependsOn);
  }
</script>

<div class="relative">
  <input
    {name}
    id={name}
    {type}
    {placeholder}
    value={$form[name]}
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    class:invalid={$errors[name]}
    {...$$props}
    checked={$form[name]}
  />
  {#if iconType}
    <p class="absolute right-3 top-[22px] secondary-text">
      {#if iconType == 'person'}
        <UserIcon class="w-5 h-5" />
      {:else if iconType == 'email'}
        <AtSymbolIcon class="w-5 h-5" />
      {:else if iconType == 'globe'}
        <GlobeAltIcon class="w-5 h-5" />
      {:else if iconType == 'phone'}
        <PhoneIcon class="w-5 h-5" />
      {/if}
    </p>
  {/if}
</div>
