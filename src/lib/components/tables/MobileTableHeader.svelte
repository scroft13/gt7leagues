<script lang="ts">
  export let headerTailwindCode: string;
</script>

<div class="w-full">
  <div class="hr-div lg:hidden" />
  <div
    class="lg:hidden grid grid-rows-1 grid-cols-{headerTailwindCode} my-6 px-3 gap-2 w-full items-center"
  >
    <slot />
  </div>
  <div class="hr-div lg:hidden" />
</div>
