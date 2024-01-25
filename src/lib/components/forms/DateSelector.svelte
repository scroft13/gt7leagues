<script lang="ts">
  import { CalendarIcon } from '@rgossiaux/svelte-heroicons/outline';
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

<div class="flex flex-row items-center relative w-52">
  <input
    {name}
    id={name}
    value={$form[name]}
    type="date"
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    class:invalid={$errors[name]}
    {...$$props}
  />
  <div class="absolute secondary-text left-44 top-[20px] w-5 h-5">
    <CalendarIcon />
  </div>
</div>

<style>
  input[type='date']::-webkit-calendar-picker-indicator {
    z-index: 50;
  }

  ::-webkit-calendar-picker-indicator {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 32"><path fill="none" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    z-index: 50;
    padding: 2px;
  }
</style>
