<script lang="ts">
  import { page } from '$app/stores';
  import Form from '$lib/components/forms/Form.svelte';
  import LabeledTextarea from '$lib/components/forms/labeledComponents/LabeledTextarea.svelte';
  import SubmitButton from '$lib/components/forms/SubmitButton.svelte';
  import yup from '$lib/components/forms/validation';
  import { addToast } from '$lib/stores';
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher } from 'svelte';
  import { createForm } from 'svelte-forms-lib';
  import ConfirmationModal from './ConfirmationModal.svelte';
  export let open: boolean;

  type FormData = yup.InferType<typeof formSchema>;

  const account = $page.data.account;

  const dispatch = createEventDispatcher();

  let image: HTMLImageElement | undefined;
  let url = $page.url.pathname;

  $: {
    if ($account?.assistant.photoUrl) {
      const img = new Image();
      img.src = $account.assistant.photoUrl;
      image = img;
    } else {
      image = undefined;
    }
  }

  const formSchema = yup.object().shape({
    message: yup.string().required().default(''),
  });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async (formData: FormData) => {
        loading = true;
        account?.sendSupportMessage({ message: formData.message, url: url }).then(
          () => {
            addToast({
              id: 1234,
              dismissible: true,
              timeout: 2000,
              type: 'success',
              message: 'Your Message Has Been Sent',
            });
            close();
          },
          (error: Error) =>
            addToast({
              id: Math.floor(Math.random() * 100),
              message: error.message,
              type: 'error',
              dismissible: true,
              timeout: 5000,
            }),
        );
        loading = false;
      },
    }),
    { isValid, isModified } = formState;

  let loading = false;
  let openConfirmationModal = false;

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
        class="mx-4 sm:mx-auto sm:max-w-lg transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-12 lg:mt-[6rem]"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={checkClose} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        <div class="px-4 sm:px-16">
          <Form context={{ ...formState, schema: formSchema }} class="standard1">
            <h4>Need Assistance? We're here to help.</h4>
            <hr />

            <div class="wide">
              <fieldset class="wide">
                <LabeledTextarea name="message" label="Message" class="half_size" />
              </fieldset>
            </div>
            <div class="wide footer">
              <SubmitButton
                {loading}
                buttonName="Submit"
                disabled={!$isModified || !$isValid || loading}
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
