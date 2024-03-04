<script lang="ts">
  import Toasts from '$lib/components/Toasts.svelte';
  import { UserIcon } from '@rgossiaux/svelte-heroicons/outline';
  import '../app.css';
  import { getCurrentUser, storedUser } from '$lib/stores';

  import { onMount } from 'svelte';
  import db, { supabase } from '$lib/db';
  import type { User } from '@supabase/supabase-js';
  import LoginModal from '$lib/components/LoginModal.svelte';
  import ForgotPassword from '$lib/components/ForgotPassword.svelte';
  import SetUsername from '$lib/components/SetUsername.svelte';

  let user: User | null;
  let showLoginModal = false;
  let showForgotPassword = false;
  let isLoginMode = false;
  let setUsername = false;
  let imageData: Blob | undefined = undefined;
  let urlImage: string;
  let usernameList: string[] = [];

  onMount(async () => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        user = session.user;
      }
    });

    const data = await db.currentUser.getUsernameList();
    if (data)
      usernameList = data.map((x) => {
        if (x) {
          return x;
        } else return '';
      });
    if ($storedUser?.imageUrl) {
      const image = await supabase.storage.from('userImages').download($storedUser.imageUrl ?? '');
      if (image.error) {
        throw image.error;
      } else {
        imageData = image.data;
        urlImage = URL.createObjectURL(new Blob([imageData]));
      }
    }

    return () => {
      authListener?.unsubscribe();
    };
  });

  function launchLoginModal(loginMode: boolean) {
    showLoginModal = true;
    isLoginMode = loginMode;
  }
  async function checkUsernameOnList() {
    if (user) {
      const username = await db.currentUser.currentUsername(user.id);
      if (!username) {
        setUsername = true;
      }
    }
  }

  $: username = $storedUser?.username;
</script>

<Toasts />
{#if showLoginModal}
  <LoginModal
    open={showLoginModal}
    {isLoginMode}
    on:close={async (data) => {
      if (user) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          storedUser.update(() => {
            return {
              email: currentUser.email,
              created_at: currentUser.created_at,
              imageUrl: currentUser.imageUrl,
              user_id: currentUser.user_id,
              username: currentUser.username,
              sentMessages: [],
              receivedMessages: [],
            };
          });
        }
        showLoginModal = false;
        user = data.detail.user;
        checkUsernameOnList();
      } else {
        showLoginModal = false;
        return;
      }
    }}
    on:forgotPassword={() => {
      showLoginModal = false;
      showForgotPassword = true;
    }}
  />
{/if}
{#if showForgotPassword}
  <ForgotPassword open={showForgotPassword} on:close={() => (showForgotPassword = false)} />
{/if}
{#if user && setUsername}
  <SetUsername
    open={setUsername}
    on:close={() => {
      setUsername = false;
      checkUsernameOnList();
    }}
    {usernameList}
  />
{/if}

<div class="w-full flex justify-between sticky top-0 p-2 z-50 bg-gradient-to-b from-white from-90%">
  <a href="/">
    <img src={'/GT7L.png'} alt={'User Image'} class="h-10" />
  </a>
  {#if $storedUser}
    <a href={'/user/' + username} class="h-10 w-10">
      {#if $storedUser.imageUrl}
        <div
          style="background-image: url('{urlImage}');"
          class="rounded-full bg-cover bg-center w-10 h-10"
        />
      {:else}
        <div class="rounded-full bg-gray-400 p-2">
          <UserIcon />
        </div>
      {/if}
    </a>
  {:else}
    <button on:click={() => launchLoginModal(true)} class="h-10 w-10">
      <div class="rounded-full bg-gray-400 p-2">
        <UserIcon />
      </div>
    </button>
  {/if}
</div>
<slot />

<style>
  :root {
    --primary-color: 213 77% 38%;
    --secondary-color: 350 97% 38%;
    --tertiary-color: 60 1% 42%;
    --surface-base: 0 0% 100%;
    --surface-100: 0 0% 96%;
    --surface-200: 0 0% 88%;
    --surface-300: 0 0% 80%;

    --text-base: 0 0% 42%;
    --text-muted: 0 0% 72%;
  }
</style>
