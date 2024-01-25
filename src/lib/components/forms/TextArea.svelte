<script lang="ts">
  import { getFormContext } from '../../utils';
  export let name: string;
  const { form, errors, handleChange } = getFormContext();
</script>

<div>
  <textarea
    {name}
    id={name}
    on:keyup={handleChange}
    on:change={handleChange}
    on:blur={handleChange}
    class:invalid={$errors[name]}
    value={$form[name]}
    {...$$props}
  />
</div>
