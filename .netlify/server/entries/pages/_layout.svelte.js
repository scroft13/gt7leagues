import { c as create_ssr_component, a as add_attribute, b as createEventDispatcher, e as escape, n as null_to_empty, v as validate_component, d as subscribe, f as each, g as compute_rest_props, h as get_current_component, s as setContext, i as spread, j as escape_object } from "../../chunks/index3.js";
import { t as toasts, f as forwardEventsBuilder, u as useDialogContext, D as DialogStates, R as Render, a as useId, b as useTransitionContext, c as useParentNesting, T as TreeStates, N as NESTING_CONTEXT_NAME, S as State, d as useOpenClosedProvider, e as RenderStrategy, m as match, F as Features, g as useNesting, h as useOpenClosed, i as TRANSITION_CONTEXT_NAME, j as hasTransitionContext, k as hasOpenClosed, l as Dialog } from "../../chunks/common.js";
import { w as writable } from "../../chunks/index2.js";
const SuccessIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"></path></svg>`;
});
const ErrorIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" class=""></path></svg>`;
});
const InfoIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"></path></svg>`;
});
const CloseIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "1em" } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `<svg${add_attribute("width", width, 0)} style="text-align: center; display: inline-block;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`;
});
const Toast_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "article.svelte-lj41qi{color:white;padding:0.75rem 1.5rem;border-radius:0.2rem;display:flex;align-items:center;margin:0 auto 0.5rem auto;width:20rem}.error.svelte-lj41qi{background:IndianRed}.success.svelte-lj41qi{background:MediumSeaGreen}.info.svelte-lj41qi{background:SkyBlue}.text.svelte-lj41qi{margin-left:1rem}button.svelte-lj41qi{color:white;background:transparent;border:0 none;padding:0;margin:0 0 0 auto;line-height:1;font-size:1rem}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { type = "error" } = $$props;
  let { dismissible = true } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.dismissible === void 0 && $$bindings.dismissible && dismissible !== void 0)
    $$bindings.dismissible(dismissible);
  $$result.css.add(css$2);
  return `<article class="${escape(null_to_empty(type), true) + " svelte-lj41qi"}" role="alert">${type === "success" ? `${validate_component(SuccessIcon, "SuccessIcon").$$render($$result, { width: "1.1em" }, {}, {})}` : `${type === "error" ? `${validate_component(ErrorIcon, "ErrorIcon").$$render($$result, { width: "1.1em" }, {}, {})}` : `${validate_component(InfoIcon, "InfoIcon").$$render($$result, { width: "1.1em" }, {}, {})}`}`}

  <div class="text svelte-lj41qi">${slots.default ? slots.default({}) : ``}</div>

  ${dismissible ? `<button class="close svelte-lj41qi">${validate_component(CloseIcon, "CloseIcon").$$render($$result, { width: "0.8em" }, {}, {})}</button>` : ``}
</article>`;
});
const Toasts_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-l93jm7{position:fixed;top:0;left:0;right:0;width:100%;display:flex;margin-top:1rem;justify-content:center;flex-direction:column;z-index:1000}",
  map: null
};
const Toasts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$result.css.add(css$1);
  $$unsubscribe_toasts();
  return `${$toasts ? `<section class="svelte-l93jm7">${each($toasts, (toast) => {
    return `${validate_component(Toast, "Toast").$$render(
      $$result,
      {
        type: toast.type,
        dismissible: toast.dismissible
      },
      {},
      {
        default: () => {
          return `${escape(toast.message)}`;
        }
      }
    )}`;
  })}</section>` : ``}`;
});
const app = "";
const HamburgerIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-2 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>`;
});
const DialogOverlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use"]);
  let $api, $$unsubscribe_api;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = useDialogContext("DialogOverlay");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  let id = `headlessui-dialog-overlay-${useId()}`;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  propsWeControl = { id, "aria-hidden": true };
  slotProps = {
    open: $api.dialogState === DialogStates.Open
  };
  $$unsubscribe_api();
  return `${validate_component(Render, "Render").$$render($$result, Object.assign({}, { ...$$restProps, ...propsWeControl }, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "DialogOverlay" }), {}, {
    default: () => {
      return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
    }
  })}`;
});
const TransitionChild = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let strategy;
  let classes;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "use",
    "enter",
    "enterFrom",
    "enterTo",
    "entered",
    "leave",
    "leaveFrom",
    "leaveTo"
  ]);
  let $transitionContext, $$unsubscribe_transitionContext;
  let $nestingContext, $$unsubscribe_nestingContext;
  let $$unsubscribe_nesting;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  let { enter = "" } = $$props;
  let { enterFrom = "" } = $$props;
  let { enterTo = "" } = $$props;
  let { entered = "" } = $$props;
  let { leave = "" } = $$props;
  let { leaveFrom = "" } = $$props;
  let { leaveTo = "" } = $$props;
  const dispatch = createEventDispatcher();
  const forwardEvents = forwardEventsBuilder(get_current_component(), ["beforeEnter", "beforeLeave", "afterEnter", "afterLeave"]);
  let container = null;
  let transitionContext = useTransitionContext();
  $$unsubscribe_transitionContext = subscribe(transitionContext, (value) => $transitionContext = value);
  let nestingContext = useParentNesting();
  $$unsubscribe_nestingContext = subscribe(nestingContext, (value) => $nestingContext = value);
  let state = $transitionContext.initialShow || $$props.unmount !== false ? TreeStates.Visible : TreeStates.Hidden;
  let id = useId();
  let nesting = writable(useNesting(() => {
    {
      state = TreeStates.Hidden;
      $nestingContext.unregister(id);
      dispatch("afterLeave");
    }
  }));
  $$unsubscribe_nesting = subscribe(nesting, (value) => value);
  function splitClasses(classes2 = "") {
    return classes2.split(" ").filter((className) => className.trim().length > 1);
  }
  setContext(NESTING_CONTEXT_NAME, nesting);
  let openClosedState = writable(State.Closed);
  useOpenClosedProvider(openClosedState);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.enter === void 0 && $$bindings.enter && enter !== void 0)
    $$bindings.enter(enter);
  if ($$props.enterFrom === void 0 && $$bindings.enterFrom && enterFrom !== void 0)
    $$bindings.enterFrom(enterFrom);
  if ($$props.enterTo === void 0 && $$bindings.enterTo && enterTo !== void 0)
    $$bindings.enterTo(enterTo);
  if ($$props.entered === void 0 && $$bindings.entered && entered !== void 0)
    $$bindings.entered(entered);
  if ($$props.leave === void 0 && $$bindings.leave && leave !== void 0)
    $$bindings.leave(leave);
  if ($$props.leaveFrom === void 0 && $$bindings.leaveFrom && leaveFrom !== void 0)
    $$bindings.leaveFrom(leaveFrom);
  if ($$props.leaveTo === void 0 && $$bindings.leaveTo && leaveTo !== void 0)
    $$bindings.leaveTo(leaveTo);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    strategy = $$props.unmount === false ? RenderStrategy.Hidden : RenderStrategy.Unmount;
    {
      {
        (() => {
          if (strategy !== RenderStrategy.Hidden)
            return;
          if (!id)
            return;
          if ($transitionContext.show && state !== TreeStates.Visible) {
            state = TreeStates.Visible;
            return;
          }
          match(state, {
            [TreeStates.Hidden]: () => $nestingContext.unregister(id),
            [TreeStates.Visible]: () => $nestingContext.register(id)
          });
        })();
      }
    }
    splitClasses(enter);
    splitClasses(enterFrom);
    splitClasses(enterTo);
    splitClasses(entered);
    splitClasses(leave);
    splitClasses(leaveFrom);
    splitClasses(leaveTo);
    {
      openClosedState.set(match(state, {
        [TreeStates.Visible]: State.Open,
        [TreeStates.Hidden]: State.Closed
      }));
    }
    classes = `${$$props.class || ""} ${entered}`;
    $$rendered = `${validate_component(Render, "Render").$$render(
      $$result,
      Object.assign({}, $$restProps, { as }, { use: [...use, forwardEvents] }, { slotProps: {} }, { name: "TransitionChild" }, { class: classes }, { visible: state === TreeStates.Visible }, { features: Features.RenderStrategy }, { el: container }),
      {
        el: ($$value) => {
          container = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_transitionContext();
  $$unsubscribe_nestingContext();
  $$unsubscribe_nesting();
  return $$rendered;
});
const TransitionRoot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["as", "use", "show", "appear"]);
  let $$unsubscribe_nestingBag;
  let $openClosedState, $$unsubscribe_openClosedState;
  const forwardEvents = forwardEventsBuilder(get_current_component(), ["beforeEnter", "beforeLeave", "afterEnter", "afterLeave"]);
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  let { show = void 0 } = $$props;
  let { appear = false } = $$props;
  let openClosedState = useOpenClosed();
  $$unsubscribe_openClosedState = subscribe(openClosedState, (value) => $openClosedState = value);
  function computeShow(show2, openClosedState2) {
    if (show2 === void 0 && openClosedState2 !== void 0) {
      return match(openClosedState2, {
        [State.Open]: true,
        [State.Closed]: false
      });
    }
    return show2;
  }
  let shouldShow = computeShow(show, openClosedState !== void 0 ? $openClosedState : void 0);
  let initialShow = shouldShow;
  let state = shouldShow ? TreeStates.Visible : TreeStates.Hidden;
  let nestingBag = writable(useNesting(() => {
    state = TreeStates.Hidden;
  }));
  $$unsubscribe_nestingBag = subscribe(nestingBag, (value) => value);
  let initial = true;
  let transitionBag = writable();
  setContext(NESTING_CONTEXT_NAME, nestingBag);
  setContext(TRANSITION_CONTEXT_NAME, transitionBag);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.appear === void 0 && $$bindings.appear && appear !== void 0)
    $$bindings.appear(appear);
  {
    {
      shouldShow = computeShow(show, openClosedState !== void 0 ? $openClosedState : void 0);
      if (shouldShow !== true && shouldShow !== false) {
        throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
      }
    }
  }
  {
    transitionBag.set({
      show: !!shouldShow,
      appear: appear || !initial,
      initialShow: !!initialShow
    });
  }
  $$unsubscribe_nestingBag();
  $$unsubscribe_openClosedState();
  return `${state === TreeStates.Visible || $$props.unmount === false ? `${validate_component(TransitionChild, "TransitionChild").$$render($$result, Object.assign({}, $$restProps, { as }, { use: [...use, forwardEvents] }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : ``}`;
});
const TransitionChildWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const forwardEvents = forwardEventsBuilder(get_current_component(), ["beforeEnter", "beforeLeave", "afterEnter", "afterLeave"]);
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  let hasTransition = hasTransitionContext();
  let hasOpen = hasOpenClosed();
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${!hasTransition && hasOpen ? `${validate_component(TransitionRoot, "TransitionRoot").$$render($$result, Object.assign({}, $$props, { as }, { use: [...use, forwardEvents] }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : `${validate_component(TransitionChild, "TransitionChild").$$render($$result, Object.assign({}, $$props, { as }, { use: [...use, forwardEvents] }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`}`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}>${slots.default ? slots.default({}) : ``}<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
});
const SideMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sideMenuIsOpen = false } = $$props;
  if ($$props.sideMenuIsOpen === void 0 && $$bindings.sideMenuIsOpen && sideMenuIsOpen !== void 0)
    $$bindings.sideMenuIsOpen(sideMenuIsOpen);
  return `${validate_component(TransitionRoot, "TransitionRoot").$$render($$result, { as: "div", show: sideMenuIsOpen }, {}, {
    default: () => {
      return `${validate_component(Dialog, "Dialog").$$render($$result, { as: "div", class: "fixed inset-0 z-40" }, {}, {
        default: () => {
          return `${validate_component(TransitionChildWrapper, "TransitionChild").$$render(
            $$result,
            {
              as: "div",
              enter: "transition-opacity ease-linear duration-300",
              enterFrom: "opacity-0",
              enterTo: "opacity-100",
              leave: "transition-opacity ease-linear duration-300",
              leaveFrom: "opacity-100",
              leaveTo: "opacity-0"
            },
            {},
            {
              default: () => {
                return `${validate_component(DialogOverlay, "DialogOverlay").$$render(
                  $$result,
                  {
                    class: "fixed inset-0 bg-black bg-opacity-25"
                  },
                  {},
                  {}
                )}`;
              }
            }
          )}

    ${validate_component(TransitionChildWrapper, "TransitionChild").$$render(
            $$result,
            {
              as: "div",
              class: "max-w-xs md:max-w-md  w-full bg-surface-200 drop-shadow-2xl  flex flex-col overflow-y-auto absolute right-0 h-full z-40",
              enter: "transition ease-in-out duration-300 transform",
              enterFrom: "translate-x-full",
              enterTo: "-translate-x-0",
              leave: "transition ease-in-out duration-300 transform",
              leaveFrom: "translate-x-0",
              leaveTo: "translate-x-full"
            },
            {},
            {
              default: () => {
                return `<div class="flex justify-end absolute top-0 right-0"><button type="button" class="p-2 rounded-md inline-flex items-center justify-center"><span class="sr-only">Close Menu</span>
          ${validate_component(X, "XIcon").$$render($$result, { class: "h-6 w-6", "aria-hidden": "true" }, {}, {})}</button></div>
      <div class="mt-4 mx-4 flex flex-col"><a href="/">Home Page</a>
        ${``}</div>`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--primary-color:213 77% 38%;--secondary-color:350 97% 38%;--tertiary-color:60 1% 42%;--surface-base:0 0% 100%;--surface-100:0 0% 96%;--surface-200:0 0% 88%;--surface-300:0 0% 80%;--text-base:0 0% 42%;--text-muted:0 0% 72%}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sideMenuIsOpen = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Toasts, "Toasts").$$render($$result, {}, {}, {})}
${validate_component(SideMenu, "SideMenu").$$render(
      $$result,
      { sideMenuIsOpen },
      {
        sideMenuIsOpen: ($$value) => {
          sideMenuIsOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )}

<div class="w-full flex justify-end sticky"><button>${validate_component(HamburgerIcon, "HamburgerIcon").$$render($$result, {}, {}, {})}</button></div>
${slots.default ? slots.default({}) : ``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};
