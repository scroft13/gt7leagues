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
  // import ReCaptcha from '$lib/components/ReCaptcha.svelte';
  import { createEventDispatcher } from 'svelte';
  import LabeledDateSelector from './forms/labeledComponents/LabeledDateSelector.svelte';
  import LabeledTimePicker from './forms/labeledComponents/LabeledTimePicker.svelte';
  import { vehicleClasses } from '$lib/consts';
  import LabeledCombobox from './forms/labeledComponents/LabeledCombobox.svelte';
  import db from '$lib/db';
  import { addToast } from '$lib/stores';
  import LabeledTextarea from './forms/labeledComponents/LabeledTextarea.svelte';

  export let open = false;
  export let leagueName: string;
  export let shortenedName: string;
  const dispatch = createEventDispatcher();
  const formSchema = yup.object().shape({
    contactName: yup.string().required().default(''),
    discordServer: yup.string().default(''),
    termsOfService: yup.boolean().required().default(false),
    repeatWeekly: yup.boolean().default(false),
    startDate: yup.string().required().default(''),
    endDate: yup.string().default(''),
    startTime: yup.string().required().default(''),
    duration: yup.number().required().default(0),
    contactMethod: yup.string().required().default('Discord'),
    vehicleClass: yup.string().required().default(''),
    eventInfo: yup.string().required().default(''),
    series: yup.string().default(''),
    track: yup.string().default(''),
  });

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async () => {},
    }),
    { form } = formState;

  type FormData = yup.InferType<typeof formSchema>;

  let repeatWeekly = false;

  function close() {
    open = false;

    setTimeout(() => {
      dispatch('close');
    }, 400);
  }

  function updateEvents() {
    let id: number = Math.floor(Math.random() * 100000);
    let errorFlag = false;

    form.subscribe((x) => {
      const dateStringWithTime = new Date(`${x.startDate}T${x.startTime}`);
      db.publicEventsList
        .insert({
          leagueName: leagueName,
          isSeries: x.repeatWeekly,
          durationHrs: x.duration,
          startDate: dateStringWithTime,
          startTime: x.startTime,
          vehicleClass: x.vehicleClass,
          discordServer: x.discordServer,
          id: id,
          title: leagueName + ' ' + x.vehicleClass,
          createdAt: new Date(),
          endDate: x.endDate ? new Date(x.endDate) : new Date(x.startDate),
          eventInfo: x.eventInfo,
          series: x.series,
          track: x.track,
        })
        .then(() => {
          if (x.repeatWeekly) {
            db.leagues
              .addSeries(
                {
                  name: x.series,
                  members: [],
                  eventDetails: {
                    leagueName: leagueName,
                    isSeries: x.repeatWeekly,
                    durationHrs: x.duration,
                    startDate: dateStringWithTime,
                    startTime: x.startTime,
                    vehicleClass: x.vehicleClass,
                    discordServer: x.discordServer,
                    id: id,
                    title: leagueName + ' ' + x.vehicleClass,
                    createdAt: new Date(),
                    endDate: x.endDate ? new Date(x.endDate) : new Date(x.startDate),
                    eventInfo: x.eventInfo,
                    series: x.series,
                    track: 'Revolving',
                  },
                },
                shortenedName,
              )
              .catch(() => (errorFlag = true));
          } else {
            db.leagues
              .addSingleEvent(
                {
                  leagueName: leagueName,
                  isSeries: x.repeatWeekly,
                  durationHrs: x.duration,
                  startDate: dateStringWithTime,
                  startTime: x.startTime,
                  vehicleClass: x.vehicleClass,
                  discordServer: x.discordServer,
                  id: id,
                  title: leagueName + ' ' + x.vehicleClass,
                  createdAt: new Date(),
                  endDate: x.endDate ? new Date(x.endDate) : new Date(x.startDate),
                  eventInfo: x.eventInfo,
                  series: x.series,
                  track: x.track,
                },
                shortenedName,
              )
              .catch(() => (errorFlag = true));
          }
        })
        .catch(() => (errorFlag = true));

      if (!errorFlag) {
        addToast({
          id: Math.floor(Math.random() * 100),
          dismissible: true,
          timeout: 2000,
          type: 'success',
          message: `Your ${x.repeatWeekly ? 'series' : 'event'} has been saved`,
        });
        close();
      }
    });
  }

  $: form.subscribe((x) => {
    repeatWeekly = x.repeatWeekly;
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
            <h4 class="mt-12">Add a New Event</h4>
            <div class="hr-div" />
            <div>
              <!-- Left Hand Side Desktop Up -->
              <fieldset>
                <LabeledDateSelector name="startDate" label="Start Date" />
                <LabeledTimePicker
                  name="startTime"
                  label="Start Time"
                  on:changed={(e) => {
                    formState.updateField('startTime', e.detail.startTime);
                    formState.updateValidateField('startTime', e.detail.startTime);
                  }}
                />

                <LabeledField
                  name="duration"
                  label="Duration In Hours"
                  type="text"
                  placeholder="1"
                  class="short"
                />
                <LabeledField name="repeatWeekly" label="Is Series Race" type="checkbox" />
                {#if repeatWeekly}
                  <LabeledField
                    name="series"
                    label="Series"
                    type="text"
                    placeholder="ex. Monday Night Madness"
                    class="short"
                  />
                  <LabeledDateSelector name="endDate" label="End Date" />
                {/if}
              </fieldset>
              <fieldset>
                <LabeledCombobox
                  name="vehicleClass"
                  label="Vehicle Class"
                  options={vehicleClasses}
                  placeholder="Ex. GR 3"
                  short={true}
                />
                {#if !repeatWeekly}
                  <LabeledField
                    name="track"
                    label="Track"
                    type="text"
                    placeholder="ex. Dragon Trail"
                    class="short"
                  />
                {/if}
                <!-- <LabeledRadioGroup
                  name="contactMethod"
                  label="Contact Method"
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
                {:else} -->
                <LabeledField
                  name="discordServer"
                  label="Discord server"
                  type="text"
                  icon=""
                  placeholder="Ex. https://discord.gg/sCCJ7DoN"
                />

                <LabeledTextarea name="eventInfo" label="Event Info" />
              </fieldset>
            </div>
            <div class="wide footer">
              <button type="submit" on:click={() => updateEvents()}> Submit </button>
            </div>
          </Form>
        </div>
      </div>
    </TransitionChild>
  </Dialog>
</TransitionRoot>
