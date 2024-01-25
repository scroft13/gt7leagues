<script lang="ts">
  import { writable } from 'svelte/store';
  import { setFormContext, type FormContextWithSchema } from '$lib/utils';

  export let context: FormContextWithSchema;

  let submitted = writable<boolean>(false);

  const {
    form,
    errors,
    touched,
    state,
    isSubmitting,
    isValid,
    isValidating,
    handleChange,
    handleSubmit,
    updateField,
    updateInitialValues,
    updateTouched,
    updateValidateField,
    validateField,
  } = context;

  setFormContext({ ...context, submitted });
</script>

<form
  on:submit={(e) => {
    $submitted = true;
    handleSubmit(e);
  }}
  {...$$restProps}
>
  <slot
    {form}
    {errors}
    {touched}
    {state}
    {submitted}
    {isValid}
    {isValidating}
    {isSubmitting}
    {handleChange}
    {handleSubmit}
    {updateField}
    {updateInitialValues}
    {updateTouched}
    {updateValidateField}
    {validateField}
  />
</form>
