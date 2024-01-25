<script lang="ts">
  import { getFormContext } from '../../utils';

  export let name: string;
  const { form, errors, handleChange, validateField } = getFormContext();
  export let options: string[];
  export let dependsOn: string | undefined = undefined;
  export let flexColumnsAlways: boolean;
  let lastDependsOnValue: unknown;

  $: if (dependsOn && $form?.[dependsOn] !== lastDependsOnValue) {
    validateField(name);
    lastDependsOnValue = $form[dependsOn];
  }
</script>

<div
  class="flex flex-col {flexColumnsAlways
    ? ''
    : 'lg:flex-row'}  w-full lg:justify-between mt-4 justify-center"
>
  {#each options as option}
    <label class="my-2 items-center flex gap-2">
      <input
        type="radio"
        bind:group={$form[name]}
        class="text-primary"
        value={option}
        on:keyup={handleChange}
        on:change={handleChange}
        on:blur={handleChange}
        class:invalid={$errors[name]}
        {...$$props}
      />
      {option}
    </label>
  {/each}
</div>
