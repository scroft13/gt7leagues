<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import CreditCard from '../CreditCard.svelte';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  export let name: string;
  export let label: string;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} {disabled} title={label} />
  <CreditCard {name} />
  <ErrorMessage {name} />
</div>
