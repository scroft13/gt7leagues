<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@rgossiaux/svelte-headlessui';
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import Form from '$lib/components/forms/Form.svelte';
  import LabeledField from '$lib/components/forms/labeledComponents/LabeledField.svelte';
  import yup from '$lib/components/forms/validation';
  import { createForm } from 'svelte-forms-lib';
  import { createEventDispatcher } from 'svelte';

  import db, { supabase } from '$lib/db';
  import { addToast } from '$lib/stores';

  export let open = false;
  const dispatch = createEventDispatcher();
  export let usernameList: string[] | undefined;

  if (!usernameList) {
    usernameList = [];
  }

  const formSchema = yup.object().shape({
    username: yup.string().required().valueNotUsed(usernameList).default(''),
  });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async (formData) => {
        db.users
          .setUsername(formData.username)
          .then((response) => {
            console.log(response);
            addToast({
              id: Math.floor(Math.random() * 100),
              dismissible: true,
              timeout: 2000,
              type: 'success',
              message: 'Your username has been set.',
            });
          })
          .catch((error: Error) => {
            console.log(error);
            addToast({
              id: Math.floor(Math.random() * 100),
              dismissible: true,
              timeout: 2000,
              type: 'error',
              message: error.message,
            });
          });
        close();
      },
    }),
    {} = formState;

  type FormData = yup.InferType<typeof formSchema>;

  function close() {
    open = false;
    setTimeout(() => {
      dispatch('close');
    }, 400);
  }

  async function logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      } else {
        close();
      }
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
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
        class="mx-4 lg:mx-16 xl:mx-40 transform rounded-md modal-background main-text overflow-y-auto mb-3 mt-12 lg:mt-[6rem]"
      >
        <div class="flex justify-end w-full mt-2">
          <button on:click|preventDefault={close} class="w-10 h-9 p-2">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
        <div class="mx-4 lg:mx-16 xl:mx-40">
          <Form context={{ ...formState, schema: formSchema }} class="w-full standard1">
            <h4 class="mt-12">Set Username</h4>
            <p>
              It looks like you don't have a username yet. Please set one now. We recommend using
              your PSN username; it makes it easier for others to find you in game.
            </p>
            <div class="hr-div" />
            <div>
              <!-- Left Hand Side Desktop Up -->
              <fieldset>
                <LabeledField
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="ex. Triple Six Racing"
                />
              </fieldset>
            </div>
            <div class="wide footer">
              <button type="submit"> Submit </button>
            </div>
            <div class="mb-4">
              <button class="text-primary font-bold" on:click={() => logout()}>Log Out</button>
            </div>
          </Form>
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
