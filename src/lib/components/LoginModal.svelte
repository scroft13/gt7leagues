<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { createEventDispatcher } from 'svelte';
  import { createForm } from 'svelte-forms-lib';
  import Form from './forms/Form.svelte';
  import LabeledField from './forms/labeledComponents/LabeledField.svelte';
  import LabeledPassword from './forms/labeledComponents/LabeledPassword.svelte';
  import SubmitButton from './forms/SubmitButton.svelte';
  import yup from './forms/validation';
  import { addToast } from '$lib/stores';
  import db, { supabase } from '$lib/db';

  export let open: boolean;
  export let isLoginMode: boolean = true;
  type FormData = yup.InferType<typeof formSchema>;

  let loading = false;

  const dispatch = createEventDispatcher();
  //   let user: User | null = null;

  const formSchema = isLoginMode
    ? yup.object().shape({
        email: yup.string().required().default(''),
        password: yup.string().password().required().default(''),
        confirmPassword: yup.string().default(''),
      })
    : yup.object().shape({
        email: yup.string().required().default(''),
        password: yup.string().password().required().default(''),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), ''], 'Passwords must match')
          .required()
          .default(''),
      });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async (formData: FormData) => {
        loading = true;
        if (isLoginMode) {
          supabase.auth
            .signInWithPassword({ email: formData.email, password: formData.password })
            .then(({ data: { session }, error }) => {
              if (error) {
                addToast({
                  id: 2,
                  message: error.message,
                  type: 'error',
                  dismissible: true,
                  timeout: 20,
                });
              } else {
                close();
              }
              console.log(session?.user);
            });
          loading = false;
          return;
        } else {
          supabase.auth
            .signUp({ email: formData.email, password: formData.password })
            .catch((error) => {
              console.log(error);
            });
          supabase.auth.getSession().then(({ data: {} }) => {
            db.createUser.create(formData.email);

            addToast({
              id: 1,
              message: 'Please check confirmation email to login',
              type: 'success',
              dismissible: true,
              timeout: 20,
            });
            close();
          });
        }
      },
    }),
    { isValid, isModified } = formState;

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
          <button on:click|preventDefault={close} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        <div class="px-4 sm:px-16">
          <Form context={{ ...formState, schema: formSchema }} class="standard1">
            <h4>
              {#if isLoginMode}Login{:else}Sign Up{/if}
            </h4>
            <div class="wide">
              <fieldset>
                <LabeledField name="email" label="Email" type="text" />
                <LabeledPassword name="password" label="Password" />
                {#if !isLoginMode}
                  <LabeledPassword name="confirmPassword" label="Confirm Password" />
                {/if}
              </fieldset>
            </div>
            <div class="wide footer">
              <SubmitButton
                {loading}
                buttonName={isLoginMode ? 'Sign In' : 'Sign up'}
                disabled={!$isModified || !$isValid || loading}
              />
              {#if isLoginMode}
                <a href="/member_logins/password_reset" class="mt-6 text-primary"
                  >Forgot Password?</a
                >
              {/if}
            </div>
          </Form>
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
