import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.776fbc74.js","_app/immutable/chunks/db.ee432d4b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.24360f55.js","_app/immutable/chunks/index.704f3127.js","_app/immutable/chunks/TransitionChildWrapper.0f230a2b.js","_app/immutable/chunks/X.645a4639.js","_app/immutable/chunks/navigation.d8e1c971.js","_app/immutable/chunks/stores.156e910f.js","_app/immutable/chunks/singletons.739f471f.js","_app/immutable/chunks/LabeledTextarea.3f84e41b.js","_app/immutable/chunks/LabeledPassword.735ea456.js"];
export const stylesheets = ["_app/immutable/assets/2.84e5596b.css"];
export const fonts = [];
