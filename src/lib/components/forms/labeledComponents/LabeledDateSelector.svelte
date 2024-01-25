<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import Label from '../Label.svelte';
  import DateSelector from '../DateSelector.svelte';
  import ErrorMessage from '../ErrorMessage.svelte';
  export let name: string;
  export let label: string;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} {disabled} title={label} />
  <DateSelector {name} />
  <ErrorMessage {name} />
</div>
