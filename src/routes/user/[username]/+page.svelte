<script lang="ts">
  import Fa from 'svelte-fa';
  import { supabase } from '$lib/db';
  import { faPaintbrush, faUser } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';
  import ImageUploadModal from '$lib/components/ImageUploadModal.svelte';

  export let data;
  console.log(data);

  let imageData: Blob | undefined = undefined;

  onMount(async () => {
    // Replace 'images' with your actual table name
    if (data.userImageUrl) {
      const image = await supabase.storage.from('userImages').download(data.userImageUrl);

      if (image.error) {
        console.log(image.error);
      } else {
        imageData = image.data;
      }
    }
  });

  function createObjectURL(blob: Blob) {
    return URL.createObjectURL(new Blob([blob]));
  }
  let showImageUpload = false;
</script>

{#if showImageUpload}
  <ImageUploadModal open={showImageUpload} userId={data.user?.data.user?.id ?? ''} />
{/if}
<div class="mx-4 lg:mx-16 xl:mx-40">
  <div class="flex justify-center items-center gap-x-8">
    <div class="relative">
      {#if imageData}
        <img src={createObjectURL(imageData)} alt={'User Image'} class="rounded-full w-20 h-20" />
      {:else}
        <div class="bg-gray-200 rounded-full w-20 h-20">
          <Fa icon={faUser} scale={3} translateX={2} translateY={2} />
        </div>
      {/if}
      <div class="absolute -top-3 -right-3">
        {#if data.isCurrentUser}
          <button on:click={() => (showImageUpload = true)}>
            <Fa icon={faPaintbrush} primaryColor={'gray'} />
          </button>
        {/if}
      </div>
    </div>
    <p>{data.username}</p>
  </div>
</div>
