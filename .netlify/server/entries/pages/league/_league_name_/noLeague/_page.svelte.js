import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/index3.js";
import { E as ExclamationCircle } from "../../../../../chunks/ExclamationCircle.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mx-4 lg:mx-16 xl:mx-40 h-[50vh] flex items-center justify-center"><div class="flex flex-col"><div class="w-full flex justify-center"><div class="w-16 text-primary">${validate_component(ExclamationCircle, "ExclamationCircleIcon").$$render($$result, {}, {}, {})}</div></div>
    <p class="text-primary text-4xl text-center">Hmmmm.....That League is not found.</p>
    <p class="text-center w-full text-xl secondary-text my-2">The league you were looking for wasn&#39;t found
    </p>

    <div class="flex justify-center gap-4 text-primary mt-2"><a href="/">Back Home</a></div></div></div>`;
});
export {
  Page as default
};
