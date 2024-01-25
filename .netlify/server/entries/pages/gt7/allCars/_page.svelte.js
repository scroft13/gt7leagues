import { c as create_ssr_component, f as each, v as validate_component } from "../../../../chunks/index2.js";
import "d3";
import { C as CarCard } from "../../../../chunks/CarCard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allCars = [];
  let makers = [];
  return `<div class="flex flex-wrap gap-3 justify-evenly">${each(allCars, (car) => {
    return `${each(makers, (maker) => {
      return `${car.Maker === maker.ID ? `${validate_component(CarCard, "CarCard").$$render(
        $$result,
        {
          make: maker.Name,
          model: car.ShortName,
          id: car.ID
        },
        {},
        {}
      )}` : ``}`;
    })}`;
  })}</div>`;
});
export {
  Page as default
};
