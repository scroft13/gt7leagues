<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher } from 'svelte';
  import yup from '$lib/components/forms/validation';
  import { createForm } from 'svelte-forms-lib';
  import Form from '$lib/components/forms/Form.svelte';
  import LabeledTextarea from '$lib/components/forms/labeledComponents/LabeledTextarea.svelte';
  import SubmitButton from '$lib/components/forms/SubmitButton.svelte';
  import { addToast, storedUser } from '$lib/stores';

  import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
  import db from '$lib/db';
  import type { League } from '$lib/shared';

  export let open: boolean;
  export const id: string | undefined = undefined;
  export let type: string;
  export let leagueInfo: League;
  export let username: string;
  export let leagueRole: 'Manager' | 'Racer';

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

  async function sendMessage(messageForm: FormData) {
    await db.leagues
      .addPost(leagueInfo.id ?? '', {
        date: new Date(),
        leagueRole: leagueRole,
        message: JSON.stringify(messageForm.message),
        userId: $storedUser?.user_id ?? '',
        username: username ?? '',
      })
      .then(() => setToast());
    close();
  }

  function setToast() {
    addToast({
      id: Math.floor(Math.random() * 1000),
      message: 'Message Posted!',
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
        class="mx-4 lg:w-1/2 transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-12 lg:mt-[6rem] lg:translate-x-1/2"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={checkClose} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="mx-8 lg:mx-16">
          <Form context={{ ...formState, schema: formSchema }} class="standard1">
            <h4>{type === 'League' ? 'Post League' : 'Send Direct'} Message</h4>
            <div class="hr-div" />
            <div class="wide">
              <fieldset>
                <div>
                  <LabeledTextarea name={'message'} label={'Message:'} />
                </div>
              </fieldset>
            </div>

            <div class="wide footer">
              <SubmitButton
                buttonName={`${type === 'League' ? 'Post League' : 'Send Direct'} Message`}
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
