import { c as create_ssr_component, e as escape, a as add_attribute, f as each } from "../../../../chunks/index3.js";
import "../../../../chunks/common.js";
import { d as displayDateNumerical, a as displayTime } from "../../../../chunks/validation.js";
import "dequal/lite";
import "../../../../chunks/db.js";
import "../../../../chunks/stores.js";
import { marked } from "marked";
const DateSelector_svelte_svelte_type_style_lang = "";
const Calendar_svelte_svelte_type_style_lang = "";
const Time_svelte_svelte_type_style_lang = "";
const SveltyPicker_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a, _b, _c, _d, _e;
  let { data } = $$props;
  let leagueLink = (_a = data.leagueLink) !== null && _a !== void 0 ? _a : "";
  let leagueInfo = (_b = data.leagueInfo) !== null && _b !== void 0 ? _b : null;
  let user = (_c = data.user) !== null && _c !== void 0 ? _c : null;
  (_e = (_d = data.user) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : "";
  let leagueInfoDiv;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${``}
${``}
${leagueInfo && user ? `<div class="flex flex-col items-center gap-6 mx-4 lg:mx-16"><p class="text-primary text-4xl text-center">Welcome to ${escape(leagueInfo.leagueName)}</p>
    ${`<p${add_attribute("class", "mx-2 text-left relative", 0)}${add_attribute("this", leagueInfoDiv, 0)}>${escape(leagueInfo.leagueInfo)}</p>`}
    ${leagueInfo.members.find((x) => x.username === data.username) ? `<p class="secondary-text italic">Your are a member of this league</p>` : ``}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">League Series</p>
    ${leagueInfo.seriesEvents.length > 0 ? `${each(leagueInfo.seriesEvents, (series) => {
    return `<a href="${"/league/" + escape(leagueLink, true) + "/" + escape(series.name, true)}" class="flex w-full gap-2 justify-evenly flex-col lg:flex-row border lg:border-0 p-2 lg:p-0 rounded shadow-md lg:shadow-none"><p class="font-bold text-lg">${escape(series.name)}</p>
          <div class="flex flex-col gap-[1px]"><p class="italic font-medium secondary-text">${escape(displayDateNumerical(series.eventDetails.startDate ?? /* @__PURE__ */ new Date()))} - ${escape(displayDateNumerical(series.eventDetails.endDate ?? /* @__PURE__ */ new Date()))}</p>
            <p class="italic font-medium secondary-text">${escape(displayTime(series.eventDetails.startDate ?? /* @__PURE__ */ new Date()))}</p>
            <p class="italic font-medium secondary-text">Vehicle Class: ${escape(series.eventDetails.vehicleClass)}
            </p></div>
          <p class="text-lg">${escape(series.eventDetails.eventInfo)}</p>
        </a>`;
  })}` : `<p class="secondary-text">There are currently not any series scheduled</p>`}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">Single Events</p>
    ${leagueInfo.singleEvents.length > 0 ? `${each(leagueInfo.singleEvents, (event) => {
    return `<div class="flex flex-col lg:grid lg:grid-cols-checkout w-full gap-2 justify-evenly border lg:border-0 p-2 lg:p-0 rounded shadow-md lg:shadow-none"><p class="font-bold text-lg">${escape(event.singleEventTitle)}</p>
          <div class="flex flex-col gap-[1px]"><p class="italic font-medium secondary-text">${escape(displayDateNumerical(event.startDate))}</p>
            <p class="italic font-medium secondary-text">${escape(displayTime(event.startDate))}</p>
            <p class="italic font-medium secondary-text">${escape(event.vehicleClass)}
            </p></div>
          <p class="text-lg">${escape(event.eventInfo)}</p>
        </div>`;
  })}` : `<p class="secondary-text">There are currently not any single events scheduled</p>`}

    ${user.id === leagueInfo.ownerId ? `<button class="btn-primary">Add Event</button>` : `${!leagueInfo.members.find((x) => x.username === data.username) ? `<button class="btn-primary">Join League</button>` : ``}`}
    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">League Messages</p>
    ${each(leagueInfo.posts, (post) => {
    return `<div class="text-left w-full border p-2 rounded flex gap-6 flex-col lg:flex-row shadow-md"><div class="font-bold flex lg:flex-col gap-2 flex-wrap"><p>${escape(post.username)}</p>
          <p>${escape(displayDateNumerical(post.date))}</p>
          <p>${escape(displayTime(post.date))}
          </p></div>
        <div class="font-normal inline-table"><!-- HTML_TAG_START -->${marked(JSON.parse(post.message))}<!-- HTML_TAG_END --></div>
      </div>`;
  })}
    ${user.id === leagueInfo.ownerId ? `<button class="btn-primary">Add Message</button>` : `${leagueInfo.members.find((x) => x.username === data.username) ? `<button class="btn-primary">Add Message</button>` : ``}`}

    <p class="text-xl font-semibold main-text text-center lg:text-left w-full">Members</p>
    <div class="flex gap-x-6 gap-y-2 w-full flex-row flex-wrap mb-20">${each(leagueInfo.members, (member) => {
    return `<a href="${"/user/" + escape(member.username, true)}" class="flex gap-x-2 border rounded p-2"><p class="text-bold">${escape(member.username)}</p>
          <p${add_attribute("class", member.role === "Manager" ? "text-red-500" : "", 0)}>${escape(member.role)}</p>
        </a>`;
  })}</div></div>` : `<div class="w-full"><div class="h-20 my-2 mx-4"><div class="skeleton-block"></div></div></div>
  <div class="w-full"><div class="h-20 my-1 mx-4"><div class="skeleton-block"></div></div></div>
  <div class="w-full"><div class="h-[500px] lg:h-[1200px] my-2 mx-4"><div class="skeleton-block"></div></div></div>`}`;
});
export {
  Page as default
};
