<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  import AmountField from '../AmountField.svelte';
  export let name: string;
  export let label: string;
  export let placeholder: string;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)} class="short">
  <Label {name} {disabled} title={label} />
  <AmountField {name} {placeholder} />
  <ErrorMessage {name} />
</div>
