<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import Label from '../Label.svelte';
  import ErrorMessage from '../ErrorMessage.svelte';
  import TimeSelector from '../TimeSelector.svelte';
  import { createEventDispatcher } from 'svelte';
  export let name: string;
  export let label: string;
  export let disabled = false;
  const dispatch = createEventDispatcher();
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} {disabled} title={label} />
  <TimeSelector
    {name}
    on:changed={(e) => {
      dispatch('changed', e.detail);
    }}
  />
  <ErrorMessage {name} />
</div>
