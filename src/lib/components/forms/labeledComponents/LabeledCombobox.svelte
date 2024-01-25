<script lang="ts">
  import { extractWrapperProps } from '$lib/utils';
  import ComboBox from '../ComboBox.svelte';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Label from '../Label.svelte';
  export let dependsOn: string[] | undefined = undefined;
  export let name: string;
  export let label: string;
  export let options: string[];
  export let placeholder: string;
  export let short: boolean;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)}>
  <Label {name} title={label} {disabled} />
  <ComboBox {name} {options} {placeholder} {short} {dependsOn} {disabled} />
  <ErrorMessage {name} />
</div>
