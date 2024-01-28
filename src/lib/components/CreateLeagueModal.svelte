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
  import { createEventDispatcher, onMount } from 'svelte';
  import LabeledRadioGroup from './forms/labeledComponents/LabeledRadioGroup.svelte';
  import { contactOptions } from '$lib/consts';
  import LabeledTextarea from './forms/labeledComponents/LabeledTextarea.svelte';
  import db, { supabase } from '$lib/db';
  import { addToast } from '$lib/stores';
  import { goto } from '$app/navigation';

  export let open = false;
  const dispatch = createEventDispatcher();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .when('contactMethod', {
        is: 'Email',
        then: (schema) => schema.required(),
      })
      .default(''),
    contactName: yup.string().required().default(''),
    discordServer: yup
      .string()
      .when('contactMethod', {
        is: 'Discord',
        then: (schema) => schema.required(),
      })
      .default(''),

    hasMembers: yup.boolean().default(false),

    leagueName: yup.string().required().default(''),
    leagueAcronym: yup.string().required().default(''),
    contactMethod: yup.string().required().default('Discord'),
    leagueInfo: yup.string().default(''),
    mainLocation: yup.string().default(''),
  });
  let ownerID: string;
  onMount(async () => {
    const user = await supabase.auth.getUser();
    user.data.user ? (ownerID = user.data.user?.id) : null;
  });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async (formData) => {
        const shortenedName = formData.leagueName.replace(/\s/g, '');
        console.log('now');
        db.leagues
          .create({
            contactMethod: formData.contactMethod as 'Email' | 'Discord',
            leagueName: formData.leagueName,
            leagueAcronym: formData.leagueAcronym,
            events: [],
            leagueInfo: formData.leagueInfo,
            email: formData.email,
            discordServer: formData.discordServer,
            contactName: formData.contactName,
            hasMembers: formData.hasMembers,
            ownerId: ownerID,
            mainLocation: formData.mainLocation,
            memberIds: [],
            shortenedName: shortenedName,
          })
          .then(() => {
            addToast({
              id: Math.floor(Math.random() * 100),
              dismissible: true,
              timeout: 2000,
              type: 'success',
              message: 'Your League Has Been Created!',
            });
            goto('/league/' + shortenedName);
          })
          .catch((error: Error) => {
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
    { form } = formState;

  type FormData = yup.InferType<typeof formSchema>;

  function close() {
    open = false;

    setTimeout(() => {
      dispatch('close');
    }, 400);
  }

  let contactEmail: boolean;

  $: form.subscribe((x) => {
    x.contactMethod === 'Email' ? (contactEmail = true) : (contactEmail = false);
  });
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
            <h4 class="mt-12">Add a League</h4>
            <div class="hr-div" />
            <div>
              <!-- Left Hand Side Desktop Up -->
              <fieldset>
                <LabeledField
                  name="leagueName"
                  label="League Name"
                  type="text"
                  placeholder="ex. Triple Six Racing"
                />
                <LabeledField
                  name="contactName"
                  label="Contact Name"
                  type="text"
                  placeholder="ex. Shaun Croft"
                />
                <LabeledField
                  name="leagueAcronym"
                  label="League Acronym"
                  type="text"
                  placeholder="ex. T6R - Three Digits Max"
                />
                <LabeledRadioGroup
                  name="contactMethod"
                  label="Primary Contact Method"
                  options={contactOptions}
                  labelClass=""
                  flexColumnsAlways={true}
                />
                {#if contactEmail}
                  <LabeledField
                    name="email"
                    label="Email"
                    type="text"
                    icon="email"
                    placeholder="Ex. yourname@domain.com"
                  />
                {:else}
                  <LabeledField
                    name="discordServer"
                    label="Discord server"
                    type="text"
                    icon=""
                    placeholder="Ex. https://discord.gg/sCCJ7DoN"
                  />
                {/if}
              </fieldset>
              <fieldset>
                <LabeledTextarea name="leagueInfo" label="League Info" />
                <LabeledField
                  name="mainLocation"
                  label="Main Timezone Location"
                  type="text"
                  placeholder="ex. East Coast, USA"
                />
                <LabeledField name="hasMembers" label="Has Members" type="checkbox" />
              </fieldset>
            </div>
            <div class="wide footer">
              <button type="submit"> Submit </button>
            </div>
          </Form>
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
