import * as universal from '../entries/pages/league/_league_name_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/league/[league_name]/+page.ts";
export const imports = ["_app/immutable/nodes/4.91df6071.js","_app/immutable/chunks/db.ee432d4b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.24360f55.js","_app/immutable/chunks/index.704f3127.js","_app/immutable/chunks/TransitionChildWrapper.0f230a2b.js","_app/immutable/chunks/X.645a4639.js","_app/immutable/chunks/navigation.d8e1c971.js","_app/immutable/chunks/stores.156e910f.js","_app/immutable/chunks/singletons.739f471f.js","_app/immutable/chunks/LabeledTextarea.3f84e41b.js","_app/immutable/chunks/index.8f3b13e0.js"];
export const stylesheets = ["_app/immutable/assets/4.35bb711e.css"];
export const fonts = [];
