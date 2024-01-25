<script lang="ts">
  import { getFormContext } from '../../utils';
  export let name: string;
  const { form, errors, handleChange } = getFormContext();

  function customHandleChange(
    e: Event & {
      currentTarget: EventTarget & HTMLSelectElement;
    },
  ) {
    $form[name] = e.currentTarget.value.valueOf();
    handleChange(e);
  }
</script>

<select
  {name}
  id={name}
  placeholder="Please Select..."
  on:change={(e) => customHandleChange(e)}
  on:blur={(e) => customHandleChange(e)}
  class:invalid={$errors[name]}
  {...$$props}
>
  <option disabled selected value="" class="disabled:text-gray-200">Please select...</option>
  <slot />
</select>

<style>
  ::placeholder {
    color: red;
  }
</style>
