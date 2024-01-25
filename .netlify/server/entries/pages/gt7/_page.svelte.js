import { c as create_ssr_component, q as spread, r as escape_object, a as add_attribute } from "../../../chunks/index2.js";
import { c as carWantedListStore } from "../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  {
    carWantedListStore.subscribe((x) => x);
  }
  return `<div class="">${`<p>You are not logged in. If you would like to save the cars you own, or your wanted cars for
      later, create an account.
    </p>
    <form action=""><input${spread(
    [
      { id: "email" },
      { placeholder: "Enter your Email" },
      { type: "text" },
      { step: "any" },
      { class: "pl-5" },
      escape_object($$props)
    ],
    {}
  )}${add_attribute("value", email, 0)}>
      <input${spread(
    [
      { id: "password" },
      { placeholder: "Enter your Password" },
      { type: "password" },
      { step: "any" },
      { class: "pl-5" },
      escape_object($$props)
    ],
    {}
  )}${add_attribute("value", password, 0)}></form>
    <div class="w-full flex justify-evenly m-10"><button>Log In</button>
      <button>Sign Up</button></div>`}</div>`;
});
export {
  Page as default
};
