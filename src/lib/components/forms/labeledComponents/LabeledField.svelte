<script lang="ts">
  import { extractInputProps, extractWrapperProps } from '$lib/utils';
  import ErrorMessage from '../ErrorMessage.svelte';
  import Field from '../Field.svelte';
  import Label from '../Label.svelte';
  export let name: string;
  export let label: string | boolean;
  export let placeholder: string | undefined = undefined;
  export let type: 'number' | 'text' | 'checkbox';
  export let iconType: 'person' | 'email' | 'globe' | 'phone' | undefined = undefined;
  export let dependsOn: string[] | undefined = undefined;
  export let disabled = false;
</script>

<div {...extractWrapperProps($$props)} class:checkbox={type == 'checkbox'}>
  {#if label && typeof label === 'string'}
    <Label {name} {disabled} title={label} />
  {/if}
  <Field {name} {type} {...extractInputProps($$props)} {placeholder} {iconType} {dependsOn} />
  <ErrorMessage {name} />
</div>
