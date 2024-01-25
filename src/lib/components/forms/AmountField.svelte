<script lang="ts">
  import { getFormContext } from '../../utils';
  export let name: string;
  export let dependsOn: string | undefined = undefined;
  export let placeholder: string;
  const { form, errors, handleChange, validateField } = getFormContext();

  let lastDependsOnValue: unknown;

  $: if (dependsOn && $form?.[dependsOn] !== lastDependsOnValue) {
    validateField(name);
    lastDependsOnValue = $form[dependsOn];
  }
</script>

<div class="relative">
  <p class="absolute top-[19px] left-2 secondary-text">$</p>
  <input
    {name}
    id={name}
    {placeholder}
    value={$form[name]}
    type="number"
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    step="any"
    class="pl-5"
    class:invalid={$errors[name]}
    {...$$props}
  />
</div>
