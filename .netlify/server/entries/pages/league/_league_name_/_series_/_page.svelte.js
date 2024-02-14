import { c as create_ssr_component, e as escape } from "../../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let seriesInfo;
  let leagueInfo;
  if (data.data) {
    leagueInfo = data.data[0];
    let multipleSeries = leagueInfo.seriesEvents;
    seriesInfo = multipleSeries.filter((x) => x.name === data.seriesName)[0];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${escape(data.seriesName)}
${escape(data)}
${escape(seriesInfo)}`;
});
export {
  Page as default
};
