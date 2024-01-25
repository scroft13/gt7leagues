<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  import PasswordField from '../PasswordField.svelte';
  export let name: string;
  export let label: string;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} {disabled} title={label} />
  <PasswordField {name} />
  <ErrorMessage {name} />
</div>
