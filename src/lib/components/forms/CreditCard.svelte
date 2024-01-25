<script lang="ts">
  import { creditCardFormat } from '$lib/formatters';
  import { CreditCardIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { getFormContext } from '../../utils';
  export let name: string;
  export let dependsOn: string | undefined = undefined;
  const { form, errors, handleChange, validateField } = getFormContext();

  let lastDependsOnValue: unknown;
  $: if (dependsOn && $form?.[dependsOn] !== lastDependsOnValue) {
    validateField(name);
    lastDependsOnValue = $form[dependsOn];
  }
</script>

<div class="relative">
  <input
    {name}
    id={name}
    type="text"
    value={$form[name]}
    placeholder="4000 1111 2222 3333"
    use:creditCardFormat
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    class:invalid={$errors[name]}
    {...$$props}
    autocomplete="cc-number"
  />

  <p class="absolute right-4 top-[20px] secondary-text">
    <CreditCardIcon class="w-5 h-5" />
  </p>
</div>
