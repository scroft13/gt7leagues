import { c as create_ssr_component } from "../../chunks/index3.js";
import { s as supabase } from "../../chunks/common.js";
import "dequal/lite";
import "../../chunks/validation.js";
const index = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".popup.svelte-1sfn2hr{position:absolute;top:25%;background-color:#fff;border:1px solid #ccc;padding:10px;z-index:1000}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Intl.DateTimeFormat().resolvedOptions().timeZone;
  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  if ($$props.logout === void 0 && $$bindings.logout && logout !== void 0)
    $$bindings.logout(logout);
  $$result.css.add(css);
  return `${``}

<div class="flex gap-4 flex-col items-center justify-center"><h1 class="font-bold text-xl">Welcome to GT7 Leagues</h1>

  ${`<div class="flex-row"><button class="btn-primary">Sign Up</button>
      <button class="btn-primary ml-12">Log In</button></div>`}

  <div id="ec" class="mx-4 max-h-[80vh] overflow-auto w-[90vw]"></div>
  <div id="ec2" class="mx-4 max-h-[80vh] overflow-auto w-[90vw]"></div>
  ${``}
</div>`;
});
export {
  Page as default
};
