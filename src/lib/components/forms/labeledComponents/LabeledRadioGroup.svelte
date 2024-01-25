<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  import RadioField from '../RadioField.svelte';
  export let name: string;
  export let label: string;
  export let dependsOn: string | undefined = undefined;
  export let options: string[];
  export let labelClass: string;
  export let disabled = false;
  export let flexColumnsAlways = false;
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} {disabled} title={label} class={labelClass} />
  <RadioField {name} {dependsOn} {options} {flexColumnsAlways} />
  <ErrorMessage {name} />
</div>
