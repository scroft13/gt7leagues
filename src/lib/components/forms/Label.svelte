<script lang="ts">
  import { getFormContext } from '../../utils';
  export let name: string;
  export let title: string;
  export let disabled: boolean;
  const { schema, form } = getFormContext();

  const fieldInfo = schema.fields[name].describe() as {
    tests: { name: string }[];
    optional: boolean;
  };
  let required =
    fieldInfo.tests.find((set) => set.name === 'required') !== undefined ? true : false;
  $: {
    let isZip = name === 'zip';
    let isState = name === 'state';
    if (isZip || isState) {
      if (
        ($form.country === 'United States' || $form.country === 'Canada') &&
        fieldInfo.tests.length >= 1
      ) {
        required = true;
      } else {
        required = false;
      }
    }
  }

  $: {
    if (fieldInfo.optional === false) {
      required = true;
    }
  }
</script>

<label for={name} {...$$props}>
  <div
    class={disabled
      ? 'flex items-start text-gray-200 dark:text-gray-600'
      : 'flex items-start dark:text-gray-200'}
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html title}
    {#if required}
      <span class="text-red-400">&nbsp;*</span>
    {/if}
  </div>
</label>
