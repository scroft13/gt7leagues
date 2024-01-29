<script lang="ts">
  export let headerTailwindCode: string;
  export let index: number;
</script>

<div
  class={index % 2 === 0
    ? `lg:hidden grid grid-rows-1 grid-cols-${headerTailwindCode} px-3 py-3 gap-2  w-full items-center text-sm`
    : `lg:hidden grid grid-rows-1 grid-cols-${headerTailwindCode} px-3 py-3 gap-2   w-full items-center bg-gray-100 dark:bg-gray-background rounded text-sm`}
>
  <slot />
</div>
