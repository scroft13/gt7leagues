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
  import db from '$lib/db';
  import { addToast } from '$lib/stores';
  import { goto } from '$app/navigation';
  import type { User } from '@supabase/supabase-js';

  export let open = false;
  export let user: User;
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
    leagueAcronym: yup.string().xDigitsOnly(3).required().default(''),
    contactMethod: yup.string().required().default('GT7 Leagues'),
    leagueInfo: yup.string().default(''),
    mainLocation: yup.string().default(''),
  });
  let ownerID: string;
  let username: string;
  onMount(async () => {
    ownerID = user.id;
    username = await db.users.currentUsername(ownerID);
  });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async (formData) => {
        const leagueLink = formData.leagueName.replace(/\s/g, '');
        db.leagues
          .create({
            contactMethod: formData.contactMethod as 'Email' | 'Discord' | 'GT7 Leagues',
            leagueName: formData.leagueName,
            leagueAcronym: formData.leagueAcronym,
            leagueInfo: formData.leagueInfo,
            email: formData.email,
            discordServer: formData.discordServer,
            contactName: formData.contactName,
            hasMembers: formData.hasMembers,
            ownerId: ownerID,
            mainLocation: formData.mainLocation,
            members: [{ username: username, role: 'Manager' }],
            leagueLink: leagueLink,
            seriesEvents: [],
            singleEvents: [],
            posts: [],
          })
          .then(() => {
            addToast({
              type: 'success',
              message: 'Your League Has Been Created!',
              id: Math.floor(Math.random() * 10000),
            });
            goto('/league/' + leagueLink);
          })
          .catch((error: Error) => {
            addToast({
              type: 'error',
              message: error.message,
              id: Math.floor(Math.random() * 10000),
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
  let contactGT7: boolean;

  $: form.subscribe((x) => {
    if (x.contactMethod === 'Email') {
      contactEmail = true;
      contactGT7 = false;
    } else if (x.contactMethod === 'GT7 Leagues') {
      contactEmail = false;
      contactGT7 = true;
      x.hasMembers = true;
    } else {
      contactGT7 = false;
      contactEmail = false;
    }
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
                  placeholder="ex. Go Fast Racing"
                />
                <LabeledField
                  name="contactName"
                  label="Contact Name"
                  type="text"
                  placeholder="ex. John Buck"
                />
                <LabeledField
                  name="leagueAcronym"
                  label="League Acronym"
                  type="text"
                  placeholder="ex. GFR - Three Digits"
                  maxLength={3}
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
                {:else if !contactGT7}
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
                  label="Main Location"
                  type="text"
                  placeholder="ex. East Coast, USA"
                />
                <LabeledField
                  name="hasMembers"
                  label="Has Members"
                  type="checkbox"
                  disabled={contactGT7}
                />
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
