import { k as getContext, c as create_ssr_component, d as subscribe, v as validate_component } from "../../chunks/index3.js";
import { E as ExclamationCircle } from "../../chunks/ExclamationCircle.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let urlError = $page.status === 404;
  let jsError = $page.status === 500;
  $$unsubscribe_page();
  return `<div class="mx-4 lg:mx-16 xl:mx-40 h-[50vh] flex items-center justify-center"><div class="flex flex-col">${jsError ? `<div class="w-full flex justify-center"><div class="w-16 text-primary">${validate_component(ExclamationCircle, "ExclamationCircleIcon").$$render($$result, {}, {}, {})}</div></div>
      <p class="text-primary text-4xl text-center">Error 500 - Internal Error</p>
      <p class="text-center w-full text-xl secondary-text my-2">There was an error on the page</p>` : `${urlError ? `<div class="w-full flex justify-center"><div class="w-16 text-primary">${validate_component(ExclamationCircle, "ExclamationCircleIcon").$$render($$result, {}, {}, {})}</div></div>
      <p class="text-primary text-4xl text-center">Error 404 - Page not found</p>
      <p class="text-center w-full text-xl secondary-text my-2">The page you were looking for wasn&#39;t found
      </p>` : ``}`}
    <div class="flex justify-center gap-4 text-primary mt-2"><a href="/">Back Home</a>
      <button>Contact Help</button></div></div></div>`;
});
export {
  Error$1 as default
};
