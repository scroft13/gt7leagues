<script lang="ts">
  import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
  import Form from '$lib/components/forms/Form.svelte';
  import LabeledTextarea from '$lib/components/forms/labeledComponents/LabeledTextarea.svelte';
  import SubmitButton from '$lib/components/forms/SubmitButton.svelte';
  import yup from '$lib/components/forms/validation';
  import db from '$lib/db';
  import type { Message } from '$lib/shared';
  import { addToast } from '$lib/stores';
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher, onMount } from 'svelte';
  import { createForm } from 'svelte-forms-lib';

  export let initialMessage: {
    replyMessage: Message | undefined;
    followUpMessage: Message | undefined;
  };
  export let open: boolean;
  let stillOpen = true;

  type FormData = yup.InferType<typeof formSchema>;

  const dispatch = createEventDispatcher();

  const formSchema = yup.object().shape({
    message: yup.string().required().default(''),
  });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({ message: '' }) as FormData,
      validationSchema: formSchema,
      onSubmit: async (formData: FormData) => {
        if ($isModified) {
          const resultData = { ...formData };
          sendMessage(resultData);
        }
      },
    }),
    { isValid, isModified } = formState;

  let openConfirmationModal = false;

  onMount(() => {
    setTimeout(() => {
      //   //todo set mark as read
      // if (stillOpen && initialMessage.message) {
      //   // account?.updateMessageAsViewed(replyMessage.message.id);
      //   dispatch('markViewed', initialMessage.message);
      // }
    }, 3000);
  });

  async function sendMessage(messageForm: FormData) {
    console.log(messageForm);
    console.log(initialMessage);
    if (initialMessage.replyMessage) {
      await db.messages
        .sendUserMessage({
          body: messageForm.message,
          createdAt: new Date(),
          receiver: initialMessage.replyMessage.sender,
          sender: initialMessage.replyMessage.receiver,
          viewed: false,
        })
        .then(() => {
          setToast();
          close();
        });
    } else if (initialMessage.followUpMessage) {
      await db.messages
        .sendUserMessage({
          body: messageForm.message,
          createdAt: new Date(),
          receiver: initialMessage.followUpMessage.receiver,
          sender: initialMessage.followUpMessage.sender,
          viewed: false,
        })
        .then(() => {
          setToast();
          close();
        });
    }
  }

  function setToast() {
    addToast({
      id: Math.floor(Math.random() * 1000),
      message: 'Message Sent!',
      type: 'success',
    });
  }

  function checkClose() {
    if ($isModified) {
      openConfirmationModal = true;
    } else {
      close();
    }
  }
  function close() {
    stillOpen = false;
    open = false;
    setTimeout(() => {
      dispatch('close');
    }, 400);
  }
</script>

<TransitionRoot as="div" show={open} appear={true}>
  <Dialog as="div" class="fixed inset-0 z-40 overflow-y-scroll" on:close={checkClose}>
    <TransitionChild
      appear={true}
      as="div"
      enter="transition-opacity ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-200 delay-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <DialogOverlay class="dialog-overlay" />
    </TransitionChild>
    <TransitionChild
      appear={true}
      as="div"
      enter="transition ease-out duration-300 transform delay-100"
      enterFrom="scale-95 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="transition ease-in duration-200 transform"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-95 opacity-0"
      class="w-full"
    >
      <div
        class="mx-4 transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-12 lg:mt-[6rem]
        lg:mx-16 xl:mx-40 lg:w-1/2"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={checkClose} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="mx-8 lg:mx-16">
          <Form context={{ ...formState, schema: formSchema }} class="standard1">
            <h4>{initialMessage.replyMessage ? 'Send Reply' : 'Send Message'}</h4>
            <hr />
            <div>
              {#if initialMessage.replyMessage}
                <fieldset>
                  <div class="lg:mt-3">
                    <p>From:</p>
                    <div class=" max-h-48 my-2 overflow-y-auto">
                      <p class="secondary-text">
                        {initialMessage.replyMessage.sender}
                      </p>
                    </div>
                    <p>Original Message:</p>
                    <div class="pr-2 max-h-48 mt-2 overflow-y-auto">
                      <p class="secondary-text">
                        {initialMessage?.replyMessage.body}
                      </p>
                    </div>
                  </div>
                </fieldset>
              {:else if initialMessage.followUpMessage}
                <fieldset>
                  <div class="lg:mt-3">
                    <p>Message to:</p>
                    <div class="max-h-64 my-2 overflow-y-auto">
                      <p class="secondary-text">
                        {initialMessage.followUpMessage.receiver}
                      </p>
                    </div>
                    <p>Original Message:</p>
                    <div class="pr-2 max-h-64 mt-2 overflow-y-auto">
                      <p class="secondary-text">
                        {initialMessage.followUpMessage.body}
                      </p>
                    </div>
                  </div>
                </fieldset>
              {/if}

              <fieldset>
                <div>
                  <LabeledTextarea
                    name={'message'}
                    label={initialMessage.replyMessage ? 'Reply Message:' : 'Follow-Up Message:'}
                  />
                </div>
              </fieldset>
            </div>

            <div class="wide footer">
              <SubmitButton
                buttonName={initialMessage.replyMessage ? 'Send Reply' : 'Send Follow-Up'}
                disabled={!$isValid || !$isModified}
                loading={false}
              />
            </div>
          </Form>
        </div>
      </div>
      {#if openConfirmationModal}
        <ConfirmationModal
          on:close={() => (openConfirmationModal = false)}
          open={openConfirmationModal}
          confirmationMessage="You have unsaved information. Are you sure you want to close?"
          on:confirmed={() => close()}
        />
      {/if}
    </TransitionChild>
  </Dialog>
</TransitionRoot>
