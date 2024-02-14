<script lang="ts">
  import Fa from 'svelte-fa';
  import db, { supabase } from '$lib/db';
  import { faPaintbrush, faUser } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';
  import ImageUploadModal from '$lib/components/ImageUploadModal.svelte';
  import { storedUser } from '$lib/stores.js';
  import type { League } from '$lib/shared.js';

  export let data;

  let imageData: Blob | undefined = undefined;
  let ownedLeagues: League[] = [];
  let joinedLeagues: League[] = [];
  let leagues: League[] = [];

  onMount(async () => {
    ownedLeagues = (await db.leagues.findOwned(data.userInfo.user_id ?? '')) ?? [];
    joinedLeagues =
      (await db.leagues.findJoined(data.userInfo.username ?? '', data.userInfo.user_id ?? '')) ??
      [];
    leagues = [...ownedLeagues, ...joinedLeagues];
    if (data.userInfo.imageUrl) {
      const image = await supabase.storage
        .from('userImages')
        .download(data.userInfo.imageUrl ?? '');
      if (image.error) {
        throw image.error;
      } else {
        imageData = image.data;
      }
    }
  });

  function changeImage() {
    if (data.isCurrentUser) showImageUpload = true;
  }
  function createObjectURL(blob: Blob) {
    return URL.createObjectURL(new Blob([blob]));
  }
  let showImageUpload = false;
</script>

{#if showImageUpload}
  <ImageUploadModal
    open={showImageUpload}
    userId={$storedUser?.user_id ?? ''}
    on:close={() => (showImageUpload = false)}
  />
{/if}
<div class="mx-4 lg:mx-16 xl:mx-40">
  <div class="flex justify-evenly items-center gap-x-8 mb-4">
    <button on:click={() => changeImage()} class="relative">
      {#if imageData}
        <img src={createObjectURL(imageData)} alt={'User Image'} class="rounded-full w-20 h-20" />
      {:else}
        <div class="bg-gray-200 rounded-full w-20 h-20">
          <Fa icon={faUser} scale={3} translateX={2} translateY={2} />
        </div>
      {/if}
      <div class="absolute -top-3 -right-3">
        {#if data.isCurrentUser}
          <div>
            <Fa icon={faPaintbrush} primaryColor={'gray'} />
          </div>
        {/if}
      </div>
    </button>
    <p class="text-3xl font-semibold secondary-text">{data.userInfo.username}</p>
  </div>
  <div>
    <div class="flex flex-col gap-1">
      <p class="text-2xl font-semibold main-text">Current Leagues</p>
      <div class="flex flex-col gap-2">
        {#each leagues as league}
          <div>
            <a class="secondary-text" href={'/league/' + league.leagueLink}> {league.leagueName}</a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
