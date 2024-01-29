<script lang="ts">
  export let headerTailwindCode: string;
  export let index: number;
</script>

<div
  class={index % 2 === 0
    ? `hidden lg:grid grid-rows-1 grid-cols-${headerTailwindCode} px-3 py-9 gap-2 main-text w-full items-center`
    : `hidden lg:grid grid-rows-1 grid-cols-${headerTailwindCode} px-3 py-9 bg-gray-100 dark:text-gray-200 dark:bg-gray-background rounded gap-2  text-secondary w-full items-center`}
>
  <slot />
</div>
