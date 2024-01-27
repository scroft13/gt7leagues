import { c as create_ssr_component, e as escape } from "../../../../chunks/index.js";
import "../../../../chunks/common.js";
import "../../../../chunks/validation.js";
import "dequal/lite";
const DateSelector_svelte_svelte_type_style_lang = "";
const Calendar_svelte_svelte_type_style_lang = "";
const Time_svelte_svelte_type_style_lang = "";
const SveltyPicker_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data.leagueName);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${``}

<h1>${escape(data.leagueName)}</h1>

<div class="w-20"><button class="btn-primary">Add Event</button></div>`;
});
export {
  Page as default
};
