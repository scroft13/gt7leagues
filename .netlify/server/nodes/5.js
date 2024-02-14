import * as universal from '../entries/pages/league/_league_name_/_series_/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/league/_league_name_/_series_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/league/[league_name]/[series]/+page.ts";
export const imports = ["_app/immutable/nodes/5.9c94a28e.js","_app/immutable/chunks/db.ee432d4b.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.24360f55.js","_app/immutable/chunks/index.704f3127.js","_app/immutable/chunks/index.8f2ca6db.js","_app/immutable/chunks/control.c2cf8273.js"];
export const stylesheets = [];
export const fonts = [];
