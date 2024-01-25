<script lang="ts">
  import { formatPhoneNumber } from '$lib/formatters';
  import { PhoneIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { getFormContext, pick } from '../../utils';
  export let name: string;
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
    type="text"
    value={$form[name]}
    placeholder="(515)516-0624"
    use:formatPhoneNumber
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    class:invalid={$errors[name]}
    {...$$props}
  />

  <p class="absolute left-44 top-[20px] secondary-text">
    <PhoneIcon class="w-5 h-5" />
  </p>
</div>
