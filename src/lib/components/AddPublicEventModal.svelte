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
  export let leagueLink: string;
  export let userId: string;
  let formCopy: FormData;
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
    vehicleClass: yup.string().required().default(''),
    eventInfo: yup.string().required().default(''),
    series: yup.string().default(''),
    track: yup.string().default(''),
    singleEventTitle: yup.string().default(''),
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

    const dateStringWithTime = new Date(`${formCopy.startDate}T${formCopy.startTime}`);
    db.publicEventsList
      .insert(
        {
          leagueName: leagueName,
          isSeries: formCopy.repeatWeekly,
          durationHrs: formCopy.duration,
          startDate: dateStringWithTime,
          startTime: formCopy.startTime,
          vehicleClass: formCopy.vehicleClass,
          discordServer: formCopy.discordServer,
          id: id,
          title: leagueName + ' ' + formCopy.vehicleClass,
          createdAt: new Date(),
          endDate: formCopy.endDate ? new Date(formCopy.endDate) : new Date(formCopy.startDate),
          eventInfo: formCopy.eventInfo,
          series: formCopy.series,
          track: formCopy.track,
          singleEventTitle: formCopy.singleEventTitle,
          leagueLink: leagueLink,
        },
        userId,
      )
      .then(() => {
        if (formCopy.repeatWeekly) {
          db.leagues
            .addSeries(
              {
                name: formCopy.series,
                members: [],
                eventDetails: {
                  leagueName: leagueName,
                  isSeries: formCopy.repeatWeekly,
                  durationHrs: formCopy.duration,
                  startDate: dateStringWithTime,
                  startTime: formCopy.startTime,
                  vehicleClass: formCopy.vehicleClass,
                  discordServer: formCopy.discordServer,
                  id: id,
                  title: leagueName + ' ' + formCopy.vehicleClass,
                  createdAt: new Date(),
                  endDate: formCopy.endDate
                    ? new Date(formCopy.endDate)
                    : new Date(formCopy.startDate),
                  eventInfo: formCopy.eventInfo,
                  series: formCopy.series,
                  track: 'Revolving',
                  leagueLink: leagueLink,
                },
              },
              leagueLink,
            )
            .catch(() => (errorFlag = true));
        } else {
          db.leagues
            .addSingleEvent(
              {
                leagueName: leagueName,
                isSeries: formCopy.repeatWeekly,
                durationHrs: formCopy.duration,
                startDate: dateStringWithTime,
                startTime: formCopy.startTime,
                vehicleClass: formCopy.vehicleClass,
                discordServer: formCopy.discordServer,
                id: id,
                title: leagueName + ' ' + formCopy.vehicleClass,
                createdAt: new Date(),
                endDate: formCopy.endDate
                  ? new Date(formCopy.endDate)
                  : new Date(formCopy.startDate),
                eventInfo: formCopy.eventInfo,
                series: formCopy.series,
                track: formCopy.track,
                singleEventTitle: formCopy.singleEventTitle,
                leagueLink: leagueLink,
              },
              leagueLink,
            )
            .catch(() => (errorFlag = true));
        }
      })
      .catch(() => (errorFlag = true));

    if (!errorFlag) {
      addToast({
        type: 'success',
        message: `Your ${formCopy.repeatWeekly ? 'series' : 'event'} has been saved`,
        id: Math.floor(Math.random() * 10000),
      });
      close();
    }
  }

  $: form.subscribe((form) => {
    repeatWeekly = form.repeatWeekly;
    formCopy = form;
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
                {:else}
                  <LabeledField
                    name="singleEventTitle"
                    label="Event Title"
                    type="text"
                    placeholder="ex. Monday Night Madness"
                    class="short"
                  />
                  <LabeledField
                    name="track"
                    label="Track"
                    type="text"
                    placeholder="ex. Dragon Trail"
                    class="short"
                  />
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
