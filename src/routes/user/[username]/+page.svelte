<script lang="ts">
  import Fa from 'svelte-fa';
  import db, { supabase } from '$lib/db';
  import { faPaintbrush, faUser } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';
  import ImageUploadModal from '$lib/components/ImageUploadModal.svelte';
  import { addToast, storedUser } from '$lib/stores.js';
  import type { League, Message } from '$lib/shared.js';
  import NoMessagesSvg from '$lib/components/NoMessagesSvg.svelte';
  import NewMessageModal from '$lib/components/NewMessageModal.svelte';
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui';
  import { arrayOfUndefs } from '$lib/utils.js';
  import TableHeader from '$lib/components/tables/TableHeader.svelte';
  import TableGrid from '$lib/components/tables/TableGrid.svelte';
  // import {
  //   DotsVerticalIcon,
  //   ReplyIcon,
  //   TrashIcon,
  // } from '@rgossiaux/svelte-heroicons/outline/index.js';
  import { displayDateNumerical } from '$lib/formatters.js';
  import ReplyMessageModal from '$lib/components/ReplyMessageModal.svelte';
  import { DotsVerticalIcon, ReplyIcon, TrashIcon } from '@rgossiaux/svelte-heroicons/outline';
  import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
  import { afterNavigate, goto } from '$app/navigation';

  export let data;

  let imageData: Blob | undefined = undefined;
  let ownedLeagues: League[] = [];
  let joinedLeagues: League[] = [];
  let leagues: League[] = [];
  let showImageUpload = false;
  let showMessageBody: boolean[] = [];
  let showSentMessageBody: boolean[] = [];
  let selectedItem: 'messages' | 'sentMessages' = 'messages';
  let initialMessage: { replyMessage: Message | undefined; followUpMessage: Message | undefined } =
    {
      replyMessage: undefined,
      followUpMessage: undefined,
    };
  let messageForDeletion: { message: Message | undefined; sentMessage: Message | undefined } = {
    message: undefined,
    sentMessage: undefined,
  };
  let loading = true;
  let openMessageModal = false;
  let openReplyModal = false;
  let openConfirmationModal = false;
  let confirmationMessage: string;
  let urlImage: string;

  const checkImage = async () => {
    const image = await supabase.storage.from('userImages').download(data.userInfo.imageUrl ?? '');

    if (image) {
      if (image?.error) {
        throw image.error;
      } else if (image.data) {
        imageData = image.data;
        urlImage = URL.createObjectURL(new Blob([imageData]));
      }
    }
  };

  onMount(async () => {
    await checkLeagues();
    await checkImage();
    loading = false;
  });

  afterNavigate(async () => {
    loading = true;
    await checkImage();
    await checkLeagues();
    loading = false;
  });

  storedUser.subscribe(() => {
    checkImage();
  });

  function changeImage() {
    if (data.isCurrentUser) showImageUpload = true;
  }

  async function checkLeagues() {
    ownedLeagues = (await db.leagues.findOwned(data.userInfo.user_id ?? '')) ?? [];
    joinedLeagues =
      (await db.leagues.findJoined(data.userInfo.username ?? '', data.userInfo.user_id ?? '')) ??
      [];
    leagues = [...ownedLeagues, ...joinedLeagues];
  }

  function sendMessage() {
    openMessageModal = true;
  }
  async function showMessage(message: Message | undefined, sentMessage: Message | undefined) {
    if (sentMessage && data.userInfo.sentMessages) {
      showSentMessageBody = data.userInfo.sentMessages.map((msg: Message, index: number) =>
        msg.id === sentMessage.id ? !showSentMessageBody[index] : showSentMessageBody[index],
      );
    } else if (message && data.userInfo.receivedMessages) {
      showMessageBody = await data.userInfo.receivedMessages?.map((msg: Message, index: number) => {
        if (msg.id == message.id) {
          if (message.viewed == false) {
            setTimeout(() => {
              if (showMessageBody[index] == true && data.userInfo.receivedMessages) {
                // TODO add marked as read
                // account?.updateMessageAsViewed(message.id);
                // $state.messages[index].viewed = true;
                // $account.flags.unreadMessageCount -= 1;
              }
            }, 3000);
          }
          return !showMessageBody[index];
        } else {
          return showMessageBody[index];
        }
      });
    }
  }

  function reply(message: Message) {
    initialMessage = { replyMessage: message, followUpMessage: undefined };
    openReplyModal = true;
  }

  function followUp(message: Message) {
    initialMessage = { replyMessage: undefined, followUpMessage: message };
    openMessageModal = true;
  }

  function deletePhase1(message: Message | undefined, sentMessage: Message | undefined) {
    if (message) {
      messageForDeletion.message = message;
    } else if (sentMessage) {
      messageForDeletion.sentMessage = sentMessage;
    }
    confirmationMessage = `Are you sure you want to delete message ${
      selectedItem == 'messages' ? 'to' : 'from'
    } "${message?.sender ?? sentMessage?.receiver}"?`;
    openConfirmationModal = true;
  }

  async function logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        addToast({
          id: Math.floor(Math.random() * 1000),
          message: 'Something went wrong. ' + error.message,
          type: 'success',
        });
      } else {
        storedUser.update(() => null);
        addToast({
          id: Math.floor(Math.random() * 1000),
          message: 'You have been successfully logged out.',
          type: 'success',
        });
        goto('/');
      }
    } catch (error: any) {
      throw error;
    }
  }

  function deleteMessage(message: {
    message: Message | undefined;
    sentMessage: Message | undefined;
  }) {
    console.log(message);
  }
</script>

{#if openConfirmationModal}
  <ConfirmationModal
    on:close={() => (openConfirmationModal = false)}
    open={openConfirmationModal}
    {confirmationMessage}
    on:confirmed={() => {
      if (messageForDeletion != undefined) {
        deleteMessage(messageForDeletion);
      }
      openConfirmationModal = false;
    }}
  />
{/if}

{#if showImageUpload}
  <ImageUploadModal
    open={showImageUpload}
    userId={$storedUser?.user_id ?? ''}
    on:close={() => (showImageUpload = false)}
  />
{/if}
{#if openMessageModal}
  <NewMessageModal
    open={openMessageModal}
    on:close={() => (openMessageModal = false)}
    recipient={data.userInfo.username}
  />
{/if}
{#if openReplyModal}
  <ReplyMessageModal
    open={openReplyModal}
    on:close={() => (openReplyModal = false)}
    {initialMessage}
  />
{/if}
<div class="mx-4 lg:mx-16 xl:mx-40 mt-10">
  {#if loading}
    <div class="w-full">
      <div class="h-20 my-2 mx-4">
        <div class="skeleton-block" />
      </div>
    </div>
    <div class="w-full">
      <div class="h-20 my-1 mx-4">
        <div class="skeleton-block" />
      </div>
    </div>
    <div class="w-full">
      <div class="h-[500px] lg:h-[1200px] my-2 mx-4">
        <div class="skeleton-block" />
      </div>
    </div>
  {:else}
    <div class="flex justify-evenly items-center gap-x-8 mb-4">
      <button on:click={() => changeImage()} class="relative">
        {#if imageData}
          <div
            style="background-image: url('{urlImage}');"
            class="rounded-full bg-cover bg-center w-20 h-20"
          />
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
        <p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-8">
          Current Leagues
        </p>
        <div class="flex flex-col gap-2">
          {#each leagues as league}
            <div>
              <a class="secondary-text" href={'/league/' + league.leagueLink}>
                {league.leagueName}</a
              >
            </div>
          {/each}
        </div>
      </div>
      <div>
        {#if data.isCurrentUser}
          <TabGroup class="relative items-center mt-20">
            <TabList class={'flex items-center justify-start w-full gap-4'}>
              <!-- {#if !atBeginning}
                <button
                  on:click={() => {
                    tabDiv.scroll({ behavior: 'smooth', left: -1050 });
                    atBeginning = true;
                  }}
                  class="w-2 pb-3 text-primary lg:hidden"
                >
                  <ChevronLeft />
                  <span class="sr-only">move recent bar right</span>
                </button>
              {/if} -->
              <div class={'flex flex-nowrap overflow-x-hidden overflow-y-visible  lg:w-full'}>
                <Tab
                  class={({ selected }) =>
                    selected
                      ? 'font-semibold  mr-5 border-b-2 border-primary pb-3 decoration-primary decoration-2 whitespace-nowrap dark:text-gray-200'
                      : 'font-semibold  mr-5 secondary-text  whitespace-nowrap pb-3'}>Inbox</Tab
                >
                <Tab
                  class={({ selected }) =>
                    selected
                      ? 'font-semibold mr-5 border-b-2 border-primary pb-3 decoration-primary decoration-2 whitespace-nowrap dark:text-gray-200'
                      : 'font-semibold mr-5 secondary-text whitespace-nowrap pb-3'}
                  >Sent Messages</Tab
                >
              </div>
            </TabList>

            <TabPanels>
              <TabPanel>
                {#if loading}
                  {#each arrayOfUndefs(5) as _unused}
                    <div class="w-full h-8 my-1">
                      <div class="skeleton-block" />
                    </div>
                  {/each}
                {:else if data.userInfo.receivedMessages && data.userInfo.receivedMessages.length >= 1}
                  <!-- Tablet Up View -->
                  <div class="hidden lg:flex flex-col w-full">
                    <TableHeader headerTailwindCode="messages">
                      <p class="">Date</p>
                      <p>From</p>
                      <p>Message</p>
                      <p class="text-center">Action</p>
                    </TableHeader>
                    {#each data.userInfo.receivedMessages as message, index}
                      <TableGrid headerTailwindCode="messages" {index}>
                        <button on:click={() => showMessage(message, undefined)}>
                          <p
                            class={message.viewed
                              ? 'secondary-text line-clamp-1 text-left'
                              : 'line-clamp-1 text-left font-semibold'}
                          >
                            {displayDateNumerical(message.createdAt)}
                          </p>
                        </button>
                        <button on:click={() => showMessage(message, undefined)}>
                          <p
                            class={message.viewed
                              ? 'secondary-text line-clamp-1 text-left pr-3'
                              : 'line-clamp-1 text-left font-semibold pr-3'}
                          >
                            {message.sender}
                          </p>
                        </button>
                        <button on:click={() => showMessage(message, undefined)}>
                          <p
                            class={message?.viewed
                              ? showMessageBody[index]
                                ? 'secondary-text text-left'
                                : 'line-clamp-4 secondary-text text-left'
                              : showMessageBody[index]
                              ? 'text-left'
                              : 'line-clamp-4 text-left font-semibold'}
                          >
                            {message.body}
                          </p>
                        </button>
                        <div class="flex justify-around items-center">
                          <button class="w-5 h-5 text-[#008000]" on:click={() => reply(message)}>
                            <!-- <ReplyIcon /> -->
                            Reply
                          </button>
                          <button
                            class="w-5 h-5 text-primary"
                            on:click={() => deletePhase1(message, undefined)}
                          >
                            <span class="sr-only">Delete</span>
                            <!-- <TrashIcon /> -->
                            Trash
                          </button>
                        </div>
                      </TableGrid>
                    {/each}
                  </div>
                  <!-- Mobile View -->
                  <div class="flex lg:hidden flex-col w-full px-2 text-sm">
                    {#each data.userInfo.receivedMessages as message, index}
                      <Popover class="relative first-of-type:mt-6">
                        <div class="flex w-full justify-between">
                          <PopoverButton
                            class="line-clamp-1 font-semibold text-left flex-grow-1 text-base leading-5"
                          >
                            {message.sender}
                          </PopoverButton>
                          <PopoverButton>
                            <DotsVerticalIcon class="w-5 secondary-text" />
                          </PopoverButton>
                        </div>
                        <PopoverPanel
                          class="absolute z-10 popover-background rounded-lg w-52 top-4  right-4 p-3 max-h-96 shadow-listbox-shadow"
                        >
                          <ul class="w-48 main-text text-lg mx-3 my-2">
                            <li>
                              <button
                                class="py-3 flex items-center"
                                on:click={() => {
                                  initialMessage.replyMessage = message;
                                  reply(message);
                                }}
                              >
                                <ReplyIcon class="w-5 mr-5" />

                                <p>Reply</p>
                              </button>
                            </li>
                            <li>
                              <button
                                class="py-3 flex items-center"
                                on:click={() => deletePhase1(message, undefined)}
                              >
                                <TrashIcon class="w-5 h-5 mr-5" />
                                Delete
                              </button>
                            </li>
                          </ul>
                        </PopoverPanel>
                      </Popover>
                      <button on:click={() => showMessage(message, undefined)}>
                        <p
                          class={message.viewed
                            ? 'secondary-text line-clamp-1 text-left my-2'
                            : 'line-clamp-1 text-left my-2 font-semibold'}
                        >
                          {displayDateNumerical(message.createdAt)}
                        </p>
                      </button>
                      <button on:click={() => showMessage(message, undefined)}>
                        <p
                          class={message.viewed
                            ? showMessageBody[index]
                              ? 'secondary-text text-left mb-3'
                              : 'line-clamp-4 secondary-text text-left mb-3'
                            : showMessageBody[index]
                            ? 'text-left mb-3 font-semibold'
                            : 'line-clamp-4 text-left mb-3 font-semibold'}
                        >
                          {message.body}
                        </p>
                      </button>
                      <div class="hr-div mb-6" />
                    {/each}
                  </div>
                {:else}
                  <div class=" flex items-center justify-center flex-col text-center w-full mt-4">
                    <div class="w-80 h-64">
                      <NoMessagesSvg />
                    </div>
                    <p class="font-semibold my-4">Your inbox is empty</p>
                    <p class="secondary-text lg:w-2/3">
                      That's alright. When you get one, it will appear here. Members use messages to
                      ask about products and services and to ask for a quote.
                    </p>
                  </div>
                {/if}
              </TabPanel>
              <TabPanel>
                {#if loading}
                  {#each arrayOfUndefs(5) as _unused}
                    <div class="w-full h-8 my-1">
                      <div class="skeleton-block" />
                    </div>
                  {/each}
                {:else if data.userInfo.sentMessages && data.userInfo.sentMessages.length >= 1}
                  <!-- Tablet Up View -->
                  <div class="hidden lg:flex flex-col w-full secondary-text">
                    <TableHeader headerTailwindCode="messages">
                      <p class="">Date</p>
                      <p>To</p>
                      <p>Message</p>
                      <p class="text-center">Action</p>
                    </TableHeader>

                    {#each data.userInfo.sentMessages as message, index}
                      <TableGrid headerTailwindCode="messages" {index}>
                        <button on:click={() => showMessage(undefined, message)}>
                          <p class={'line-clamp-1 text-left secondary-text'}>
                            {displayDateNumerical(message.createdAt)}
                          </p>
                        </button>
                        <button on:click={() => showMessage(undefined, message)}>
                          <p class={'line-clamp-1 text-left secondary-text pr-3'}>
                            {message.receiver}
                          </p>
                        </button>
                        <button on:click={() => showMessage(undefined, message)}>
                          <p
                            class={showSentMessageBody[index]
                              ? 'text-left secondary-text'
                              : 'line-clamp-4 text-left secondary-text'}
                          >
                            {message.body}
                          </p>
                        </button>
                        <div class="flex justify-around items-center">
                          <button
                            class="w-5 h-5 text-[#008000]"
                            style="transform: scaleY(-1);"
                            on:click={() => followUp(message)}
                          >
                            <ReplyIcon />
                            Reply
                          </button>
                          <button
                            class="w-5 h-5 text-primary"
                            on:click={() => deletePhase1(undefined, message)}
                          >
                            <span class="sr-only">Delete</span>
                            <TrashIcon />
                            Delete
                          </button>
                        </div>
                      </TableGrid>
                    {/each}
                  </div>
                  <!-- Mobile View -->
                  <div class="flex lg:hidden flex-col w-full px-2">
                    {#each data.userInfo.sentMessages as message, index}
                      <Popover class="relative first-of-type:mt-6">
                        <div class="flex w-full justify-between">
                          <PopoverButton
                            class="line-clamp-1 font-semibold text-left flex-grow-1 leading-5"
                          >
                            {message.receiver}
                          </PopoverButton>
                          <PopoverButton>
                            <DotsVerticalIcon class="w-5 secondary-text" />
                          </PopoverButton>
                        </div>
                        <PopoverPanel
                          class="absolute z-10 popover-background rounded-lg w-52 top-4  right-4 p-3 max-h-96 shadow-listbox-shadow"
                        >
                          <ul class="w-48 main-text text-lg mx-3 my-2">
                            <li>
                              <button
                                class="py-3 flex items-center"
                                on:click={() => {
                                  initialMessage.followUpMessage = message;
                                  followUp(message);
                                }}
                              >
                                <ReplyIcon class="w-5 mr-5" />
                                Follow-Up
                              </button>
                            </li>
                            <li>
                              <button
                                class="py-3 flex items-center"
                                on:click={() => deletePhase1(undefined, message)}
                              >
                                <TrashIcon class="w-5 h-5 mr-5" />
                                Delete
                              </button>
                            </li>
                          </ul>
                        </PopoverPanel>
                      </Popover>
                      <button on:click={() => showMessage(undefined, message)}>
                        <p class="secondary-text my-2 text-left text-sm">
                          {displayDateNumerical(message.createdAt)}
                        </p>
                      </button>
                      <button on:click={() => showMessage(undefined, message)}>
                        <p
                          class={showSentMessageBody[index]
                            ? 'secondary-text text-left mb-3 text-sm'
                            : 'line-clamp-4 secondary-text text-left mb-3 text-sm'}
                        >
                          {message.body}
                        </p>
                      </button>
                      <div class="hr-div mb-6" />
                    {/each}
                  </div>
                {:else}
                  <div class=" flex items-center justify-center flex-col text-center w-full mt-4">
                    <div class="w-80 h-64">
                      <NoMessagesSvg />
                    </div>
                    <p class="font-semibold my-4">Your sent messages is empty</p>
                    <p class="secondary-text lg:w-2/3">
                      That's alright. When you send one, it will appear here. Members use messages
                      to ask about products and services and to ask for a quote.
                    </p>
                  </div>
                {/if}
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <div class="flex justify-center mt-20">
            <button class="btn-primary" on:click={logout}> Log Out</button>
          </div>
        {:else}
          <div class="flex items-center mt-6 justify-center lg:justify-start">
            <button on:click={() => sendMessage()} class="btn-primary">Send Message</button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
