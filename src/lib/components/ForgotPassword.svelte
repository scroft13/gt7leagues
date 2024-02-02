<script lang="ts">
  import { supabase } from '$lib/db';
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher } from 'svelte';
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';
  import SubmitButton from './forms/SubmitButton.svelte';
  import LabeledField from './forms/labeledComponents/LabeledField.svelte';
  import Form from './forms/Form.svelte';
  import { addToast } from '$lib/stores';

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });
  let loading = false;

  const resetPassword = async (email: string) => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://www.gt7leagues.com/password-reset',
      });
      console.log('Password reset email sent successfully');
    } catch (error: any) {
      console.error('Error sending password reset email:', error.message);
    }
  };
  const initialValues = { email: '' };
  type FormData = yup.InferType<typeof schema>;

  const formState = createForm<FormData>({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: async (formData: FormData) => {
        loading = true;
        resetPassword(formData.email);
        addToast({
          type: 'success',
          message: `Please check your inbox to proceed.`,
          id: Math.floor(Math.random() * 10000),
        });
        close();
      },
    }),
    { isModified, isValid } = formState;

  export let open: boolean;
  const dispatch = createEventDispatcher();

  function close() {
    open = false;
    setTimeout(() => {
      dispatch('close');
    }, 400);
  }
</script>

<TransitionRoot as="div" show={open} appear={true}>
  <Dialog as="div" class="fixed inset-0 z-40 overflow-y-scroll" on:close={close}>
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
      enter="transition ease-out duration-200 transform delay-100"
      enterFrom="scale-95 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="transition ease-in duration-200 transform"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-95 opacity-0"
      class="w-full"
    >
      <div
        class="mx-auto transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-12 lg:mt-[6rem] w-fit"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={close} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        <div class="mx-4 lg:mx-16 xl:mx-40">
          <Form context={{ ...formState, schema: schema }} class="standard1">
            <h4 class="mt-12">Request Password Reset Link</h4>
            <div class="hr-div" />
            <div class="wide">
              <fieldset>
                <LabeledField label="Email" name="email" type="text" class="short" />
              </fieldset>
            </div>
            <div class="wide footer">
              <SubmitButton
                {loading}
                buttonName={'Submit'}
                disabled={!$isModified || !$isValid || loading}
              />
            </div>
          </Form>
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
