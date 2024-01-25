import { c as create_ssr_component, e as escape, f as each, v as validate_component } from "../../../../chunks/index2.js";
import { C as CarCard } from "../../../../chunks/CarCard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hagertys = {
    dailyrace: [],
    legend: {
      cars: [
        {
          carid: "1925",
          credits: 5e5,
          estimatedays: -2,
          manufacturer: "Shelby",
          maxestimatedays: -2,
          name: "G.T.350 '65",
          new: false,
          region: "us",
          state: "normal"
        }
      ],
      date: ""
    },
    updatetimestamp: "",
    used: []
  };
  return `<div class="main-padding mx-4 lg:mx-16 xl:mx-40 "><p class="mb-4">Last Updated: ${escape(new Date(hagertys.updatetimestamp).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }))}</p>
  <div class="flex flex-wrap gap-3 justify-evenly">${each(hagertys.legend.cars, (car) => {
    return `${validate_component(CarCard, "CarCard").$$render(
      $$result,
      {
        make: car.manufacturer,
        model: car.name,
        price: car.credits,
        id: car.carid
      },
      {},
      {}
    )}`;
  })}</div></div>`;
});
export {
  Page as default
};
