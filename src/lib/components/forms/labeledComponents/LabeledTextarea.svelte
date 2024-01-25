<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  import TextArea from '../TextArea.svelte';
  export let labelClass = '';
  export let name: string;
  export let label: string;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} {disabled} title={label} class={labelClass} />
  <TextArea {name} {...extractWrapperProps($$props)} />
  <ErrorMessage {name} />
</div>
