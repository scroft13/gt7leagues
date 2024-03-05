import { j as getContext, s as setContext, r as listen, t as bubble, u as prevent_default, w as stop_propagation, c as create_ssr_component, g as compute_rest_props, o as get_current_component, h as spread, i as escape_object, a as add_attribute, v as validate_component, m as missing_component, d as subscribe, x as set_store_value } from "./index3.js";
import { w as writable } from "./index2.js";
var State;
(function(State2) {
  State2[State2["Open"] = 0] = "Open";
  State2[State2["Closed"] = 1] = "Closed";
})(State || (State = {}));
const OPEN_CLOSED_CONTEXT_NAME = "headlessui-open-closed-context";
function useOpenClosed() {
  return getContext(OPEN_CLOSED_CONTEXT_NAME);
}
function useOpenClosedProvider(value) {
  setContext(OPEN_CLOSED_CONTEXT_NAME, value);
}
function match(value, lookup, ...args) {
  if (value in lookup) {
    let returnValue = lookup[value];
    return typeof returnValue === "function" ? returnValue(...args) : returnValue;
  }
  let error = new Error(`Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(lookup).map((key) => `"${key}"`).join(", ")}.`);
  if (Error.captureStackTrace)
    Error.captureStackTrace(error, match);
  throw error;
}
let id = 0;
function generateId() {
  return ++id;
}
function useId() {
  return generateId();
}
var Keys;
(function(Keys2) {
  Keys2["Space"] = " ";
  Keys2["Enter"] = "Enter";
  Keys2["Escape"] = "Escape";
  Keys2["Backspace"] = "Backspace";
  Keys2["ArrowLeft"] = "ArrowLeft";
  Keys2["ArrowUp"] = "ArrowUp";
  Keys2["ArrowRight"] = "ArrowRight";
  Keys2["ArrowDown"] = "ArrowDown";
  Keys2["Home"] = "Home";
  Keys2["End"] = "End";
  Keys2["PageUp"] = "PageUp";
  Keys2["PageDown"] = "PageDown";
  Keys2["Tab"] = "Tab";
})(Keys || (Keys = {}));
let focusableSelector = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])"
].map((selector) => `${selector}:not([tabindex='-1'])`).join(",");
var Focus$1;
(function(Focus2) {
  Focus2[Focus2["First"] = 1] = "First";
  Focus2[Focus2["Previous"] = 2] = "Previous";
  Focus2[Focus2["Next"] = 4] = "Next";
  Focus2[Focus2["Last"] = 8] = "Last";
  Focus2[Focus2["WrapAround"] = 16] = "WrapAround";
  Focus2[Focus2["NoScroll"] = 32] = "NoScroll";
})(Focus$1 || (Focus$1 = {}));
var FocusResult;
(function(FocusResult2) {
  FocusResult2[FocusResult2["Error"] = 0] = "Error";
  FocusResult2[FocusResult2["Overflow"] = 1] = "Overflow";
  FocusResult2[FocusResult2["Success"] = 2] = "Success";
  FocusResult2[FocusResult2["Underflow"] = 3] = "Underflow";
})(FocusResult || (FocusResult = {}));
var Direction;
(function(Direction2) {
  Direction2[Direction2["Previous"] = -1] = "Previous";
  Direction2[Direction2["Next"] = 1] = "Next";
})(Direction || (Direction = {}));
function getFocusableElements(container = document.body) {
  if (container == null)
    return [];
  return Array.from(container.querySelectorAll(focusableSelector));
}
var FocusableMode;
(function(FocusableMode2) {
  FocusableMode2[FocusableMode2["Strict"] = 0] = "Strict";
  FocusableMode2[FocusableMode2["Loose"] = 1] = "Loose";
})(FocusableMode || (FocusableMode = {}));
function focusIn(container, focus) {
  let elements = Array.isArray(container) ? container : getFocusableElements(container);
  let active = document.activeElement;
  let direction = (() => {
    if (focus & (Focus$1.First | Focus$1.Next))
      return Direction.Next;
    if (focus & (Focus$1.Previous | Focus$1.Last))
      return Direction.Previous;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let startIndex = (() => {
    if (focus & Focus$1.First)
      return 0;
    if (focus & Focus$1.Previous)
      return Math.max(0, elements.indexOf(active)) - 1;
    if (focus & Focus$1.Next)
      return Math.max(0, elements.indexOf(active)) + 1;
    if (focus & Focus$1.Last)
      return elements.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let focusOptions = focus & Focus$1.NoScroll ? { preventScroll: true } : {};
  let offset = 0;
  let total = elements.length;
  let next = void 0;
  do {
    if (offset >= total || offset + total <= 0)
      return FocusResult.Error;
    let nextIdx = startIndex + offset;
    if (focus & Focus$1.WrapAround) {
      nextIdx = (nextIdx + total) % total;
    } else {
      if (nextIdx < 0)
        return FocusResult.Underflow;
      if (nextIdx >= total)
        return FocusResult.Overflow;
    }
    next = elements[nextIdx];
    next?.focus(focusOptions);
    offset += direction;
  } while (next !== document.activeElement);
  if (!next.hasAttribute("tabindex"))
    next.setAttribute("tabindex", "0");
  return FocusResult.Success;
}
var StackMessage;
(function(StackMessage2) {
  StackMessage2[StackMessage2["Add"] = 0] = "Add";
  StackMessage2[StackMessage2["Remove"] = 1] = "Remove";
})(StackMessage || (StackMessage = {}));
const MODIFIER_DIVIDER = "!";
const modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
function forwardEventsBuilder(component, except = []) {
  let $on;
  let events = [];
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {
    };
    for (let exception of except) {
      if (typeof exception === "string" && exception === eventType) {
        const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      if (typeof exception === "object" && exception["name"] === eventType) {
        let oldCallback = callback;
        callback = (...props) => {
          if (!(typeof exception === "object" && exception["shouldExclude"]())) {
            oldCallback(...props);
          }
        };
      }
    }
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    return () => {
      destructor();
    };
  };
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options = false;
      const modifierMatch = eventType.match(modifierRegex);
      if (modifierMatch) {
        const parts = eventType.split(MODIFIER_DIVIDER);
        eventType = parts[0];
        const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (eventOptions.passive) {
          options = options || {};
          options.passive = true;
        }
        if (eventOptions.nonpassive) {
          options = options || {};
          options.passive = false;
        }
        if (eventOptions.capture) {
          options = options || {};
          options.capture = true;
        }
        if (eventOptions.once) {
          options = options || {};
          options.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i = 0; i < events.length; i++) {
      $on(events[i][0], events[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (let entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      }
    };
  };
}
const components = [
  "a",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "button",
  "cite",
  "code",
  "data",
  "datalist",
  "dd",
  "dl",
  "dt",
  "div",
  "em",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "i",
  "input",
  "label",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "section",
  "span",
  "strong",
  "ul"
];
function isValidElement(element) {
  return !(typeof element === "string" && !components.includes(element));
}
var Features;
(function(Features2) {
  Features2[Features2["None"] = 0] = "None";
  Features2[Features2["RenderStrategy"] = 1] = "RenderStrategy";
  Features2[Features2["Static"] = 2] = "Static";
})(Features || (Features = {}));
var RenderStrategy;
(function(RenderStrategy2) {
  RenderStrategy2[RenderStrategy2["Unmount"] = 0] = "Unmount";
  RenderStrategy2[RenderStrategy2["Hidden"] = 1] = "Hidden";
})(RenderStrategy || (RenderStrategy = {}));
const Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let computedClass;
  let computedStyle;
  let show;
  let hidden;
  let propsWeControl;
  let $$restProps = compute_rest_props($$props, [
    "name",
    "as",
    "slotProps",
    "el",
    "use",
    "visible",
    "features",
    "unmount",
    "static",
    "class",
    "style"
  ]);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { name } = $$props;
  let { as } = $$props;
  let { slotProps } = $$props;
  let { el = null } = $$props;
  let { use = [] } = $$props;
  let { visible = true } = $$props;
  let { features = Features.None } = $$props;
  let { unmount = true } = $$props;
  let { static: static_ = false } = $$props;
  let { class: classProp = void 0 } = $$props;
  let { style = void 0 } = $$props;
  if (!as) {
    throw new Error(`<${name}> did not provide an \`as\` value to <Render>`);
  }
  if (!isValidElement(as)) {
    throw new Error(`<${name}> has an invalid or unsupported \`as\` prop: ${as}`);
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.slotProps === void 0 && $$bindings.slotProps && slotProps !== void 0)
    $$bindings.slotProps(slotProps);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.features === void 0 && $$bindings.features && features !== void 0)
    $$bindings.features(features);
  if ($$props.unmount === void 0 && $$bindings.unmount && unmount !== void 0)
    $$bindings.unmount(unmount);
  if ($$props.static === void 0 && $$bindings.static && static_ !== void 0)
    $$bindings.static(static_);
  if ($$props.class === void 0 && $$bindings.class && classProp !== void 0)
    $$bindings.class(classProp);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    computedClass = typeof classProp === "function" ? classProp(slotProps) : classProp;
    computedStyle = typeof style === "function" ? style(slotProps) : style;
    show = visible || features & Features.Static && static_ || !(features & Features.RenderStrategy && unmount);
    hidden = !visible && !(features & Features.Static && static_) && features & Features.RenderStrategy && !unmount;
    propsWeControl = {
      class: computedClass,
      style: `${computedStyle ?? ""}${hidden ? " display: none" : ""}` || void 0
    };
    {
      if (propsWeControl.style === void 0) {
        delete propsWeControl.style;
      }
    }
    $$rendered = `${show ? `
  ${as === "a" ? `
    <a${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `${as === "address" ? `<address${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</address>` : `${as === "article" ? `<article${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</article>` : `${as === "aside" ? `<aside${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</aside>` : `${as === "b" ? `<b${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</b>` : `${as === "bdi" ? `<bdi${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</bdi>` : `${as === "bdo" ? `<bdo${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</bdo>` : `${as === "blockquote" ? `<blockquote${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</blockquote>` : `${as === "button" ? `<button${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</button>` : `${as === "cite" ? `<cite${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</cite>` : `${as === "code" ? `<code${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</code>` : `${as === "data" ? `<data${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</data>` : `${as === "datalist" ? `<datalist${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</datalist>` : `${as === "dd" ? `<dd${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</dd>` : `${as === "dl" ? `<dl${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</dl>` : `${as === "dt" ? `<dt${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</dt>` : `${as === "div" ? `<div${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${as === "em" ? `<em${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</em>` : `${as === "footer" ? `<footer${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</footer>` : `${as === "form" ? `<form${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</form>` : `${as === "h1" ? `<h1${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : `${as === "h2" ? `<h2${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${as === "h3" ? `<h3${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `${as === "h4" ? `<h4${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h4>` : `${as === "h5" ? `<h5${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h5>` : `${as === "h6" ? `<h6${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h6>` : `${as === "header" ? `<header${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</header>` : `${as === "i" ? `<i${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</i>` : `${as === "input" ? `<input${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>` : `${as === "label" ? `
    <label${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${as === "li" ? `<li${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</li>` : `${as === "main" ? `<main${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</main>` : `${as === "nav" ? `<nav${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</nav>` : `${as === "ol" ? `<ol${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</ol>` : `${as === "p" ? `<p${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</p>` : `${as === "section" ? `<section${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</section>` : `${as === "span" ? `<span${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${as === "strong" ? `<strong${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</strong>` : `${as === "ul" ? `<ul${spread(
      [
        escape_object($$restProps),
        escape_object(propsWeControl),
        { hidden: hidden || void 0 || null }
      ],
      {}
    )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</ul>` : `${validate_component(as || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign(
        {},
        {
          use: [
            ...use,
            forwardEvents
          ]
        },
        $$restProps,
        propsWeControl,
        { hidden: hidden || void 0 },
        { el }
      ),
      {
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
var DialogStates;
(function(DialogStates2) {
  DialogStates2[DialogStates2["Open"] = 0] = "Open";
  DialogStates2[DialogStates2["Closed"] = 1] = "Closed";
})(DialogStates || (DialogStates = {}));
var DisclosureStates;
(function(DisclosureStates2) {
  DisclosureStates2[DisclosureStates2["Open"] = 0] = "Open";
  DisclosureStates2[DisclosureStates2["Closed"] = 1] = "Closed";
})(DisclosureStates || (DisclosureStates = {}));
var Focus;
(function(Focus2) {
  Focus2[Focus2["First"] = 0] = "First";
  Focus2[Focus2["Previous"] = 1] = "Previous";
  Focus2[Focus2["Next"] = 2] = "Next";
  Focus2[Focus2["Last"] = 3] = "Last";
  Focus2[Focus2["Specific"] = 4] = "Specific";
  Focus2[Focus2["Nothing"] = 5] = "Nothing";
})(Focus || (Focus = {}));
var ListboxStates;
(function(ListboxStates2) {
  ListboxStates2[ListboxStates2["Open"] = 0] = "Open";
  ListboxStates2[ListboxStates2["Closed"] = 1] = "Closed";
})(ListboxStates || (ListboxStates = {}));
var MenuStates;
(function(MenuStates2) {
  MenuStates2[MenuStates2["Open"] = 0] = "Open";
  MenuStates2[MenuStates2["Closed"] = 1] = "Closed";
})(MenuStates || (MenuStates = {}));
const POPOVER_GROUP_CONTEXT_NAME = "headlessui-popover-group-context";
function usePopoverGroupContext() {
  return getContext(POPOVER_GROUP_CONTEXT_NAME);
}
var PopoverStates;
(function(PopoverStates2) {
  PopoverStates2[PopoverStates2["Open"] = 0] = "Open";
  PopoverStates2[PopoverStates2["Closed"] = 1] = "Closed";
})(PopoverStates || (PopoverStates = {}));
const POPOVER_CONTEXT_NAME = "headlessui-popover-context";
function usePopoverContext(component) {
  let context = getContext(POPOVER_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error(`<${component} /> is missing a parent <Popover /> component.`);
  }
  return context;
}
const Popover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use"]);
  let $api, $$unsubscribe_api;
  let $button, $$unsubscribe_button;
  let $$unsubscribe_panel;
  let $openClosedState, $$unsubscribe_openClosedState;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const buttonId = `headlessui-popover-button-${useId()}`;
  const panelId = `headlessui-popover-panel-${useId()}`;
  let popoverState = PopoverStates.Closed;
  let panel = writable(null);
  $$unsubscribe_panel = subscribe(panel, (value) => value);
  let button = writable(null);
  $$unsubscribe_button = subscribe(button, (value) => $button = value);
  let api = writable({
    popoverState,
    buttonId,
    panelId,
    panel,
    button,
    togglePopover() {
      popoverState = match(popoverState, {
        [PopoverStates.Open]: PopoverStates.Closed,
        [PopoverStates.Closed]: PopoverStates.Open
      });
    },
    closePopover() {
      if (popoverState === PopoverStates.Closed)
        return;
      popoverState = PopoverStates.Closed;
    },
    close(focusableElement) {
      $api.closePopover();
      let restoreElement = (() => {
        if (!focusableElement)
          return $button;
        if (focusableElement instanceof HTMLElement)
          return focusableElement;
        return $button;
      })();
      restoreElement?.focus();
    }
  });
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  setContext(POPOVER_CONTEXT_NAME, api);
  let openClosedState = writable(State.Closed);
  $$unsubscribe_openClosedState = subscribe(openClosedState, (value) => $openClosedState = value);
  useOpenClosedProvider(openClosedState);
  const groupContext = usePopoverGroupContext();
  groupContext?.registerPopover;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  set_store_value(
    openClosedState,
    $openClosedState = match(popoverState, {
      [PopoverStates.Open]: State.Open,
      [PopoverStates.Closed]: State.Closed
    }),
    $openClosedState
  );
  {
    api.update((obj) => {
      return { ...obj, popoverState };
    });
  }
  slotProps = {
    open: popoverState === PopoverStates.Open,
    close: $api.close
  };
  $$unsubscribe_api();
  $$unsubscribe_button();
  $$unsubscribe_panel();
  $$unsubscribe_openClosedState();
  return `
${validate_component(Render, "Render").$$render($$result, Object.assign({}, $$restProps, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "Popover" }), {}, {
    default: () => {
      return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
    }
  })}`;
});
var Reason;
(function(Reason2) {
  Reason2["Finished"] = "finished";
  Reason2["Cancelled"] = "cancelled";
})(Reason || (Reason = {}));
var TreeStates;
(function(TreeStates2) {
  TreeStates2["Visible"] = "visible";
  TreeStates2["Hidden"] = "hidden";
})(TreeStates || (TreeStates = {}));
export {
  Focus$1 as F,
  PopoverStates as P,
  Render as R,
  State as S,
  useOpenClosed as a,
  focusIn as b,
  Features as c,
  usePopoverGroupContext as d,
  useId as e,
  forwardEventsBuilder as f,
  Popover as g,
  usePopoverContext as u
};
