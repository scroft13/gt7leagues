<script lang="ts">
  export let headerTailwindCode: string;
</script>

<div class="w-full">
  <div class="hidden lg:grid mt-3 bg-gray-200 dark:bg-gray-600 w-full h-[1px]" />
  <div
    class="hidden lg:grid grid-rows-1 grid-cols-{headerTailwindCode} my-6 text-sm font-medium main-text px-3 gap-2 w-full items-center"
  >
    <slot />
  </div>
  <div class="hidden lg:grid mt-3 bg-gray-200 dark:bg-gray-600 w-full h-[1px]" />
</div>
