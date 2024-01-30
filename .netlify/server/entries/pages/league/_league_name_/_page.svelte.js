import { c as create_ssr_component, g as compute_rest_props, i as spread, j as escape_object, e as escape, a as add_attribute, v as validate_component, f as each } from "../../../../chunks/index3.js";
import "../../../../chunks/common.js";
import "../../../../chunks/validation.js";
import "dequal/lite";
import "../../../../chunks/db.js";
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 20 20" },
      { fill: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
});
const DateSelector_svelte_svelte_type_style_lang = "";
const Calendar_svelte_svelte_type_style_lang = "";
const Time_svelte_svelte_type_style_lang = "";
const SveltyPicker_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let shortenedName = data.shortenedName ?? "";
  let leagueInfo = data.leagueInfo ?? null;
  let user = data.user ?? null;
  console.log(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${``}
${leagueInfo && user ? `<div class="flex flex-col items-center gap-6 mx-4 lg:mx-16"><p class="text-primary text-4xl text-center">Welcome to ${escape(leagueInfo.leagueName)}</p>
    ${`<p${add_attribute(
    "class",
    "mx-2 max-h-[4.5rem] overflow-hidden relative",
    0
  )}>${escape(leagueInfo.leagueInfo)}
        ${`<span class="absolute top-12 bg-white pl-1 right-0">...       </span>`}</p>
      <button class="w-10 h-10 place-self-end -mt-6">${`${validate_component(ChevronDown, "ChevronDown").$$render($$result, { class: "text-blue-500" }, {}, {})}`}</button>`}
    ${leagueInfo.memberIds.find((x) => x === user?.email) ? `Your are a member of this league` : ``}
    <p class="text-lg font-semibold main-text text-center lg:text-left w-full">League Series</p>
    ${each(leagueInfo.seriesEvents, (series) => {
    return `<a href="${"/league/" + escape(shortenedName, true) + "/" + escape(series.name, true)}">${escape(series.name)}</a>`;
  })}
    <p class="text-lg font-semibold main-text text-center lg:text-left w-full">Single Events</p>
    ${each(leagueInfo.singleEvents, (event) => {
    return `${escape(event.title)}`;
  })}

    ${user.id === leagueInfo.ownerId ? `<button class="btn-primary">Add Event</button>` : `${!leagueInfo.memberIds.find((x) => x === user?.email) ? `<button class="btn-primary">Join League</button>` : ``}`}</div>` : `<div class="w-full"><div class="h-20 my-2 mx-4"><div class="skeleton-block"></div></div></div>
  <div class="w-full"><div class="h-20 my-1 mx-4"><div class="skeleton-block"></div></div></div>
  <div class="w-full"><div class="h-[500px] lg:h-[1200px] my-2 mx-4"><div class="skeleton-block"></div></div></div>`}`;
});
export {
  Page as default
};
