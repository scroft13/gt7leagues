import { k as getContext, s as setContext, c as create_ssr_component, o as onDestroy, t as tick, g as compute_rest_props, d as subscribe, l as listen, p as bubble, q as prevent_default, r as stop_propagation, h as get_current_component, i as spread, j as escape_object, a as add_attribute, v as validate_component, m as missing_component, b as createEventDispatcher } from "./index3.js";
import { w as writable } from "./index2.js";
var State;
(function(State2) {
  State2[State2["Open"] = 0] = "Open";
  State2[State2["Closed"] = 1] = "Closed";
})(State || (State = {}));
const OPEN_CLOSED_CONTEXT_NAME = "headlessui-open-closed-context";
function hasOpenClosed() {
  return useOpenClosed() !== void 0;
}
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
let interactables = /* @__PURE__ */ new Set();
let originals = /* @__PURE__ */ new Map();
function inert(element) {
  element.setAttribute("aria-hidden", "true");
  element.inert = true;
}
function restore(element) {
  let original = originals.get(element);
  if (!original)
    return;
  if (original["aria-hidden"] === null)
    element.removeAttribute("aria-hidden");
  else
    element.setAttribute("aria-hidden", original["aria-hidden"]);
  element.inert = original.inert;
}
function useInertOthers(container, enabled = true) {
  if (!enabled)
    return;
  if (!container)
    return;
  let element = container;
  interactables.add(element);
  for (let original of originals.keys()) {
    if (original.contains(element)) {
      restore(original);
      originals.delete(original);
    }
  }
  document.querySelectorAll("body > *").forEach((child) => {
    if (!(child instanceof HTMLElement))
      return;
    for (let interactable of interactables) {
      if (child.contains(interactable))
        return;
    }
    if (interactables.size === 1) {
      originals.set(child, {
        "aria-hidden": child.getAttribute("aria-hidden"),
        // @ts-expect-error `inert` does not exist on HTMLElement (yet!)
        inert: child.inert
      });
      inert(child);
    }
  });
  return () => {
    interactables.delete(element);
    if (interactables.size > 0) {
      document.querySelectorAll("body > *").forEach((child) => {
        if (!(child instanceof HTMLElement))
          return;
        if (originals.has(child))
          return;
        for (let interactable of interactables) {
          if (child.contains(interactable))
            return;
        }
        originals.set(child, {
          "aria-hidden": child.getAttribute("aria-hidden"),
          // @ts-expect-error `inert` does not exist on HTMLElement (yet!)
          inert: child.inert
        });
        inert(child);
      });
    } else {
      for (let element2 of originals.keys()) {
        restore(element2);
        originals.delete(element2);
      }
    }
  };
}
function contains(containers, element) {
  for (let container of containers) {
    if (container.contains(element))
      return true;
  }
  return false;
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
function focusElement(element) {
  element?.focus({ preventScroll: true });
}
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
const FocusTrap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { containers } = $$props;
  let { enabled = true } = $$props;
  let { options = {} } = $$props;
  let restoreElement = typeof window !== "undefined" ? document.activeElement : null;
  async function handleFocus() {
    if (!enabled)
      return;
    if (containers.size !== 1)
      return;
    let { initialFocus } = options;
    await tick();
    let activeElement = document.activeElement;
    if (initialFocus) {
      if (initialFocus === activeElement) {
        return;
      }
    } else if (contains(containers, activeElement)) {
      return;
    }
    restoreElement = activeElement;
    if (initialFocus) {
      focusElement(initialFocus);
    } else {
      let couldFocus = false;
      for (let container of containers) {
        let result = focusIn(container, Focus$1.First);
        if (result === FocusResult.Success) {
          couldFocus = true;
          break;
        }
      }
      if (!couldFocus)
        console.warn("There are no focusable elements inside the <FocusTrap />");
    }
  }
  function restore2() {
    focusElement(restoreElement);
    restoreElement = null;
  }
  onDestroy(() => {
    restore2();
  });
  if ($$props.containers === void 0 && $$bindings.containers && containers !== void 0)
    $$bindings.containers(containers);
  if ($$props.enabled === void 0 && $$bindings.enabled && enabled !== void 0)
    $$bindings.enabled(enabled);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  {
    enabled && containers ? handleFocus() : restore2();
  }
  return ``;
});
var StackMessage;
(function(StackMessage2) {
  StackMessage2[StackMessage2["Add"] = 0] = "Add";
  StackMessage2[StackMessage2["Remove"] = 1] = "Remove";
})(StackMessage || (StackMessage = {}));
const STACK_CONTEXT_NAME = "headlessui-stack-context";
const StackContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _cleanup;
  let { onUpdate } = $$props;
  let { element } = $$props;
  function notify(...args) {
    onUpdate?.(...args);
    parentUpdate?.(...args);
  }
  let parentUpdate = getContext(STACK_CONTEXT_NAME);
  setContext(STACK_CONTEXT_NAME, notify);
  onDestroy(() => {
    if (_cleanup) {
      _cleanup();
    }
  });
  if ($$props.onUpdate === void 0 && $$bindings.onUpdate && onUpdate !== void 0)
    $$bindings.onUpdate(onUpdate);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  _cleanup = (() => {
    if (_cleanup) {
      _cleanup();
    }
    if (!element)
      return null;
    let savedElement = element;
    notify(StackMessage.Add, savedElement);
    return () => notify(StackMessage.Remove, savedElement);
  })();
  return `${slots.default ? slots.default({}) : ``}`;
});
const DESCRIPTION_CONTEXT_NAME = "headlessui-description-context";
const DescriptionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "slotProps"]);
  let $contextStore, $$unsubscribe_contextStore;
  let { name } = $$props;
  let { slotProps = {} } = $$props;
  let descriptionIds = [];
  let contextStore = writable({
    name,
    slotProps,
    props: $$restProps,
    register
  });
  $$unsubscribe_contextStore = subscribe(contextStore, (value) => $contextStore = value);
  setContext(DESCRIPTION_CONTEXT_NAME, contextStore);
  function register(value) {
    descriptionIds = [...descriptionIds, value];
    return () => {
      descriptionIds = descriptionIds.filter((descriptionId) => descriptionId !== value);
    };
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.slotProps === void 0 && $$bindings.slotProps && slotProps !== void 0)
    $$bindings.slotProps(slotProps);
  {
    contextStore.set({
      name,
      slotProps,
      props: $$restProps,
      register,
      descriptionIds: descriptionIds.length > 0 ? descriptionIds.join(" ") : void 0
    });
  }
  $$unsubscribe_contextStore();
  return `${slots.default ? slots.default({
    describedby: $contextStore.descriptionIds
  }) : ``}`;
});
const FORCE_PORTAL_ROOT_CONTEXT_NAME = "headlessui-force-portal-root-context";
function usePortalRoot() {
  return getContext(FORCE_PORTAL_ROOT_CONTEXT_NAME);
}
const ForcePortalRootContext = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { force } = $$props;
  setContext(FORCE_PORTAL_ROOT_CONTEXT_NAME, writable(force));
  if ($$props.force === void 0 && $$bindings.force && force !== void 0)
    $$bindings.force(force);
  return `${slots.default ? slots.default({}) : ``}`;
});
const PORTAL_GROUP_CONTEXT_NAME = "headlessui-portal-group-context";
function usePortalGroupContext() {
  return getContext(PORTAL_GROUP_CONTEXT_NAME);
}
const PortalGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { target } = $$props;
  let targetStore = writable(target);
  setContext(PORTAL_GROUP_CONTEXT_NAME, targetStore);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  {
    targetStore.set(target);
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
const Portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $groupTarget, $$unsubscribe_groupTarget;
  let $forceInRoot, $$unsubscribe_forceInRoot;
  let forceInRoot = usePortalRoot();
  $$unsubscribe_forceInRoot = subscribe(forceInRoot, (value) => $forceInRoot = value);
  let groupTarget = usePortalGroupContext();
  $$unsubscribe_groupTarget = subscribe(groupTarget, (value) => $groupTarget = value);
  (() => {
    if (!(forceInRoot && $forceInRoot) && groupTarget !== void 0 && $groupTarget !== null)
      return $groupTarget;
    if (typeof window === "undefined")
      return null;
    let existingRoot = document.getElementById("headlessui-portal-root");
    if (existingRoot)
      return existingRoot;
    let root = document.createElement("div");
    root.setAttribute("id", "headlessui-portal-root");
    tick().then(() => {
      if (root !== document.body.lastChild) {
        document.body.appendChild(root);
      }
    });
    return document.body.appendChild(root);
  })();
  $$unsubscribe_groupTarget();
  $$unsubscribe_forceInRoot();
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
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
const DIALOG_CONTEXT_NAME = "headlessui-dialog-context";
function useDialogContext(component) {
  let context = getContext(DIALOG_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error(`<${component} /> is missing a parent <Dialog /> component.`);
  }
  return context;
}
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dialogState;
  let visible;
  let enabled;
  let _cleanup;
  let _cleanupScrollLock;
  let _cleanupClose;
  let propsWeControl;
  let slotProps;
  let $$restProps = compute_rest_props($$props, ["as", "use", "open", "initialFocus"]);
  let $api, $$unsubscribe_api;
  let $openClosedState, $$unsubscribe_openClosedState;
  let { as = "div" } = $$props;
  let { use = [] } = $$props;
  let { open = void 0 } = $$props;
  let { initialFocus = null } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component(), ["close"]);
  const dispatch = createEventDispatcher();
  let containers = /* @__PURE__ */ new Set();
  let openClosedState = useOpenClosed();
  $$unsubscribe_openClosedState = subscribe(openClosedState, (value) => $openClosedState = value);
  let internalDialogRef = null;
  const id2 = `headlessui-dialog-${useId()}`;
  onDestroy(() => {
    if (_cleanup) {
      _cleanup();
    }
  });
  let titleId;
  let api = writable({
    titleId,
    dialogState,
    setTitleId(id3) {
      if (titleId === id3)
        return;
      titleId = id3;
    },
    close() {
      dispatch("close", false);
    }
  });
  $$unsubscribe_api = subscribe(api, (value) => $api = value);
  setContext(DIALOG_CONTEXT_NAME, api);
  onDestroy(() => {
    if (_cleanupScrollLock) {
      _cleanupScrollLock();
    }
  });
  onDestroy(() => {
    if (_cleanupClose) {
      _cleanupClose();
    }
  });
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.initialFocus === void 0 && $$bindings.initialFocus && initialFocus !== void 0)
    $$bindings.initialFocus(initialFocus);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        open = open === void 0 && openClosedState !== void 0 ? match($openClosedState, {
          [State.Open]: true,
          [State.Closed]: false
        }) : open;
        let hasOpen = open !== void 0 || openClosedState !== void 0;
        if (!hasOpen) {
          throw new Error(`You forgot to provide an \`open\` prop to the \`Dialog\` component.`);
        }
        if (typeof open !== "boolean") {
          throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${open}`);
        }
      }
    }
    dialogState = open ? DialogStates.Open : DialogStates.Closed;
    visible = openClosedState !== void 0 ? $openClosedState === State.Open : dialogState === DialogStates.Open;
    enabled = dialogState === DialogStates.Open;
    _cleanup = (() => {
      if (_cleanup) {
        _cleanup();
      }
      return useInertOthers(internalDialogRef, enabled);
    })();
    {
      api.update((obj) => {
        return { ...obj, titleId, dialogState };
      });
    }
    _cleanupScrollLock = (() => {
      if (_cleanupScrollLock) {
        _cleanupScrollLock();
      }
      if (dialogState !== DialogStates.Open)
        return;
      return;
    })();
    _cleanupClose = (() => {
      if (_cleanupClose) {
        _cleanupClose();
      }
      if (dialogState !== DialogStates.Open)
        return;
      let container = internalDialogRef;
      if (!container)
        return;
      let observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
          if (entry.boundingClientRect.x === 0 && entry.boundingClientRect.y === 0 && entry.boundingClientRect.width === 0 && entry.boundingClientRect.height === 0) {
            $api.close();
          }
        }
      });
      observer.observe(container);
      return () => observer.disconnect();
    })();
    propsWeControl = {
      id: id2,
      role: "dialog",
      "aria-modal": dialogState === DialogStates.Open ? true : void 0,
      "aria-labelledby": titleId
    };
    slotProps = { open };
    $$rendered = `
${validate_component(FocusTrap, "FocusTrap").$$render(
      $$result,
      {
        containers,
        enabled,
        options: { initialFocus }
      },
      {},
      {}
    )}
${validate_component(StackContextProvider, "StackContextProvider").$$render(
      $$result,
      {
        element: internalDialogRef,
        onUpdate: (message, element) => {
          return match(message, {
            [StackMessage.Add]() {
              containers = /* @__PURE__ */ new Set([...containers, element]);
            },
            [StackMessage.Remove]() {
              containers.delete(element);
              containers = /* @__PURE__ */ new Set([...containers]);
            }
          });
        }
      },
      {},
      {
        default: () => {
          return `${validate_component(ForcePortalRootContext, "ForcePortalRootContext").$$render($$result, { force: true }, {}, {
            default: () => {
              return `${validate_component(Portal, "Portal").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(PortalGroup, "PortalGroup").$$render($$result, { target: internalDialogRef }, {}, {
                    default: () => {
                      return `${validate_component(ForcePortalRootContext, "ForcePortalRootContext").$$render($$result, { force: false }, {}, {
                        default: () => {
                          return `${validate_component(DescriptionProvider, "DescriptionProvider").$$render($$result, { name: "DialogDescription", slotProps }, {}, {
                            default: ({ describedby }) => {
                              return `${validate_component(Render, "Render").$$render(
                                $$result,
                                Object.assign(
                                  {},
                                  { ...$$restProps, ...propsWeControl },
                                  { as },
                                  { slotProps },
                                  { use: [...use, forwardEvents] },
                                  { name: "Dialog" },
                                  { "aria-describedby": describedby },
                                  { visible },
                                  {
                                    features: Features.RenderStrategy | Features.Static
                                  },
                                  { el: internalDialogRef }
                                ),
                                {
                                  el: ($$value) => {
                                    internalDialogRef = $$value;
                                    $$settled = false;
                                  }
                                },
                                {
                                  default: () => {
                                    return `${slots.default ? slots.default({ ...slotProps }) : ``}`;
                                  }
                                }
                              )}`;
                            }
                          })}`;
                        }
                      })}`;
                    }
                  })}`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_api();
  $$unsubscribe_openClosedState();
  return $$rendered;
});
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
var PopoverStates;
(function(PopoverStates2) {
  PopoverStates2[PopoverStates2["Open"] = 0] = "Open";
  PopoverStates2[PopoverStates2["Closed"] = 1] = "Closed";
})(PopoverStates || (PopoverStates = {}));
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
const TRANSITION_CONTEXT_NAME = "headlessui-transition-context";
const NESTING_CONTEXT_NAME = "headlessui-nesting-context";
function hasTransitionContext() {
  return getContext(TRANSITION_CONTEXT_NAME) !== void 0;
}
function useTransitionContext() {
  let context = getContext(TRANSITION_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  }
  return context;
}
function useParentNesting() {
  let context = getContext(NESTING_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  }
  return context;
}
function hasChildren(bag) {
  if ("children" in bag)
    return hasChildren(bag.children);
  return bag.filter(({ state }) => state === TreeStates.Visible).length > 0;
}
function useNesting(done) {
  let transitionableChildren = [];
  function unregister(childId, strategy = RenderStrategy.Hidden) {
    let idx = transitionableChildren.findIndex(({ id: id2 }) => id2 === childId);
    if (idx === -1)
      return;
    let hadChildren = hasChildren(transitionableChildren);
    match(strategy, {
      [RenderStrategy.Unmount]() {
        transitionableChildren.splice(idx, 1);
      },
      [RenderStrategy.Hidden]() {
        transitionableChildren[idx].state = TreeStates.Hidden;
      }
    });
    if (hadChildren && !hasChildren(transitionableChildren)) {
      done?.();
    }
  }
  function register(childId) {
    let child = transitionableChildren.find(({ id: id2 }) => id2 === childId);
    if (!child) {
      transitionableChildren.push({ id: childId, state: TreeStates.Visible });
    } else if (child.state !== TreeStates.Visible) {
      child.state = TreeStates.Visible;
    }
    return () => unregister(childId, RenderStrategy.Unmount);
  }
  return {
    children: transitionableChildren,
    register,
    unregister
  };
}
export {
  DialogStates as D,
  Features as F,
  NESTING_CONTEXT_NAME as N,
  Render as R,
  State as S,
  TreeStates as T,
  useId as a,
  useTransitionContext as b,
  useParentNesting as c,
  useOpenClosedProvider as d,
  RenderStrategy as e,
  forwardEventsBuilder as f,
  useNesting as g,
  useOpenClosed as h,
  TRANSITION_CONTEXT_NAME as i,
  hasTransitionContext as j,
  hasOpenClosed as k,
  Dialog as l,
  match as m,
  useDialogContext as u
};
