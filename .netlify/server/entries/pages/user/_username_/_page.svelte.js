import { c as create_ssr_component, g as compute_rest_props, h as spread, i as escape_object, o as get_current_component, d as subscribe, s as setContext, v as validate_component, j as getContext, p as noop, b as createEventDispatcher, q as globals, a as add_attribute, e as escape, f as each } from "../../../../chunks/index3.js";
import "../../../../chunks/db.js";
import { faUser, faPaintbrush } from "@fortawesome/free-solid-svg-icons";
import { s as storedUser } from "../../../../chunks/stores.js";
import { f as forwardEventsBuilder, u as usePopoverContext, a as useOpenClosed, S as State, P as PopoverStates, b as focusIn, F as Focus, R as Render, c as Features, d as usePopoverGroupContext, e as useId, g as Popover } from "../../../../chunks/common.js";
import { w as writable } from "../../../../chunks/index2.js";
import { d as displayDateNumerical } from "../../../../chunks/validation.js";
import "dequal/lite";
const DotsVertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>`;
});
const Reply = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>`;
});
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { viewBox: "0 0 24 24" },
      { stroke: "currentColor" },
      { "aria-hidden": "true" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
});
function resolveButtonType(props, ref) {
  if (props.type)
    return props.type;
  let tag = props.as ?? "button";
  if (typeof tag === "string" && tag.toLowerCase() === "button")
    return "button";
  if (ref && ref instanceof HTMLButtonElement)
    return "button";
  return void 0;
}
const POPOVER_PANEL_CONTEXT_NAME = "headlessui-popover-panel-context";
function usePopoverPanelContext() {
  return getContext(POPOVER_PANEL_CONTEXT_NAME);
}
const PopoverPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visible;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use", "focus"]);
  let $api, $$unsubscribe_api;
  let $$unsubscribe_apiButton;
  let $panelStore, $$unsubscribe_panelStore;
  let $openClosedState, $$unsubscribe_openClosedState;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  let { focus = false } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = usePopoverContext("PopoverPanel");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  setContext(POPOVER_PANEL_CONTEXT_NAME, $api.panelId);
  let panelStore = $api.panel;
  $$unsubscribe_panelStore = subscribe(panelStore, (value) => $panelStore = value);
  let apiButton = $api.button;
  $$unsubscribe_apiButton = subscribe(apiButton, (value) => value);
  let openClosedState = useOpenClosed();
  $$unsubscribe_openClosedState = subscribe(openClosedState, (value) => $openClosedState = value);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0)
    $$bindings.focus(focus);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    visible = openClosedState !== void 0 ? $openClosedState === State.Open : $api.popoverState === PopoverStates.Open;
    {
      (() => {
        if (!focus)
          return;
        if ($api.popoverState !== PopoverStates.Open)
          return;
        if (!$panelStore)
          return;
        let activeElement = document.activeElement;
        if ($panelStore.contains(activeElement))
          return;
        focusIn($panelStore, Focus.First);
      })();
    }
    slotProps = {
      open: $api.popoverState === PopoverStates.Open,
      close: $api.close
    };
    $$rendered = `
${validate_component(Render, "Render").$$render(
      $$result,
      Object.assign(
        {},
        $$restProps,
        { id: $api.panelId },
        { as },
        { slotProps },
        { use: [...use, forwardEvents] },
        { name: "PopoverPanel" },
        { visible },
        {
          features: Features.RenderStrategy | Features.Static
        },
        { el: $panelStore }
      ),
      {
        el: ($$value) => {
          $panelStore = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_apiButton();
  $$unsubscribe_panelStore();
  $$unsubscribe_openClosedState();
  return $$rendered;
});
const PopoverButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let type;
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use", "disabled"]);
  let $api, $$unsubscribe_api;
  let $apiPanel, $$unsubscribe_apiPanel;
  let $ourStore, $$unsubscribe_ourStore = noop, $$subscribe_ourStore = () => ($$unsubscribe_ourStore(), $$unsubscribe_ourStore = subscribe(ourStore, ($$value) => $ourStore = $$value), ourStore);
  let $$unsubscribe_apiButton;
  let { as = "button" } = $$props;
  let { use = [] } = $$props;
  let { disabled = false } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = usePopoverContext("PopoverButton");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  let apiButton = $api.button;
  $$unsubscribe_apiButton = subscribe(apiButton, (value) => value);
  let ourStore = apiButton;
  $$subscribe_ourStore();
  let groupContext = usePopoverGroupContext();
  groupContext?.closeOthers;
  let panelContext = usePopoverPanelContext();
  let isWithinPanel = panelContext === null ? false : panelContext === $api.panelId;
  if (isWithinPanel) {
    $$subscribe_ourStore(ourStore = writable());
  }
  let apiPanel = $api.panel;
  $$unsubscribe_apiPanel = subscribe(apiPanel, (value) => $apiPanel = value);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    type = resolveButtonType({ type: $$props.type, as }, $ourStore);
    propsWeControl = isWithinPanel ? { type } : {
      id: $api.buttonId,
      type,
      "aria-expanded": disabled ? void 0 : $api.popoverState === PopoverStates.Open,
      "aria-controls": $apiPanel ? $api.panelId : void 0,
      disabled: disabled ? true : void 0
    };
    slotProps = {
      open: $api.popoverState === PopoverStates.Open
    };
    $$rendered = `

${validate_component(Render, "Render").$$render(
      $$result,
      Object.assign({}, $$restProps, propsWeControl, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "PopoverButton" }, { el: $ourStore }),
      {
        el: ($$value) => {
          $ourStore = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_apiPanel();
  $$unsubscribe_ourStore();
  $$unsubscribe_apiButton();
  return $$rendered;
});
const { Object: Object_1$2 } = globals;
const TABS_CONTEXT_NAME = "headlessui-tabs-context";
function useTabsContext(component) {
  let context = getContext(TABS_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error(`<${component} /> is missing a parent <TabGroup /> component.`);
  }
  return context;
}
const TabGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use", "defaultIndex", "vertical", "manual"]);
  let $listRef, $$unsubscribe_listRef;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  let { defaultIndex = 0 } = $$props;
  let { vertical = false } = $$props;
  let { manual = false } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component(), ["change"]);
  const dispatch = createEventDispatcher();
  let selectedIndex = null;
  let tabs = [];
  let panels = [];
  let listRef = writable(null);
  $$unsubscribe_listRef = subscribe(listRef, (value) => $listRef = value);
  let api = writable({
    selectedIndex,
    orientation: vertical ? "vertical" : "horizontal",
    activation: manual ? "manual" : "auto",
    tabs,
    panels,
    listRef,
    setSelectedIndex(index) {
      if (selectedIndex === index)
        return;
      selectedIndex = index;
      dispatch("change", index);
    },
    registerTab(tab) {
      if (tabs.includes(tab))
        return;
      if (!$listRef) {
        tabs = [...tabs, tab];
        return;
      }
      let currentSelectedTab = selectedIndex !== null ? tabs[selectedIndex] : null;
      let orderMap = Array.from($listRef.querySelectorAll('[id^="headlessui-tabs-tab-"]')).reduce((lookup, element, index) => Object.assign(lookup, { [element.id]: index }), {});
      let nextTabs = [...tabs, tab];
      nextTabs.sort((a, z) => orderMap[a.id] - orderMap[z.id]);
      tabs = nextTabs;
      selectedIndex = (() => {
        if (currentSelectedTab === null)
          return null;
        return tabs.indexOf(currentSelectedTab);
      })();
    },
    unregisterTab(tab) {
      tabs = tabs.filter((t) => t !== tab);
    },
    registerPanel(panel) {
      if (!panels.includes(panel))
        panels = [...panels, panel];
    },
    unregisterPanel(panel) {
      panels = panels.filter((p) => p !== panel);
    }
  });
  setContext(TABS_CONTEXT_NAME, api);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.defaultIndex === void 0 && $$bindings.defaultIndex && defaultIndex !== void 0)
    $$bindings.defaultIndex(defaultIndex);
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0)
    $$bindings.vertical(vertical);
  if ($$props.manual === void 0 && $$bindings.manual && manual !== void 0)
    $$bindings.manual(manual);
  {
    api.update((obj) => {
      return {
        ...obj,
        selectedIndex,
        orientation: vertical ? "vertical" : "horizontal",
        activation: manual ? "manual" : "auto",
        tabs,
        panels
      };
    });
  }
  slotProps = { selectedIndex };
  $$unsubscribe_listRef();
  return `${validate_component(Render, "Render").$$render($$result, Object_1$2.assign({}, $$restProps, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "TabGroup" }), {}, {
    default: () => {
      return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
    }
  })}`;
});
const { Object: Object_1$1 } = globals;
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let myIndex;
  let selected;
  let myPanelRef;
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use", "disabled"]);
  let $api, $$unsubscribe_api;
  let $myPanelRef, $$unsubscribe_myPanelRef = noop, $$subscribe_myPanelRef = () => ($$unsubscribe_myPanelRef(), $$unsubscribe_myPanelRef = subscribe(myPanelRef, ($$value) => $myPanelRef = $$value), myPanelRef);
  let { as = "button" } = $$props;
  let { use = [] } = $$props;
  let { disabled = false } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = useTabsContext("Tab");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  let id = `headlessui-tabs-tab-${useId()}`;
  let tabRef = null;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    myIndex = tabRef ? $api.tabs.indexOf(tabRef) : -1;
    selected = myIndex === $api.selectedIndex;
    $$subscribe_myPanelRef(myPanelRef = $api.panels[myIndex]?.ref);
    propsWeControl = {
      id,
      role: "tab",
      type: resolveButtonType({ type: $$props.type, as }, tabRef),
      "aria-controls": $myPanelRef ? $api.panels[myIndex]?.id : void 0,
      "aria-selected": selected,
      tabIndex: selected ? 0 : -1,
      disabled: disabled ? true : void 0
    };
    slotProps = { selected };
    $$rendered = `${validate_component(Render, "Render").$$render(
      $$result,
      Object_1$1.assign({}, { ...$$restProps, ...propsWeControl }, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "Tab" }, { el: tabRef }),
      {
        el: ($$value) => {
          tabRef = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_myPanelRef();
  return $$rendered;
});
const TabList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use"]);
  let $api, $$unsubscribe_api;
  let $listRef, $$unsubscribe_listRef;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = useTabsContext("TabList");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  let listRef = $api.listRef;
  $$unsubscribe_listRef = subscribe(listRef, (value) => $listRef = value);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    propsWeControl = {
      role: "tablist",
      "aria-orientation": $api.orientation
    };
    slotProps = { selectedIndex: $api.selectedIndex };
    $$rendered = `${validate_component(Render, "Render").$$render(
      $$result,
      Object.assign({}, { ...$$restProps, ...propsWeControl }, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "TabList" }, { el: $listRef }),
      {
        el: ($$value) => {
          $listRef = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_listRef();
  return $$rendered;
});
const TabPanels = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use"]);
  let $api, $$unsubscribe_api;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let api = useTabsContext("TabPanels");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  slotProps = { selectedIndex: $api.selectedIndex };
  $$unsubscribe_api();
  return `${validate_component(Render, "Render").$$render($$result, Object.assign({}, $$restProps, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "TabPanels" }), {}, {
    default: () => {
      return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
    }
  })}`;
});
const { Object: Object_1 } = globals;
const TabPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let panelData;
  let myIndex;
  let selected;
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use"]);
  let $api, $$unsubscribe_api;
  let $elementRef, $$unsubscribe_elementRef;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let elementRef = writable(null);
  $$unsubscribe_elementRef = subscribe(elementRef, (value) => $elementRef = value);
  let api = useTabsContext("TabPanel");
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  let id = `headlessui-tabs-panel-${useId()}`;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    panelData = { id, ref: elementRef };
    myIndex = $api.panels.indexOf(panelData);
    selected = myIndex === $api.selectedIndex;
    propsWeControl = {
      id,
      role: "tabpanel",
      "aria-labelledby": $api.tabs[myIndex]?.id,
      tabIndex: selected ? 0 : -1
    };
    slotProps = { selected };
    $$rendered = `${validate_component(Render, "Render").$$render(
      $$result,
      Object_1.assign(
        {},
        { ...$$restProps, ...propsWeControl },
        { as },
        { use: [...use, forwardEvents] },
        { name: "TabPanel" },
        { slotProps },
        { visible: selected },
        {
          features: Features.RenderStrategy | Features.Static
        },
        { el: $elementRef }
      ),
      {
        el: ($$value) => {
          $elementRef = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_elementRef();
  return $$rendered;
});
const parseNumber = parseFloat;
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss(
    [
      `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
      `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
      rotate && `rotate(${rotate}${rotateUnit})`
    ],
    " "
  );
}
const fa_svelte_svelte_type_style_lang = "";
const css = {
  code: ".spin.svelte-1w3t65e{-webkit-animation:svelte-1w3t65e-spin 2s 0s infinite linear;animation:svelte-1w3t65e-spin 2s 0s infinite linear}.pulse.svelte-1w3t65e{-webkit-animation:svelte-1w3t65e-spin 1s infinite steps(8);animation:svelte-1w3t65e-spin 1s infinite steps(8)}@-webkit-keyframes svelte-1w3t65e-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes svelte-1w3t65e-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}",
  map: null
};
const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  let { id = "" } = $$props;
  let { style = "" } = $$props;
  let { icon } = $$props;
  let { size = "" } = $$props;
  let { color = "" } = $$props;
  let { fw = false } = $$props;
  let { pull = "" } = $$props;
  let { scale = 1 } = $$props;
  let { translateX = 0 } = $$props;
  let { translateY = 0 } = $$props;
  let { rotate = "" } = $$props;
  let { flip = false } = $$props;
  let { spin = false } = $$props;
  let { pulse = false } = $$props;
  let { primaryColor = "" } = $$props;
  let { secondaryColor = "" } = $$props;
  let { primaryOpacity = 1 } = $$props;
  let { secondaryOpacity = 0.4 } = $$props;
  let { swapOpacity = false } = $$props;
  let i;
  let s;
  let transform;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
    $$bindings.fw(fw);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
    $$bindings.pull(pull);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
    $$bindings.translateX(translateX);
  if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
    $$bindings.translateY(translateY);
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
    $$bindings.rotate(rotate);
  if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
    $$bindings.flip(flip);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
    $$bindings.spin(spin);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
    $$bindings.pulse(pulse);
  if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
    $$bindings.primaryColor(primaryColor);
  if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
    $$bindings.secondaryColor(secondaryColor);
  if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
    $$bindings.primaryOpacity(primaryOpacity);
  if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
    $$bindings.secondaryOpacity(secondaryOpacity);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
    $$bindings.swapOpacity(swapOpacity);
  $$result.css.add(css);
  i = icon && icon.icon || [0, 0, "", [], ""];
  s = getStyles(style, size, pull, fw);
  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
  return `${i[4] ? `<svg${add_attribute("id", id || void 0, 0)} class="${[
    "svelte-fa " + escape(clazz, true) + " svelte-1w3t65e",
    (pulse ? "pulse" : "") + " " + (spin ? "spin" : "")
  ].join(" ").trim()}"${add_attribute("style", s, 0)} viewBox="${"0 0 " + escape(i[0], true) + " " + escape(i[1], true)}" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="${"translate(" + escape(i[0] / 2, true) + " " + escape(i[1] / 2, true) + ")"}" transform-origin="${escape(i[0] / 4, true) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string" ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>` : `
          <path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>
          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>`}</g></g></svg>` : ``}`;
});
const NoMessagesSvg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg viewBox="0 0 234 179" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)"><ellipse cx="115.097" cy="144.953" rx="85.823" ry="16.556" fill="#1F88F8" fill-opacity=".35"></ellipse></g><path d="M116.039 178c49.153 0 89-39.847 89-89s-39.847-89-89-89-89 39.847-89 89 39.847 89 89 89Z" fill="url(#b)"></path><g filter="url(#c)"><path d="m190.588 60.23-76.267 53.225-76.266-53.224 69.816-48.743a11.287 11.287 0 0 1 12.907 0l13.927 9.736 3.646 2.532 36.716 25.637 3.867 2.716 11.654 8.122Z" fill="url(#d)"></path></g><path d="m101.921 104.802-63.866 45.413V60.231l63.866 44.571Z" fill="url(#e)"></path><g filter="url(#f)"><ellipse cx="151.586" cy="58.454" rx="28.383" ry="9.123" fill="#FF4C77" fill-opacity=".3"></ellipse></g><path d="m126.734 104.802 63.866 45.413V60.231l-63.866 44.571Z" fill="url(#g)"></path><path d="m38.055 150.215 69.734-49.578a11.265 11.265 0 0 1 13.072 0l69.727 49.578H38.055Z" fill="url(#h)"></path><path d="M147.053 49.158c0-1.33.169-2.456.507-3.38.338-.923.755-1.723 1.251-2.4.495-.697.98-1.34 1.453-1.925.495-.586.912-1.183 1.25-1.791.338-.609.507-1.318.507-2.13 0-1.08-.27-1.892-.811-2.432-.518-.564-1.307-.845-2.366-.845-.563 0-1.047.112-1.453.338a2.186 2.186 0 0 0-.878.98c-.181.405-.271.935-.271 1.588h-3.075c0-1.104.237-2.073.71-2.906a5.221 5.221 0 0 1 2.027-1.994c.856-.473 1.836-.71 2.94-.71 1.217 0 2.287.248 3.211.744a5.328 5.328 0 0 1 2.163 2.129c.518.9.777 1.937.777 3.109 0 .968-.169 1.79-.507 2.467a10.462 10.462 0 0 1-1.25 1.926 76.288 76.288 0 0 0-1.454 1.858c-.495.631-.912 1.375-1.25 2.23-.338.857-.507 1.904-.507 3.144h-2.974Zm0 .777v-.777h2.974v.777h-2.974Zm1.487 6.083c-.585 0-1.07-.192-1.453-.575-.36-.383-.541-.856-.541-1.42 0-.562.181-1.036.541-1.419.383-.405.868-.608 1.453-.608.563 0 1.037.203 1.42.608.405.383.608.857.608 1.42s-.203 1.036-.608 1.42c-.383.382-.857.574-1.42.574Z" fill="#fff"></path><g filter="url(#i)"><path d="M46.114 43.925a109.905 109.905 0 0 1-37.117 9.947c1.738 4.039 14.085 24.259 50.736 40.92.991.152 23.879-10.496 36.439-17.797-.427.61-39.015-13.589-50.058-33.07Z" fill="url(#j)"></path></g><path d="M152.463 66.055c14.055 0 25.448-11.394 25.448-25.448s-11.393-25.448-25.448-25.448c-14.054 0-25.447 11.394-25.447 25.448s11.393 25.448 25.447 25.448Z" fill="url(#k)"></path><path d="M150.674 48.642c0-1.652.21-3.052.63-4.2.42-1.148.938-2.142 1.554-2.982a48.341 48.341 0 0 1 1.806-2.394 13.925 13.925 0 0 0 1.554-2.226c.42-.756.63-1.638.63-2.646 0-1.344-.336-2.352-1.008-3.024-.644-.7-1.624-1.05-2.94-1.05-.7 0-1.302.14-1.806.42-.476.28-.84.686-1.092 1.218-.224.504-.336 1.162-.336 1.974h-3.822c0-1.372.294-2.576.882-3.612a6.494 6.494 0 0 1 2.52-2.478c1.064-.588 2.282-.882 3.654-.882 1.512 0 2.842.308 3.99.924a6.61 6.61 0 0 1 2.688 2.646c.644 1.12.966 2.408.966 3.864 0 1.204-.21 2.226-.63 3.066a12.96 12.96 0 0 1-1.554 2.394 96.526 96.526 0 0 0-1.806 2.31c-.616.784-1.134 1.708-1.554 2.772-.42 1.064-.63 2.366-.63 3.906h-3.696Zm0 .966v-.966h3.696v.966h-3.696Zm1.848 7.56c-.728 0-1.33-.238-1.806-.714-.448-.476-.672-1.064-.672-1.764s.224-1.288.672-1.764c.476-.504 1.078-.756 1.806-.756.7 0 1.288.252 1.764.756a2.33 2.33 0 0 1 .756 1.764c0 .7-.252 1.288-.756 1.764-.476.476-1.064.714-1.764.714Z" fill="#fff"></path><path d="M47.023 53.978a2.099 2.099 0 0 0-1.843-.272l-20.456 6.618a1.088 1.088 0 0 0-.501 1.732 1.496 1.496 0 0 0 1.634.457l20.978-7.185a.763.763 0 0 0 .188-1.35ZM46.663 62.13a1.931 1.931 0 0 0-1.938-.423l-14.162 4.766a.94.94 0 0 0-.426 1.49c.342.415.905.575 1.415.402l14.856-5.058a.702.702 0 0 0 .255-1.177ZM54.265 66.166a1.988 1.988 0 0 0-1.921-.317L36.03 71.778a.947.947 0 0 0-.365 1.54c.357.38.907.509 1.396.33l17-6.24a.723.723 0 0 0 .203-1.242ZM59.972 78.403a1.812 1.812 0 0 0-1.99-.477l-9.323 3.558a.926.926 0 0 0-.415 1.415c.341.462.95.639 1.485.431l9.992-3.87a.66.66 0 0 0 .25-1.056Z" fill="#C9DFFF"></path><g filter="url(#l)"><path d="M181.269 72.123a133.26 133.26 0 0 0 45.006 12.06c-2.107 4.898-17.078 29.416-61.521 49.618-1.201.185-28.954-12.725-44.184-21.579.518.74 47.308-16.477 60.699-40.099Z" fill="url(#m)"></path></g><path d="M180.17 84.314a2.544 2.544 0 0 1 2.234-.33l24.805 8.024a1.32 1.32 0 0 1 .607 2.1 1.813 1.813 0 0 1-1.981.554l-25.438-8.712a.925.925 0 0 1-.227-1.636ZM173.23 90.92a2.342 2.342 0 0 1 2.35-.513l17.172 5.78a1.14 1.14 0 0 1 .516 1.805 1.567 1.567 0 0 1-1.716.488l-18.014-6.134a.851.851 0 0 1-.308-1.427ZM166.094 96.403a2.41 2.41 0 0 1 2.33-.384l19.78 7.189a1.149 1.149 0 0 1 .443 1.868c-.434.46-1.1.617-1.693.399L166.34 97.91a.876.876 0 0 1-.246-1.507ZM150.028 107.375a2.2 2.2 0 0 1 2.414-.579l11.304 4.314c.694.265.944 1.118.503 1.716a1.545 1.545 0 0 1-1.8.523l-12.117-4.693a.8.8 0 0 1-.304-1.281ZM157.406 101.516a2.556 2.556 0 0 1 2.236-.236l26.047 9.524a1.165 1.165 0 0 1 .366 1.972 1.6 1.6 0 0 1-1.608.297l-26.869-9.897a.93.93 0 0 1-.172-1.66ZM65.615 68.84a2.108 2.108 0 0 0-1.844-.193L42.29 76.5a.961.961 0 0 0-.303 1.627c.364.318.873.412 1.327.245l22.158-8.163a.767.767 0 0 0 .142-1.37Z" fill="#C9DFFF"></path><path d="M189.767 20.949a3.717 3.717 0 1 1-7.433 0 3.717 3.717 0 0 1 7.433 0Z" stroke="url(#n)" stroke-width="2.027"></path><circle cx="54.277" cy="158.807" r="3.717" stroke="url(#o)" stroke-width="2.027"></circle><circle cx="168.48" cy="166.24" r="3.717" stroke="url(#p)" stroke-width="2.027"></circle><path d="M66.892 24.777c.4-1.655 2.754-1.655 3.153 0l1.345 5.57a1.622 1.622 0 0 0 1.196 1.196l5.57 1.345c1.655.4 1.655 2.754 0 3.153l-5.57 1.345a1.622 1.622 0 0 0-1.196 1.196l-1.345 5.57c-.4 1.655-2.754 1.655-3.153 0l-1.345-5.57a1.622 1.622 0 0 0-1.196-1.196l-5.57-1.345c-1.655-.4-1.655-2.754 0-3.153l5.57-1.345a1.622 1.622 0 0 0 1.196-1.196l1.345-5.57Z" fill="url(#q)"></path><path d="M202.298 142.319c.4-1.655 2.754-1.655 3.153 0l1.345 5.57a1.622 1.622 0 0 0 1.196 1.196l5.57 1.345c1.655.399 1.655 2.753 0 3.153l-5.57 1.345a1.62 1.62 0 0 0-1.196 1.196l-1.345 5.57c-.399 1.655-2.753 1.655-3.153 0l-1.344-5.57a1.62 1.62 0 0 0-1.196-1.196l-5.571-1.345c-1.655-.4-1.655-2.754 0-3.153l5.571-1.345a1.622 1.622 0 0 0 1.196-1.196l1.344-5.57Z" fill="url(#r)"></path><path d="M29.552 129.281a1.352 1.352 0 0 1 1.476 1.817l-2.505 6.561a1.352 1.352 0 0 1-2.312.37l-4.429-5.45a1.351 1.351 0 0 1 .835-2.187l6.935-1.111Z" fill="url(#s)"></path><path d="M204.985 62.402a1.351 1.351 0 0 1 1.675-1.635l6.761 1.9a1.351 1.351 0 0 1 .578 2.268l-5.025 4.905a1.352 1.352 0 0 1-2.254-.633l-1.735-6.805Z" fill="url(#t)"></path><defs><linearGradient id="b" x1="115.353" y1="-28.981" x2="117.176" y2="283.574" gradientUnits="userSpaceOnUse"><stop stop-color="#CAE0FF" stop-opacity="0"></stop><stop offset="1" stop-color="#BCD8FF"></stop></linearGradient><linearGradient id="d" x1="114.321" y1="9.461" x2="114.321" y2="113.455" gradientUnits="userSpaceOnUse"><stop stop-color="#EDF4FF"></stop><stop offset="1" stop-color="#ABCCFF"></stop></linearGradient><linearGradient id="e" x1="69.988" y1="60.231" x2="69.988" y2="150.215" gradientUnits="userSpaceOnUse"><stop stop-color="#ABCCFF"></stop><stop offset="1" stop-color="#70A8FF"></stop></linearGradient><linearGradient id="g" x1="158.667" y1="60.231" x2="158.667" y2="150.215" gradientUnits="userSpaceOnUse"><stop stop-color="#ABCCFF"></stop><stop offset="1" stop-color="#70A8FF"></stop></linearGradient><linearGradient id="h" x1="114.321" y1="98.547" x2="114.321" y2="150.215" gradientUnits="userSpaceOnUse"><stop stop-color="#70A8FF"></stop><stop offset="1" stop-color="#5597FD"></stop></linearGradient><linearGradient id="j" x1="18.458" y1="66.564" x2="75.561" y2="55.414" gradientUnits="userSpaceOnUse"><stop stop-color="#C6DDFF"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><linearGradient id="k" x1="127.259" y1="18.584" x2="177.942" y2="66.226" gradientUnits="userSpaceOnUse"><stop stop-color="#FF698D"></stop><stop offset="1" stop-color="#FF3868"></stop></linearGradient><linearGradient id="m" x1="214.803" y1="99.574" x2="145.562" y2="86.053" gradientUnits="userSpaceOnUse"><stop stop-color="#C6DDFF"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><linearGradient id="n" x1="180.236" y1="17.992" x2="195.019" y2="30.804" gradientUnits="userSpaceOnUse"><stop stop-color="#94BFFF"></stop><stop offset="1" stop-color="#4C94FE"></stop></linearGradient><linearGradient id="o" x1="48.463" y1="155.85" x2="63.245" y2="168.662" gradientUnits="userSpaceOnUse"><stop stop-color="#94BFFF"></stop><stop offset="1" stop-color="#4C94FE"></stop></linearGradient><linearGradient id="p" x1="162.666" y1="163.284" x2="177.448" y2="176.095" gradientUnits="userSpaceOnUse"><stop stop-color="#94BFFF"></stop><stop offset="1" stop-color="#4C94FE"></stop></linearGradient><linearGradient id="q" x1="68.469" y1="18.246" x2="68.469" y2="50.683" gradientUnits="userSpaceOnUse"><stop stop-color="#70A8FF"></stop><stop offset="1" stop-color="#5597FD"></stop></linearGradient><linearGradient id="r" x1="203.875" y1="135.788" x2="203.875" y2="168.225" gradientUnits="userSpaceOnUse"><stop stop-color="#70A8FF"></stop><stop offset="1" stop-color="#5597FD"></stop></linearGradient><linearGradient id="s" x1="31.863" y1="128.911" x2="21.375" y2="137.435" gradientUnits="userSpaceOnUse"><stop stop-color="#70A8FF"></stop><stop offset="1" stop-color="#5597FD"></stop></linearGradient><linearGradient id="t" x1="204.406" y1="60.133" x2="213.847" y2="69.806" gradientUnits="userSpaceOnUse"><stop stop-color="#70A8FF"></stop><stop offset="1" stop-color="#5597FD"></stop></linearGradient><filter id="a" x="12.379" y="111.502" width="205.437" height="66.902" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="8.447" result="effect1_foregroundBlur_667_6104"></feGaussianBlur></filter><filter id="c" x="35.352" y="9.461" width="157.937" height="109.401" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2.703"></feOffset><feGaussianBlur stdDeviation="1.352"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_667_6104"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_667_6104" result="shape"></feBlend></filter><filter id="f" x="106.309" y="32.437" width="90.554" height="52.035" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="8.447" result="effect1_foregroundBlur_667_6104"></feGaussianBlur></filter><filter id="i" x=".891" y="38.519" width="103.39" height="67.086" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2.703"></feOffset><feGaussianBlur stdDeviation="4.055"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix values="0 0 0 0 0.0196078 0 0 0 0 0.168627 0 0 0 0 0.396078 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_667_6104"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_667_6104" result="shape"></feBlend></filter><filter id="l" x="104.985" y="70.772" width="128.679" height="84.656" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dx="-4.097" dy="10.137"></feOffset><feGaussianBlur stdDeviation="5.744"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix values="0 0 0 0 0.021441 0 0 0 0 0.168056 0 0 0 0 0.395833 0 0 0 0.15 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_667_6104"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow_667_6104" result="shape"></feBlend></filter></defs></svg>`;
});
const TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headerTailwindCode } = $$props;
  if ($$props.headerTailwindCode === void 0 && $$bindings.headerTailwindCode && headerTailwindCode !== void 0)
    $$bindings.headerTailwindCode(headerTailwindCode);
  return `<div class="w-full"><div class="hidden lg:grid mt-3 bg-gray-200 dark:bg-gray-600 w-full h-[1px]"></div>
  <div class="${"hidden lg:grid grid-rows-1 grid-cols-" + escape(headerTailwindCode, true) + " my-6 text-sm font-medium main-text px-3 gap-2 w-full items-center"}">${slots.default ? slots.default({}) : ``}</div>
  <div class="hidden lg:grid mt-3 bg-gray-200 dark:bg-gray-600 w-full h-[1px]"></div></div>`;
});
const TableGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headerTailwindCode } = $$props;
  let { index } = $$props;
  if ($$props.headerTailwindCode === void 0 && $$bindings.headerTailwindCode && headerTailwindCode !== void 0)
    $$bindings.headerTailwindCode(headerTailwindCode);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  return `<div${add_attribute(
    "class",
    index % 2 === 0 ? `hidden lg:grid grid-rows-1 grid-cols-${headerTailwindCode} px-3 py-9 gap-2 main-text w-full items-center` : `hidden lg:grid grid-rows-1 grid-cols-${headerTailwindCode} px-3 py-9 bg-gray-100 dark:text-gray-200 dark:bg-gray-background rounded gap-2  text-secondary w-full items-center`,
    0
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_storedUser;
  $$unsubscribe_storedUser = subscribe(storedUser, (value) => value);
  let { data } = $$props;
  let leagues = [];
  let showMessageBody = [];
  let showSentMessageBody = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_storedUser();
  return `${``}

${``}
${``}
${``}
<div class="mx-4 lg:mx-16 xl:mx-40 mt-10"><div class="flex justify-evenly items-center gap-x-8 mb-4"><button class="relative">${`<div class="bg-gray-200 rounded-full w-20 h-20">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faUser,
      scale: 3,
      translateX: 2,
      translateY: 2
    },
    {},
    {}
  )}</div>`}
      <div class="absolute -top-3 -right-3">${data.isCurrentUser ? `<div>${validate_component(Fa, "Fa").$$render($$result, { icon: faPaintbrush, primaryColor: "gray" }, {}, {})}</div>` : ``}</div></button>
    <p class="text-3xl font-semibold secondary-text">${escape(data.userInfo.username)}</p></div>
  <div><div class="flex flex-col gap-1"><p class="text-xl font-semibold main-text text-center lg:text-left w-full mt-8">Current Leagues
      </p>
      <div class="flex flex-col gap-2">${each(leagues, (league) => {
    return `<div><a class="secondary-text"${add_attribute("href", "/league/" + league.leagueLink, 0)}>${escape(league.leagueName)}</a>
          </div>`;
  })}</div></div>
    <div>${data.isCurrentUser ? `${validate_component(TabGroup, "TabGroup").$$render($$result, { class: "relative items-center mt-20" }, {}, {
    default: () => {
      return `${validate_component(TabList, "TabList").$$render(
        $$result,
        {
          class: "flex items-center justify-start w-full gap-4"
        },
        {},
        {
          default: () => {
            return `
            <div${add_attribute("class", "flex flex-nowrap overflow-x-hidden overflow-y-visible  lg:w-full", 0)}>${validate_component(Tab, "Tab").$$render(
              $$result,
              {
                class: ({ selected }) => selected ? "font-semibold  mr-5 border-b-2 border-primary pb-3 decoration-primary decoration-2 whitespace-nowrap dark:text-gray-200" : "font-semibold  mr-5 secondary-text  whitespace-nowrap pb-3"
              },
              {},
              {
                default: () => {
                  return `Inbox`;
                }
              }
            )}
              ${validate_component(Tab, "Tab").$$render(
              $$result,
              {
                class: ({ selected }) => selected ? "font-semibold mr-5 border-b-2 border-primary pb-3 decoration-primary decoration-2 whitespace-nowrap dark:text-gray-200" : "font-semibold mr-5 secondary-text whitespace-nowrap pb-3"
              },
              {},
              {
                default: () => {
                  return `Sent Messages`;
                }
              }
            )}</div>`;
          }
        }
      )}

          ${validate_component(TabPanels, "TabPanels").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(TabPanel, "TabPanel").$$render($$result, {}, {}, {
            default: () => {
              return `${`${data.userInfo.receivedMessages && data.userInfo.receivedMessages.length >= 1 ? `
                <div class="hidden lg:flex flex-col w-full">${validate_component(TableHeader, "TableHeader").$$render($$result, { headerTailwindCode: "messages" }, {}, {
                default: () => {
                  return `<p class="">Date</p>
                    <p>From</p>
                    <p>Message</p>
                    <p class="text-center">Action</p>`;
                }
              })}
                  ${each(data.userInfo.receivedMessages, (message, index) => {
                return `${validate_component(TableGrid, "TableGrid").$$render($$result, { headerTailwindCode: "messages", index }, {}, {
                  default: () => {
                    return `<button><p${add_attribute(
                      "class",
                      message.viewed ? "secondary-text line-clamp-1 text-left" : "line-clamp-1 text-left font-semibold",
                      0
                    )}>${escape(displayDateNumerical(message.createdAt))}
                        </p></button>
                      <button><p${add_attribute(
                      "class",
                      message.viewed ? "secondary-text line-clamp-1 text-left pr-3" : "line-clamp-1 text-left font-semibold pr-3",
                      0
                    )}>${escape(message.sender)}
                        </p></button>
                      <button><p${add_attribute(
                      "class",
                      message?.viewed ? showMessageBody[index] ? "secondary-text text-left" : "line-clamp-4 secondary-text text-left" : showMessageBody[index] ? "text-left" : "line-clamp-4 text-left font-semibold",
                      0
                    )}>${escape(message.body)}
                        </p></button>
                      <div class="flex justify-around items-center"><button class="w-5 h-5 text-[#008000]">
                          Reply
                        </button>
                        <button class="w-5 h-5 text-primary"><span class="sr-only">Delete</span>
                          
                          Trash
                        </button></div>
                    `;
                  }
                })}`;
              })}</div>
                
                <div class="flex lg:hidden flex-col w-full px-2 text-sm">${each(data.userInfo.receivedMessages, (message, index) => {
                return `${validate_component(Popover, "Popover").$$render($$result, { class: "relative first-of-type:mt-6" }, {}, {
                  default: () => {
                    return `<div class="flex w-full justify-between">${validate_component(PopoverButton, "PopoverButton").$$render(
                      $$result,
                      {
                        class: "line-clamp-1 font-semibold text-left flex-grow-1 text-base leading-5"
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(message.sender)}
                        `;
                        }
                      }
                    )}
                        ${validate_component(PopoverButton, "PopoverButton").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(DotsVertical, "DotsVerticalIcon").$$render($$result, { class: "w-5 secondary-text" }, {}, {})}
                        `;
                      }
                    })}</div>
                      ${validate_component(PopoverPanel, "PopoverPanel").$$render(
                      $$result,
                      {
                        class: "absolute z-10 popover-background rounded-lg w-52 top-4  right-4 p-3 max-h-96 shadow-listbox-shadow"
                      },
                      {},
                      {
                        default: () => {
                          return `<ul class="w-48 main-text text-lg mx-3 my-2"><li><button class="py-3 flex items-center">${validate_component(Reply, "ReplyIcon").$$render($$result, { class: "w-5 mr-5" }, {}, {})}

                              <p>Reply</p>
                            </button></li>
                          <li><button class="py-3 flex items-center">${validate_component(Trash, "TrashIcon").$$render($$result, { class: "w-5 h-5 mr-5" }, {}, {})}
                              Delete
                            </button>
                          </li></ul>
                      `;
                        }
                      }
                    )}
                    `;
                  }
                })}
                    <button><p${add_attribute(
                  "class",
                  message.viewed ? "secondary-text line-clamp-1 text-left my-2" : "line-clamp-1 text-left my-2 font-semibold",
                  0
                )}>${escape(displayDateNumerical(message.createdAt))}
                      </p></button>
                    <button><p${add_attribute(
                  "class",
                  message.viewed ? showMessageBody[index] ? "secondary-text text-left mb-3" : "line-clamp-4 secondary-text text-left mb-3" : showMessageBody[index] ? "text-left mb-3 font-semibold" : "line-clamp-4 text-left mb-3 font-semibold",
                  0
                )}>${escape(message.body)}
                      </p></button>
                    <div class="hr-div mb-6"></div>`;
              })}</div>` : `<div class="flex items-center justify-center flex-col text-center w-full mt-4"><div class="w-80 h-64">${validate_component(NoMessagesSvg, "NoMessagesSvg").$$render($$result, {}, {}, {})}</div>
                  <p class="font-semibold my-4">Your inbox is empty</p>
                  <p class="secondary-text lg:w-2/3">That&#39;s alright. When you get one, it will appear here. Members use messages to
                    ask about products and services and to ask for a quote.
                  </p></div>`}`}`;
            }
          })}
            ${validate_component(TabPanel, "TabPanel").$$render($$result, {}, {}, {
            default: () => {
              return `${`${data.userInfo.sentMessages && data.userInfo.sentMessages.length >= 1 ? `
                <div class="hidden lg:flex flex-col w-full secondary-text">${validate_component(TableHeader, "TableHeader").$$render($$result, { headerTailwindCode: "messages" }, {}, {
                default: () => {
                  return `<p class="">Date</p>
                    <p>To</p>
                    <p>Message</p>
                    <p class="text-center">Action</p>`;
                }
              })}

                  ${each(data.userInfo.sentMessages, (message, index) => {
                return `${validate_component(TableGrid, "TableGrid").$$render($$result, { headerTailwindCode: "messages", index }, {}, {
                  default: () => {
                    return `<button><p${add_attribute("class", "line-clamp-1 text-left secondary-text", 0)}>${escape(displayDateNumerical(message.createdAt))}
                        </p></button>
                      <button><p${add_attribute("class", "line-clamp-1 text-left secondary-text pr-3", 0)}>${escape(message.receiver)}
                        </p></button>
                      <button><p${add_attribute(
                      "class",
                      showSentMessageBody[index] ? "text-left secondary-text" : "line-clamp-4 text-left secondary-text",
                      0
                    )}>${escape(message.body)}
                        </p></button>
                      <div class="flex justify-around items-center"><button class="w-5 h-5 text-[#008000]" style="transform: scaleY(-1);">${validate_component(Reply, "ReplyIcon").$$render($$result, {}, {}, {})}
                          Reply
                        </button>
                        <button class="w-5 h-5 text-primary"><span class="sr-only">Delete</span>
                          ${validate_component(Trash, "TrashIcon").$$render($$result, {}, {}, {})}
                          Delete
                        </button></div>
                    `;
                  }
                })}`;
              })}</div>
                
                <div class="flex lg:hidden flex-col w-full px-2">${each(data.userInfo.sentMessages, (message, index) => {
                return `${validate_component(Popover, "Popover").$$render($$result, { class: "relative first-of-type:mt-6" }, {}, {
                  default: () => {
                    return `<div class="flex w-full justify-between">${validate_component(PopoverButton, "PopoverButton").$$render(
                      $$result,
                      {
                        class: "line-clamp-1 font-semibold text-left flex-grow-1 leading-5"
                      },
                      {},
                      {
                        default: () => {
                          return `${escape(message.receiver)}
                        `;
                        }
                      }
                    )}
                        ${validate_component(PopoverButton, "PopoverButton").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(DotsVertical, "DotsVerticalIcon").$$render($$result, { class: "w-5 secondary-text" }, {}, {})}
                        `;
                      }
                    })}</div>
                      ${validate_component(PopoverPanel, "PopoverPanel").$$render(
                      $$result,
                      {
                        class: "absolute z-10 popover-background rounded-lg w-52 top-4  right-4 p-3 max-h-96 shadow-listbox-shadow"
                      },
                      {},
                      {
                        default: () => {
                          return `<ul class="w-48 main-text text-lg mx-3 my-2"><li><button class="py-3 flex items-center">${validate_component(Reply, "ReplyIcon").$$render($$result, { class: "w-5 mr-5" }, {}, {})}
                              Follow-Up
                            </button></li>
                          <li><button class="py-3 flex items-center">${validate_component(Trash, "TrashIcon").$$render($$result, { class: "w-5 h-5 mr-5" }, {}, {})}
                              Delete
                            </button>
                          </li></ul>
                      `;
                        }
                      }
                    )}
                    `;
                  }
                })}
                    <button><p class="secondary-text my-2 text-left text-sm">${escape(displayDateNumerical(message.createdAt))}
                      </p></button>
                    <button><p${add_attribute(
                  "class",
                  showSentMessageBody[index] ? "secondary-text text-left mb-3 text-sm" : "line-clamp-4 secondary-text text-left mb-3 text-sm",
                  0
                )}>${escape(message.body)}
                      </p></button>
                    <div class="hr-div mb-6"></div>`;
              })}</div>` : `<div class="flex items-center justify-center flex-col text-center w-full mt-4"><div class="w-80 h-64">${validate_component(NoMessagesSvg, "NoMessagesSvg").$$render($$result, {}, {}, {})}</div>
                  <p class="font-semibold my-4">Your sent messages is empty</p>
                  <p class="secondary-text lg:w-2/3">That&#39;s alright. When you send one, it will appear here. Members use messages to
                    ask about products and services and to ask for a quote.
                  </p></div>`}`}`;
            }
          })}`;
        }
      })}`;
    }
  })}
        <div class="flex justify-center mt-20"><button class="btn-primary">Log Out</button></div>` : `<div class="flex items-center mt-6 justify-center lg:justify-start"><button class="btn-primary">Send Message</button></div>`}</div></div></div>`;
});
export {
  Page as default
};
