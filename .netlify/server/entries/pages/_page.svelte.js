import { c as create_ssr_component } from "../../chunks/index3.js";
import "../../chunks/db.js";
import "../../chunks/common.js";
import "dequal/lite";
import "../../chunks/validation.js";
const index = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.username === null ? true : false;
  Intl.DateTimeFormat().resolvedOptions().timeZone;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${``}
${``}

<div id="main-div"><div class="flex gap-4 flex-col "><p class="text-primary text-4xl text-center">Welcome to GT7 Leagues</p>
    ${`<div class="w-full"><div class="h-20 my-2 mx-4"><div class="skeleton-block"></div></div></div>
      <div class="w-full"><div class="h-20 my-1 mx-4"><div class="skeleton-block"></div></div></div>
      <div class="w-full"><div class="h-[500px] lg:h-[1200px] my-2 mx-4"><div class="skeleton-block"></div></div></div>`}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
