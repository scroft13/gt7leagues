import { c as create_ssr_component, g as compute_rest_props, h as spread, i as escape_object, k as get_store_value, d as subscribe, e as escape, l as escape_attribute_value, a as add_attribute, v as validate_component } from "../../../chunks/index3.js";
import { w as writable, d as derived } from "../../../chunks/index2.js";
import { a as setFormContext, g as getFormContext, e as extractWrapperProps } from "../../../chunks/stores.js";
import "../../../chunks/validation.js";
import "../../../chunks/db.js";
import { dequal } from "dequal/lite";
import * as yup from "yup";
const EyeOff = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`;
});
function subscribeOnce(observable) {
  return new Promise((resolve) => {
    observable.subscribe(resolve)();
  });
}
function update(object, path, value) {
  object.update((o) => {
    set(o, path, value);
    return o;
  });
}
function cloneDeep(object) {
  return JSON.parse(JSON.stringify(object));
}
function isNullish(value) {
  return value === void 0 || value === null;
}
function isEmpty(object) {
  return isNullish(object) || Object.keys(object).length <= 0;
}
function getValues(object) {
  let results = [];
  for (const [, value] of Object.entries(object)) {
    const values = typeof value === "object" ? getValues(value) : [value];
    results = [...results, ...values];
  }
  return results;
}
function getErrorsFromSchema(initialValues, schema, errors = {}) {
  for (const key in schema) {
    switch (true) {
      case (schema[key].type === "object" && !isEmpty(schema[key].fields)): {
        errors[key] = getErrorsFromSchema(
          initialValues[key],
          schema[key].fields,
          { ...errors[key] }
        );
        break;
      }
      case schema[key].type === "array": {
        const values = initialValues && initialValues[key] ? initialValues[key] : [];
        errors[key] = values.map((value) => {
          const innerError = getErrorsFromSchema(
            value,
            schema[key].innerType.fields,
            { ...errors[key] }
          );
          return Object.keys(innerError).length > 0 ? innerError : "";
        });
        break;
      }
      default: {
        errors[key] = "";
      }
    }
  }
  return errors;
}
const deepEqual = dequal;
function assignDeep(object, value) {
  if (Array.isArray(object)) {
    return object.map((o) => assignDeep(o, value));
  }
  const copy = {};
  for (const key in object) {
    copy[key] = typeof object[key] === "object" && !isNullish(object[key]) ? assignDeep(object[key], value) : value;
  }
  return copy;
}
function set(object, path, value) {
  if (new Object(object) !== object)
    return object;
  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }
  const result = path.slice(0, -1).reduce(
    (accumulator, key, index) => new Object(accumulator[key]) === accumulator[key] ? accumulator[key] : accumulator[key] = Math.trunc(Math.abs(path[index + 1])) === +path[index + 1] ? [] : {},
    object
  );
  result[path[path.length - 1]] = value;
  return object;
}
const util = {
  assignDeep,
  cloneDeep,
  deepEqual,
  getErrorsFromSchema,
  getValues,
  isEmpty,
  isNullish,
  set,
  subscribeOnce,
  update
};
const NO_ERROR = "";
const IS_TOUCHED = true;
function isCheckbox(element) {
  return element.getAttribute && element.getAttribute("type") === "checkbox";
}
function isFileInput(element) {
  return element.getAttribute && element.getAttribute("type") === "file";
}
function resolveValue(element) {
  if (isFileInput(element)) {
    return element.files;
  } else if (isCheckbox(element)) {
    return element.checked;
  } else {
    return element.value;
  }
}
const createForm = (config) => {
  let initialValues = config.initialValues || {};
  const validationSchema = config.validationSchema;
  const validateFunction = config.validate;
  const onSubmit = config.onSubmit;
  const getInitial = {
    values: () => util.cloneDeep(initialValues),
    errors: () => validationSchema ? util.getErrorsFromSchema(initialValues, validationSchema.fields) : util.assignDeep(initialValues, NO_ERROR),
    touched: () => util.assignDeep(initialValues, !IS_TOUCHED)
  };
  const form = writable(getInitial.values());
  const errors = writable(getInitial.errors());
  const touched = writable(getInitial.touched());
  const isSubmitting = writable(false);
  const isValidating = writable(false);
  const isValid = derived(errors, ($errors) => {
    const noErrors = util.getValues($errors).every((field) => field === NO_ERROR);
    return noErrors;
  });
  const modified = derived(form, ($form) => {
    const object = util.assignDeep($form, false);
    for (let key in $form) {
      object[key] = !util.deepEqual($form[key], initialValues[key]);
    }
    return object;
  });
  const isModified = derived(modified, ($modified) => {
    return util.getValues($modified).includes(true);
  });
  function validateField(field) {
    return util.subscribeOnce(form).then((values) => validateFieldValue(field, values[field]));
  }
  function validateFieldValue(field, value) {
    updateTouched(field, true);
    if (validationSchema) {
      isValidating.set(true);
      return validationSchema.validateAt(field, get_store_value(form)).then(() => util.update(errors, field, "")).catch((error) => util.update(errors, field, error.message)).finally(() => {
        isValidating.set(false);
      });
    }
    if (validateFunction) {
      isValidating.set(true);
      return Promise.resolve().then(() => validateFunction({ [field]: value })).then(
        (errs) => util.update(errors, field, !util.isNullish(errs) ? errs[field] : "")
      ).finally(() => {
        isValidating.set(false);
      });
    }
    return Promise.resolve();
  }
  function updateValidateField(field, value) {
    updateField(field, value);
    return validateFieldValue(field, value);
  }
  function handleChange(event) {
    const element = event.target;
    const field = element.name || element.id;
    const value = resolveValue(element);
    return updateValidateField(field, value);
  }
  function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    isSubmitting.set(true);
    return util.subscribeOnce(form).then((values) => {
      if (typeof validateFunction === "function") {
        isValidating.set(true);
        return Promise.resolve().then(() => validateFunction(values)).then((error) => {
          if (util.isNullish(error) || util.getValues(error).length === 0) {
            return clearErrorsAndSubmit(values);
          } else {
            errors.set(error);
            isSubmitting.set(false);
          }
        }).finally(() => isValidating.set(false));
      }
      if (validationSchema) {
        isValidating.set(true);
        return validationSchema.validate(values, { abortEarly: false }).then(() => clearErrorsAndSubmit(values)).catch((yupErrors) => {
          if (yupErrors && yupErrors.inner) {
            const updatedErrors = getInitial.errors();
            yupErrors.inner.map(
              (error) => util.set(updatedErrors, error.path, error.message)
            );
            errors.set(updatedErrors);
          }
          isSubmitting.set(false);
        }).finally(() => isValidating.set(false));
      }
      return clearErrorsAndSubmit(values);
    });
  }
  function handleReset() {
    form.set(getInitial.values());
    errors.set(getInitial.errors());
    touched.set(getInitial.touched());
  }
  function clearErrorsAndSubmit(values) {
    return Promise.resolve().then(() => errors.set(getInitial.errors())).then(() => onSubmit(values, form, errors)).finally(() => isSubmitting.set(false));
  }
  function updateField(field, value) {
    util.update(form, field, value);
  }
  function updateTouched(field, value) {
    util.update(touched, field, value);
  }
  function updateInitialValues(newValues) {
    initialValues = newValues;
    handleReset();
  }
  return {
    form,
    errors,
    touched,
    modified,
    isValid,
    isSubmitting,
    isValidating,
    isModified,
    handleChange,
    handleSubmit,
    handleReset,
    updateField,
    updateValidateField,
    updateTouched,
    validateField,
    updateInitialValues,
    state: derived(
      [
        form,
        errors,
        touched,
        modified,
        isValid,
        isValidating,
        isSubmitting,
        isModified
      ],
      ([
        $form,
        $errors,
        $touched,
        $modified,
        $isValid,
        $isValidating,
        $isSubmitting,
        $isModified
      ]) => ({
        form: $form,
        errors: $errors,
        touched: $touched,
        modified: $modified,
        isValid: $isValid,
        isSubmitting: $isSubmitting,
        isValidating: $isValidating,
        isModified: $isModified
      })
    )
  };
};
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["context"]);
  let $$unsubscribe_submitted;
  let { context } = $$props;
  let submitted2 = writable(false);
  $$unsubscribe_submitted = subscribe(submitted2, (value) => value);
  const { form, errors, touched, state, isSubmitting, isValid, isValidating, handleChange, handleSubmit, updateField, updateInitialValues, updateTouched, updateValidateField, validateField } = context;
  setFormContext(Object.assign(Object.assign({}, context), { submitted: submitted2 }));
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  $$unsubscribe_submitted();
  return `<form${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({
    form,
    errors,
    touched,
    state,
    submitted: submitted2,
    isValid,
    isValidating,
    isSubmitting,
    handleChange,
    handleSubmit,
    updateField,
    updateInitialValues,
    updateTouched,
    updateValidateField,
    validateField
  }) : ``}</form>`;
});
const ErrorMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errors, $$unsubscribe_errors;
  const { errors } = getFormContext();
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  let { name } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$unsubscribe_errors();
  return `${$errors[name] ? `<div${spread([{ class: "error-message" }, escape_object($$props)], {})}><p${spread([{ class: "text-[#FB2424]" }, escape_object($$props)], {})}>${escape($errors[name])}</p></div>` : ``}`;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let { name } = $$props;
  let { title } = $$props;
  let { disabled } = $$props;
  const { schema, form } = getFormContext();
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  const fieldInfo = schema.fields[name].describe();
  let required = fieldInfo.tests.find((set2) => set2.name === "required") !== void 0 ? true : false;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  {
    {
      let isZip = name === "zip";
      let isState = name === "state";
      if (isZip || isState) {
        if (($form.country === "United States" || $form.country === "Canada") && fieldInfo.tests.length >= 1) {
          required = true;
        } else {
          required = false;
        }
      }
    }
  }
  {
    {
      if (fieldInfo.optional === false) {
        required = true;
      }
    }
  }
  $$unsubscribe_form();
  return `<label${spread([{ for: escape_attribute_value(name) }, escape_object($$props)], {})}><div${add_attribute(
    "class",
    disabled ? "flex items-start text-gray-200 dark:text-gray-600" : "flex items-start dark:text-gray-200",
    0
  )}>
    <!-- HTML_TAG_START -->${title}<!-- HTML_TAG_END -->
    ${required ? `<span class="text-red-400"> *</span>` : ``}</div></label>`;
});
const PasswordField = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let { name } = $$props;
  const { form, errors, handleChange } = getFormContext();
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `<div class="relative"><input${spread(
    [
      { name: escape_attribute_value(name) },
      { id: escape_attribute_value(name) },
      {
        type: escape_attribute_value("password")
      },
      { placeholder: "••••••••" },
      {
        autocomplete: escape_attribute_value(name)
      },
      {
        value: escape_attribute_value($form[name])
      },
      escape_object($$props)
    ],
    { classes: $errors[name] ? "invalid" : "" }
  )}>
  <button class="absolute right-3 top-[22px] secondary-text">${`${validate_component(EyeOff, "EyeOffIcon").$$render($$result, { class: "w-5 h-5" }, {}, {})}`}</button></div>`;
});
const LabeledPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { label } = $$props;
  let { disabled = false } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  return `<div${spread([escape_object(extractWrapperProps($$props))], {})}>${validate_component(Label, "Label").$$render($$result, { name, disabled, title: label }, {}, {})}
  ${validate_component(PasswordField, "PasswordField").$$render($$result, { name }, {}, {})}
  ${validate_component(ErrorMessage, "ErrorMessage").$$render($$result, { name }, {}, {})}</div>`;
});
let submitted = false;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const formSchema = yup.object().shape({
    password: yup.string().password().required().default(""),
    confirmPassword: yup.string().oneOf([yup.ref("password"), ""], "Passwords must match").required().default("")
  });
  const formState = createForm({
    initialValues: formSchema.cast({}),
    validationSchema: formSchema,
    onSubmit: async () => {
    }
  }), { form } = formState;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    form.subscribe((form2) => {
    });
  }
  return `<div class="mx-4 lg:mx-16 xl:mx-40">${validate_component(Form, "Form").$$render(
    $$result,
    {
      context: { ...formState, schema: formSchema },
      class: "standard1"
    },
    {},
    {
      default: () => {
        return `<h4 class="mt-12">Reset Password</h4>

    ${data.validToken && !submitted ? `<div class="wide"><fieldset>${validate_component(LabeledPassword, "LabeledPassword").$$render($$result, { name: "password", label: "Password" }, {}, {})}

          ${validate_component(LabeledPassword, "LabeledPassword").$$render(
          $$result,
          {
            name: "confirmPassword",
            label: "Confirm Password"
          },
          {},
          {}
        )}</fieldset></div>
      <div class="wide footer"><button type="submit">Submit </button></div>` : `${`<div class="text-center"><p class="text-2xl font-semibold">That token is expired</p>
        <a href="/" class="text-primary">Back Home</a></div>`}`}`;
      }
    }
  )}</div>`;
});
export {
  Page as default
};
