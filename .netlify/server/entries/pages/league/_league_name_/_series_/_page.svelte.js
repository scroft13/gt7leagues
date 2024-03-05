import { c as create_ssr_component, e as escape, f as each } from "../../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let seriesInfo;
  let leagueInfo;
  if (data.data) {
    leagueInfo = data.data;
    let multipleSeries = leagueInfo.seriesEvents;
    seriesInfo = multipleSeries.filter((x) => x.name === data.seriesName)[0];
    console.log(seriesInfo, seriesInfo.eventDetails);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>${escape(data.seriesName)}</h1>
<p>${escape(seriesInfo.eventDetails.eventInfo)}</p>
<ul>League Members
  <li>${each(seriesInfo.members, (member) => {
    return `${escape(member)}`;
  })}</li>
  <button>Join Series</button></ul>`;
});
export {
  Page as default
};
