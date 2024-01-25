import { c as create_ssr_component, h as compute_rest_props, q as spread, r as escape_object, e as escape, v as validate_component } from "./index2.js";
import { c as carWantedListStore } from "./stores.js";
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}>${slots.default ? slots.default({}) : ``}<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>`;
});
const options2 = { style: "currency", currency: "USD" };
const numberFormat2 = new Intl.NumberFormat("en-US", options2);
const CarCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let onList;
  let { make } = $$props;
  let { model } = $$props;
  let { price = 0 } = $$props;
  let { id } = $$props;
  let wantedCarList = [];
  if ($$props.make === void 0 && $$bindings.make && make !== void 0)
    $$bindings.make(make);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0)
    $$bindings.model(model);
  if ($$props.price === void 0 && $$bindings.price && price !== void 0)
    $$bindings.price(price);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    carWantedListStore.subscribe((x) => wantedCarList = x);
  }
  onList = wantedCarList?.find((x) => x?.id === id) === void 0;
  return `<div class="border flex flex-col items-center justify-center w-full lg:w-96 outline-1 shadow-md rounded-md"><p>${escape(make)}</p>
  <p>${escape(model)}</p>
  <p>${escape(numberFormat2.format(price).split(".")[0])}</p>
  
  <button>${onList ? `${validate_component(Heart, "HeartIcon").$$render($$result, { class: "w-5 text-red-300" }, {}, {})}` : `${validate_component(Heart, "HeartIcon").$$render($$result, { class: "w-5 text-blue-300" }, {}, {})}`}</button></div>`;
});
export {
  CarCard as C
};
