<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  import PhoneNumber from '../PhoneNumber.svelte';
  export let name: string;
  export let label: string;
  export let dependsOn: string[] | undefined = undefined;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)} class="short">
  <Label {name} {disabled} title={label} />
  <PhoneNumber {name} {dependsOn} />
  <ErrorMessage {name} />
</div>
