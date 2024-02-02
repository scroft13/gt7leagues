<script lang="ts">
  import Form from '$lib/components/forms/Form.svelte';
  import LabeledPassword from '$lib/components/forms/labeledComponents/LabeledPassword.svelte';
  import yup from '$lib/components/forms/validation';
  import { supabase } from '$lib/db';
  import { createForm } from 'svelte-forms-lib';
  import type { PageData } from './$types';
  import { addToast } from '$lib/stores';
  import { goto } from '$app/navigation';

  type FormData = yup.InferType<typeof formSchema>;

  const formSchema = yup.object().shape({
    password: yup.string().password().required().default(''),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required()
      .default(''),
  });
  let submitted = false;
  let formCopy: FormData;
  const resetPassword = async () => {
    try {
      supabase.auth.updateUser({
        password: formCopy.confirmPassword,
      });
    } catch (error: any) {
      console.error('Error sending password reset email:', error.message);
    } finally {
      addToast({
        type: 'success',
        message: `Your password has been updated`,
        id: Math.floor(Math.random() * 10000),
      });
      goto('/');
    }
  };

  const formState = createForm<FormData>({
      initialValues: formSchema.cast({}) as FormData,
      validationSchema: formSchema,
      onSubmit: async () => {},
    }),
    { form } = formState;
  export let data: PageData;
  $: form.subscribe((form) => {
    formCopy = form;
  });
</script>

<div class="mx-4 lg:mx-16 xl:mx-40">
  <Form context={{ ...formState, schema: formSchema }} class="standard1">
    <h4 class="mt-12">Reset Password</h4>

    {#if data.validToken && !submitted}
      <div class="wide">
        <fieldset>
          <LabeledPassword name="password" label="Password" />

          <LabeledPassword name="confirmPassword" label="Confirm Password" />
        </fieldset>
      </div>
      <div class="wide footer">
        <button type="submit" on:click={() => resetPassword()}> Submit </button>
      </div>
    {:else if !submitted}
      <div class="text-center">
        <p class="text-2xl font-semibold">That token is expired</p>
        <a href="/" class="text-primary">Back Home</a>
      </div>
    {:else}
      <a href="/">Back Home</a>
    {/if}
  </Form>
</div>
