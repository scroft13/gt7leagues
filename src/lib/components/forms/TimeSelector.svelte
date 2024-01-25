<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { getFormContext } from '../../utils';
  export let name: string;
  export let dependsOn: string | undefined = undefined;
  const { form, validateField } = getFormContext();
  import SveltyPicker from 'svelty-picker';

  let lastDependsOnValue: unknown;
  let nameStore = name;
  $: if (dependsOn && $form?.[dependsOn] !== lastDependsOnValue) {
    validateField(name);
    lastDependsOnValue = $form[dependsOn];
  }

  const dispatch = createEventDispatcher();
  function dispatchChange() {
    dispatch('changed', { [nameStore]: name });
  }
</script>

<div class="flex flex-row items-center relative w-52">
  <SveltyPicker
    bind:value={name}
    mode={'time'}
    format="hh:ii"
    displayFormat="HH:ii P"
    {...$$props}
    on:change={() => dispatchChange()}
  />
</div>
