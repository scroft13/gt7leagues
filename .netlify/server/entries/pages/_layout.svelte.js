import { c as create_ssr_component, a as add_attribute, b as createEventDispatcher, e as escape, n as null_to_empty, v as validate_component, d as subscribe, f as each } from "../../chunks/index2.js";
import { t as toasts } from "../../chunks/stores.js";
const SuccessIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"></path></svg>`;
});
const ErrorIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" class=""></path></svg>`;
});
const InfoIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"></path></svg>`;
});
const CloseIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`;
});
const Toast_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "article.svelte-lj41qi{color:white;padding:0.75rem 1.5rem;border-radius:0.2rem;display:flex;align-items:center;margin:0 auto 0.5rem auto;width:20rem}.error.svelte-lj41qi{background:IndianRed}.success.svelte-lj41qi{background:MediumSeaGreen}.info.svelte-lj41qi{background:SkyBlue}.text.svelte-lj41qi{margin-left:1rem}button.svelte-lj41qi{color:white;background:transparent;border:0 none;padding:0;margin:0 0 0 auto;line-height:1;font-size:1rem}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { type = "error" } = $$props;
  let { dismissible = true } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.dismissible === void 0 && $$bindings.dismissible && dismissible !== void 0)
    $$bindings.dismissible(dismissible);
  $$result.css.add(css$2);
  return `<article class="${escape(null_to_empty(type), true) + " svelte-lj41qi"}" role="alert">${type === "success" ? `${validate_component(SuccessIcon, "SuccessIcon").$$render($$result, { width: "1.1em" }, {}, {})}` : `${type === "error" ? `${validate_component(ErrorIcon, "ErrorIcon").$$render($$result, { width: "1.1em" }, {}, {})}` : `${validate_component(InfoIcon, "InfoIcon").$$render($$result, { width: "1.1em" }, {}, {})}`}`}

  <div class="text svelte-lj41qi">${slots.default ? slots.default({}) : ``}</div>

  ${dismissible ? `<button class="close svelte-lj41qi">${validate_component(CloseIcon, "CloseIcon").$$render($$result, { width: "0.8em" }, {}, {})}</button>` : ``}
</article>`;
});
const Toasts_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-l93jm7{position:fixed;top:0;left:0;right:0;width:100%;display:flex;margin-top:1rem;justify-content:center;flex-direction:column;z-index:1000}",
  map: null
};
const Toasts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$result.css.add(css$1);
  $$unsubscribe_toasts();
  return `${$toasts ? `<section class="svelte-l93jm7">${each($toasts, (toast) => {
    return `${validate_component(Toast, "Toast").$$render(
      $$result,
      {
        type: toast.type,
        dismissible: toast.dismissible
      },
      {},
      {
        default: () => {
          return `${escape(toast.message)}`;
        }
      }
    )}`;
  })}</section>` : ``}`;
});
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--primary-color:44 61% 77%;--secondary-color:326 27% 71%;--tertiary-color:60 1% 42%;--surface-base:0 0% 100%;--surface-100:0 0% 96%;--surface-200:0 0% 88%;--surface-300:0 0% 80%;--text-base:0 0% 42%;--text-muted:0 0% 72%}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `

${validate_component(Toasts, "Toasts").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
